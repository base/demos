// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, parseAbi } from 'viem'
import { base } from 'viem/chains'
import { toClientEvmSigner } from '@x402/evm'
import { quoteSearchJobs, searchJobs, formatJobResults, flattenJobResults } from '@/lib/exa'
import { getCdpClient, getServerWalletForUser } from '@/lib/cdp'
import { readSessionAddress } from '@/lib/session'

const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const
const USER_PULL_STEP_USDC = BigInt(100_000)
const BALANCE_VISIBILITY_RETRIES = 8
const BALANCE_VISIBILITY_DELAY_MS = 1_000
const ERC20_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)',
])

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function readUsdcBalance(
  publicClient: any,
  address: `0x${string}`
) {
  return publicClient.readContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address],
  }) as Promise<bigint>
}

async function waitForUsdcBalanceAtLeast(
  publicClient: any,
  address: `0x${string}`,
  minimumBalance: bigint,
  retries = BALANCE_VISIBILITY_RETRIES,
  delayMs = BALANCE_VISIBILITY_DELAY_MS
) {
  let lastBalance = BigInt(0)

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      lastBalance = await readUsdcBalance(publicClient, address)
      if (lastBalance >= minimumBalance) {
        return lastBalance
      }
    } catch (error) {
      console.warn(`USDC balance read failed for ${address} on attempt ${attempt + 1}:`, error)
    }

    if (attempt < retries - 1) {
      await sleep(delayMs)
    }
  }

  return lastBalance
}

export async function POST(request: NextRequest) {
  try {
    // This route spends the user's USDC on Base mainnet through their spend
    // permission, keyed entirely by the session address. That address must come
    // from a token this server signed — the previous `parseSessionUserAddress`
    // base64-decoded an unsigned cookie, so any caller could name any address and
    // drive that user's server wallet.
    const userAddress = readSessionAddress(request)

    if (!userAddress) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { queries, topUpSpendCalls } = await request.json()

    if (!Array.isArray(queries) || queries.length === 0 || queries.length > 5) {
      return NextResponse.json({ error: 'Queries must be an array containing 1 to 5 items' }, { status: 400 })
    }

    if (queries.some((query) => typeof query !== 'string' || !query.trim())) {
      return NextResponse.json({ error: 'Each query must be a non-empty string' }, { status: 400 })
    }

    const serverWallet = getServerWalletForUser(userAddress)
    if (!serverWallet?.smartAccount) {
      return NextResponse.json({
        error: 'Server wallet not found in memory (possibly due to server restart). Please set up spend permissions again.',
      }, { status: 400 })
    }

    const cdpClient = getCdpClient()
    const publicClient = createPublicClient({
      chain: base,
      transport: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'),
    })

    const searchQuotes = await quoteSearchJobs(queries.map((query: string) => query.trim()))
    const requiredX402Balance = searchQuotes.reduce((sum, quote) => sum + quote.amount, BigInt(0))

    let smartAccountBalance = await waitForUsdcBalanceAtLeast(
      publicClient,
      serverWallet.smartAccount.address as `0x${string}`,
      BigInt(0),
      3,
      500
    )
    let walletBalance = await waitForUsdcBalanceAtLeast(
      publicClient,
      serverWallet.address as `0x${string}`,
      BigInt(0),
      3,
      500
    )

    if (walletBalance < requiredX402Balance) {
      const walletShortfall = requiredX402Balance - walletBalance

      if (smartAccountBalance < walletShortfall) {
        if (!Array.isArray(topUpSpendCalls) || topUpSpendCalls.length === 0) {
          return NextResponse.json({
            error: 'The server smart account needs more USDC. Please set up or re-authorize a spend permission and try again.',
          }, { status: 400 })
        }

        const fundingOperation = await cdpClient.evm.sendUserOperation({
          smartAccount: serverWallet.smartAccount,
          network: 'base',
          calls: topUpSpendCalls.map((call: { to: string, data: string, value?: string }) => ({
            to: call.to as `0x${string}`,
            data: call.data as `0x${string}`,
            value: call.value ? BigInt(call.value) : undefined,
          })),
          paymasterUrl: process.env.PAYMASTER_URL,
        })

        const fundingReceipt = await cdpClient.evm.waitForUserOperation({
          smartAccountAddress: serverWallet.smartAccount.address as `0x${string}`,
          userOpHash: fundingOperation.userOpHash,
        })

        if (fundingReceipt.status !== 'complete') {
          return NextResponse.json({ error: 'Failed to pull USDC into the server smart account' }, { status: 500 })
        }

        smartAccountBalance = await waitForUsdcBalanceAtLeast(
          publicClient,
          serverWallet.smartAccount.address as `0x${string}`,
          walletShortfall
        )

        if (smartAccountBalance < walletShortfall) {
          return NextResponse.json({
            error: 'USDC top-up to the server smart account is still not visible onchain. Please retry in a moment.',
          }, { status: 500 })
        }
      }

      const transferAmount = requiredX402Balance - walletBalance

      if (transferAmount > BigInt(0)) {
        if (smartAccountBalance < transferAmount) {
          return NextResponse.json({
            error: 'The server smart account still does not have enough USDC for this search. Try again after refreshing your permission.',
          }, { status: 400 })
        }

        const topUpResult = await serverWallet.smartAccount.transfer({
          to: serverWallet.address as `0x${string}`,
          amount: transferAmount,
          token: 'usdc',
          network: 'base',
          paymasterUrl: process.env.PAYMASTER_URL,
        })

        const topUpReceipt = await serverWallet.smartAccount.waitForUserOperation({
          userOpHash: topUpResult.userOpHash,
        })

        if (topUpReceipt.status !== 'complete') {
          return NextResponse.json({ error: 'Failed to top up the x402 signer wallet' }, { status: 500 })
        }

        walletBalance = await waitForUsdcBalanceAtLeast(
          publicClient,
          serverWallet.address as `0x${string}`,
          requiredX402Balance
        )

        if (walletBalance < requiredX402Balance) {
          return NextResponse.json({ error: 'USDC top-up to the x402 signer wallet is not visible yet. Please retry in a moment.' }, { status: 500 })
        }

        smartAccountBalance = await waitForUsdcBalanceAtLeast(
          publicClient,
          serverWallet.smartAccount.address as `0x${string}`,
          BigInt(0),
          3,
          500
        )
      }
    }

    if (walletBalance <= BigInt(0)) {
      return NextResponse.json({
        error: 'The server wallet has no USDC available for Exa payments. Please refresh your spend permission setup and try again.',
      }, { status: 400 })
    }

    const x402Signer = toClientEvmSigner(serverWallet.account as any, publicClient)
    const searchResults = await searchJobs(queries.map((query: string) => query.trim()), x402Signer, {
      publicClient,
    })
    const listings = flattenJobResults(searchResults)

    return NextResponse.json({
      success: true,
      formattedResults: formatJobResults(searchResults),
      results: listings,
      searches: searchResults,
      walletBalanceUSDC: Number(walletBalance) / 1_000_000,
      smartAccountBalanceUSDC: Number(smartAccountBalance) / 1_000_000,
    })
  } catch (error) {
    // Logged server-side only. Upstream x402, CDP and RPC errors carry wallet
    // addresses, request identifiers and paymaster URLs, none of which belong in
    // a response body.
    console.error('Job search error:', error)
    return NextResponse.json({
      error: 'Failed to search jobs',
    }, { status: 500 })
  }
}