// src/app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, isAddress } from 'viem'
import { base } from 'viem/chains'
// SIWE helpers live behind the `viem/siwe` entrypoint, not the package root.
import { parseSiweMessage } from 'viem/siwe'

import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS, createSessionToken } from '@/lib/session'
import { consumeNonce, issueNonce } from '@/lib/siwe-nonce'

/**
 * Sign-In with Ethereum.
 *
 * Three defects were fixed here.
 *
 * 1. **Forgeable session token.** The issued token was
 *    `base64(`${address}:${Date.now()}`)` — unsigned, so anyone could mint one for
 *    any address and skip this route entirely. It is now HMAC-signed; see
 *    `@/lib/session`.
 *
 * 2. **No domain binding.** The nonce was pulled out of the message with
 *    `message.match(/Nonce: (\w+)/)` and nothing else in the message was checked.
 *    A signature the user produced for any other site whose SIWE message happened
 *    to carry a nonce from this deployment would verify here. The message is now
 *    parsed as SIWE and its `domain`, `address`, `nonce` and validity window are
 *    all required to match.
 *
 * 3. **Stateful, non-expiring nonces.** See `@/lib/siwe-nonce`.
 */

const client = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'),
})

/**
 * The domain the signed message must name.
 *
 * `SIWE_DOMAIN` should be set in any deployment that sits behind a proxy or CDN.
 * Falling back to the `Host` header keeps local development working; that header
 * is client-supplied, but requiring it to match the message still forces an
 * attacker to have obtained a signature naming this exact domain.
 */
function expectedDomain(request: NextRequest): string | null {
  return process.env.SIWE_DOMAIN || request.headers.get('host')
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json()
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { address, message, signature } = body as Record<string, unknown>

    if (typeof address !== 'string' || typeof message !== 'string' || typeof signature !== 'string') {
      return NextResponse.json({
        error: 'Missing required fields: address, message, signature'
      }, { status: 400 })
    }
    if (!isAddress(address)) {
      return NextResponse.json({ error: 'Invalid address' }, { status: 400 })
    }
    // An upper bound on work done before anything is verified.
    if (message.length > 4096 || signature.length > 8192) {
      return NextResponse.json({ error: 'Message or signature too large' }, { status: 400 })
    }

    const domain = expectedDomain(request)
    if (!domain) {
      console.error('Cannot determine the expected SIWE domain; set SIWE_DOMAIN')
      return NextResponse.json({ error: 'Authentication is not configured' }, { status: 503 })
    }

    // Parse the message as SIWE rather than pattern-matching one line out of it.
    const siwe = parseSiweMessage(message)
    if (!siwe.nonce || !siwe.address) {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 })
    }

    const nonceCheck = consumeNonce(siwe.nonce)
    if (nonceCheck === 'unavailable') {
      console.error('SESSION_SECRET is not set; sign-in cannot be completed')
      return NextResponse.json({ error: 'Authentication is not configured' }, { status: 503 })
    }
    if (nonceCheck !== 'ok') {
      // Malformed, expired and reused are answered identically so the response
      // does not help an attacker distinguish them.
      return NextResponse.json({ error: 'Invalid or expired nonce' }, { status: 401 })
    }

    // The address in the body and the address inside the signed message must be
    // the same account; otherwise a valid signature by A could be submitted as a
    // login for B.
    if (siwe.address.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json({ error: 'Message address does not match' }, { status: 401 })
    }

    // `verifySiweMessage` re-checks the nonce, the domain, and the
    // notBefore/expirationTime window, and resolves ERC-6492 / ERC-1271
    // signatures so Base Account smart wallets verify correctly.
    const isValid = await client.verifySiweMessage({
      message,
      signature: signature as `0x${string}`,
      address: address as `0x${string}`,
      domain,
      nonce: siwe.nonce,
    })

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const sessionToken = createSessionToken(address)
    if (!sessionToken) {
      console.error('SESSION_SECRET is not set; refusing to issue an unsigned session')
      return NextResponse.json({ error: 'Authentication is not configured' }, { status: 503 })
    }

    // The token is no longer echoed in the body. It is a bearer credential, and
    // returning it invites client code to stash it somewhere reachable by script;
    // the HttpOnly cookie is the only place it needs to live.
    const response = NextResponse.json({ ok: true, address })

    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: SESSION_TTL_SECONDS
    })

    return response
  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const nonce = issueNonce()
  if (!nonce) {
    console.error('SESSION_SECRET is not set; cannot issue a nonce')
    return NextResponse.json({ error: 'Authentication is not configured' }, { status: 503 })
  }

  // The nonce is not logged. It is short-lived and unprivileged, but log lines
  // are a poor place for anything that participates in an authentication flow.
  return NextResponse.json({ nonce })
}