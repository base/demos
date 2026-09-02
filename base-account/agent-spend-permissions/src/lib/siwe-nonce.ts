// src/lib/siwe-nonce.ts
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

/**
 * Self-authenticating SIWE nonces.
 *
 * The previous implementation kept issued nonces in a module-level
 * `Set<string>`. Three problems:
 *
 *   1. On any serverless or multi-instance deployment the instance that issued a
 *      nonce is usually not the one that verifies it, so sign-in failed
 *      intermittently for reasons that look like a wallet bug.
 *   2. The set only ever grew. Every unused `GET /api/auth/verify` leaked 32
 *      bytes for the lifetime of the process, and the endpoint is unauthenticated.
 *   3. Nonces never expired, so a signature captured at any point in the past
 *      stayed replayable for as long as the process lived.
 *
 * A nonce now carries its own expiry and a MAC over both halves, so any instance
 * holding `SESSION_SECRET` can validate it without shared state. Single-use is
 * additionally enforced per-instance on a best-effort basis; strict cluster-wide
 * single-use needs a shared store, and the short lifetime is what bounds the
 * replay window in the meantime.
 *
 * The encoding is pure lowercase hex because SIWE requires the nonce field to be
 * alphanumeric — base64url would be rejected by a conforming parser.
 */

/** How long a nonce stays valid. Long enough to sign, short enough to matter. */
const NONCE_TTL_SECONDS = 10 * 60

const RANDOM_HEX_LENGTH = 32 // 16 bytes
const EXPIRY_HEX_LENGTH = 8 // uint32 seconds since the epoch
const MAC_HEX_LENGTH = 32 // 16 bytes of HMAC-SHA256, truncated

export const NONCE_LENGTH = RANDOM_HEX_LENGTH + EXPIRY_HEX_LENGTH + MAC_HEX_LENGTH

/** Nonces already redeemed on this instance. Bounded; see {@link rememberUsed}. */
const usedNonces = new Map<string, number>()
const MAX_REMEMBERED_NONCES = 10_000

function getKey(): Buffer | null {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 16) {
    return null
  }
  // Domain-separated from the session token MAC so the two cannot be
  // substituted for one another.
  return createHmac('sha256', secret).update('siwe-nonce-v1').digest()
}

function macFor(body: string, key: Buffer): string {
  return createHmac('sha256', key).update(body).digest('hex').slice(0, MAC_HEX_LENGTH)
}

function macsMatch(a: string, b: string): boolean {
  const left = Buffer.from(a, 'utf8')
  const right = Buffer.from(b, 'utf8')
  if (left.length !== right.length) {
    return false
  }
  return timingSafeEqual(left, right)
}

/**
 * Issues a nonce, or `null` when `SESSION_SECRET` is unset.
 *
 * The returned string is alphanumeric and safe to embed in a SIWE message.
 */
export function issueNonce(): string | null {
  const key = getKey()
  if (!key) {
    return null
  }

  const random = randomBytes(RANDOM_HEX_LENGTH / 2).toString('hex')
  const expiry = Math.floor(Date.now() / 1000) + NONCE_TTL_SECONDS
  const expiryHex = expiry.toString(16).padStart(EXPIRY_HEX_LENGTH, '0')
  const body = `${random}${expiryHex}`

  return `${body}${macFor(body, key)}`
}

/** Drops expired entries, then caps the table so it cannot grow without bound. */
function rememberUsed(nonce: string, expiry: number): void {
  const now = Math.floor(Date.now() / 1000)
  const stale: string[] = []
  usedNonces.forEach((entryExpiry: number, entry: string) => {
    if (entryExpiry <= now) {
      stale.push(entry)
    }
  })
  stale.forEach((entry) => usedNonces.delete(entry))

  if (usedNonces.size >= MAX_REMEMBERED_NONCES) {
    // Every remaining entry is still live, so evict the oldest rather than
    // refusing to record this one. Worst case a very old nonce becomes replayable
    // within its remaining lifetime; refusing to record at all would make every
    // nonce replayable.
    const oldest = Array.from(usedNonces.keys())[0]
    if (oldest !== undefined) {
      usedNonces.delete(oldest)
    }
  }

  usedNonces.set(nonce, expiry)
}

export type NonceCheck = 'ok' | 'malformed' | 'expired' | 'reused' | 'unavailable'

/**
 * Validates a nonce and marks it used.
 *
 * @returns `'ok'` only when the nonce was issued by this deployment, has not
 *  expired, and has not already been redeemed on this instance.
 */
export function consumeNonce(nonce: unknown): NonceCheck {
  const key = getKey()
  if (!key) {
    return 'unavailable'
  }
  if (typeof nonce !== 'string' || nonce.length !== NONCE_LENGTH || !/^[0-9a-f]+$/.test(nonce)) {
    return 'malformed'
  }

  const body = nonce.slice(0, RANDOM_HEX_LENGTH + EXPIRY_HEX_LENGTH)
  const mac = nonce.slice(RANDOM_HEX_LENGTH + EXPIRY_HEX_LENGTH)
  if (!macsMatch(mac, macFor(body, key))) {
    // Not issued here, or tampered with. Same answer either way.
    return 'malformed'
  }

  const expiry = parseInt(nonce.slice(RANDOM_HEX_LENGTH, RANDOM_HEX_LENGTH + EXPIRY_HEX_LENGTH), 16)
  if (!Number.isFinite(expiry) || expiry <= Math.floor(Date.now() / 1000)) {
    return 'expired'
  }

  if (usedNonces.has(nonce)) {
    return 'reused'
  }
  rememberUsed(nonce, expiry)

  return 'ok'
}