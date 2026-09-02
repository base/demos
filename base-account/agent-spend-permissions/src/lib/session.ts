// src/lib/session.ts
import { createHmac, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

/**
 * Signed session tokens.
 *
 * The previous token was `base64(`${address}:${Date.now()}`)` — no signature, no
 * key, nothing secret. Any visitor could compute
 * `Buffer.from('0xVICTIM:1').toString('base64')`, set it as the `session` cookie
 * and be treated as that address by every route that reads it. That made the
 * SIWE verification in `/api/auth/verify` decorative: an attacker never needed to
 * pass it.
 *
 * The cost was real. `/api/search` looks up a server wallet by the session
 * address and spends that user's USDC on Base mainnet through their spend
 * permission, and `/api/wallet/create` provisions and reveals server wallets for
 * whichever address the cookie names.
 *
 * Tokens are now `v1.<payload>.<mac>` where `mac` is HMAC-SHA256 over the
 * payload under `SESSION_SECRET`. The payload is still readable by the client —
 * it is not secret — but it cannot be modified without the key.
 */

export const SESSION_COOKIE_NAME = 'session'

const TOKEN_VERSION = 'v1'

/** Matches the cookie `maxAge` set by `/api/auth/verify`. */
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

type SessionPayload = {
  /** Lowercased address this session speaks for. */
  address: string
  /** Issued-at, in seconds since the epoch. */
  iat: number
}

/**
 * Returns the signing key, or `null` when `SESSION_SECRET` is unset.
 *
 * There is deliberately no fallback. A default or derived key would make the
 * failure invisible, and an unsigned session here authorises mainnet spending.
 * Callers must fail the request when this returns `null`.
 */
function getSigningKey(): Buffer | null {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 16) {
    return null
  }
  return Buffer.from(secret, 'utf8')
}

export function isSessionConfigured(): boolean {
  return getSigningKey() !== null
}

function base64UrlEncode(input: Buffer): string {
  return input.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(input: string): Buffer {
  return Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64')
}

function macFor(body: string, key: Buffer): string {
  return base64UrlEncode(createHmac('sha256', key).update(body).digest())
}

/** Constant-time comparison that tolerates length mismatches without throwing. */
function macsMatch(a: string, b: string): boolean {
  const left = Buffer.from(a, 'utf8')
  const right = Buffer.from(b, 'utf8')
  if (left.length !== right.length) {
    return false
  }
  return timingSafeEqual(left, right)
}

/**
 * Mints a session token for `address`.
 *
 * @returns The token, or `null` when `SESSION_SECRET` is unset.
 */
export function createSessionToken(address: string): string | null {
  const key = getSigningKey()
  if (!key) {
    return null
  }

  const payload: SessionPayload = {
    address: address.toLowerCase(),
    iat: Math.floor(Date.now() / 1000),
  }
  const body = base64UrlEncode(Buffer.from(JSON.stringify(payload), 'utf8'))
  return `${TOKEN_VERSION}.${body}.${macFor(body, key)}`
}

/** Verifies a token and returns the address it carries, or `null`. */
export function verifySessionToken(token: string | undefined): string | null {
  const key = getSigningKey()
  if (!key || !token) {
    return null
  }

  const parts = token.split('.')
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) {
    return null
  }
  const [, body, mac] = parts

  // The MAC is checked before the payload is parsed, so untrusted bytes never
  // reach JSON.parse.
  if (!macsMatch(mac, macFor(body, key))) {
    return null
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(base64UrlDecode(body).toString('utf8'))
  } catch {
    return null
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return null
  }

  const { address, iat } = parsed as Partial<SessionPayload>
  if (typeof address !== 'string' || typeof iat !== 'number') {
    return null
  }
  if (!/^0x[0-9a-f]{40}$/.test(address)) {
    return null
  }

  // Expiry is enforced here as well as by the cookie's Max-Age, which a client
  // is free to ignore.
  const ageSeconds = Math.floor(Date.now() / 1000) - iat
  if (!Number.isFinite(ageSeconds) || ageSeconds < 0 || ageSeconds > SESSION_TTL_SECONDS) {
    return null
  }

  return address
}

/** Reads and verifies the session cookie on a request. */
export function readSessionAddress(request: NextRequest): string | null {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value)
}