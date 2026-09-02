// src/app/api/wallet/create/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerWalletForUser, getServerWalletForUser } from '@/lib/cdp'
import { readSessionAddress } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    // The address now comes from a signature-verified session token. Previously
    // it was base64-decoded straight out of an unsigned cookie, so a caller could
    // name any address and have a server wallet provisioned for it.
    const userAddress = readSessionAddress(request)
    if (!userAddress) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get or create server wallet for user
    let serverWallet = getServerWalletForUser(userAddress)
    if (!serverWallet?.smartAccount) {
      serverWallet = await createServerWalletForUser(userAddress)
    }

    return NextResponse.json({
      ok: true,
      serverWalletAddress: serverWallet.address,
      smartAccountAddress: serverWallet.smartAccount?.address,
      message: 'Server wallet ready'
    })
  } catch (error) {
    console.error('Server wallet creation error:', error)
    return NextResponse.json({ error: 'Failed to create server wallet' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Same signature-verified session as POST; see the note above.
    const userAddress = readSessionAddress(request)
    if (!userAddress) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get existing server wallet for user
    const serverWallet = getServerWalletForUser(userAddress)
    
    return NextResponse.json({
      ok: true,
      serverWalletAddress: serverWallet?.address || null,
      smartAccountAddress: serverWallet?.smartAccount?.address || null,
      exists: !!serverWallet
    })
  } catch (error) {
    console.error('Server wallet fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch server wallet' }, { status: 500 })
  }
}