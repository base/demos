import type { Address } from '@vibenet/aa'

export const CHAIN_ID = 84_538_453
export const NETWORK_NAME = 'Base Vibenet'
export const API_URL = 'https://api.vibes.base.org'
export const EXECUTION_RPC = 'https://rpc.vibes.base.org'
export const ACCOUNT_RPC = `${API_URL}/api/vibenet/account/rpc`
export const EXPLORER_URL = 'https://chain.base.org/vibenet/explorer'

export const TOKEN_DECIMALS = 6
export const TICK_MS = 200
export const WATCH_MS = 400
export const HEAD_POLL_MS = 1_000
export const FUNDING_POLL_MS = 5_000
export const MAX_PENDING = 12
export const MAX_TICKER_ROWS = 40
export const PENDING_UNKNOWN_MS = 30_000
export const NONCE_FREE_VALIDITY_MS = 15_000
export const PRIORITY_FEE = 1_000_000n
export const MIN_ETH_BOOTSTRAP = 5_000_000_000_000_000n
export const ETH_TOP_UP_THRESHOLD = 30_000_000_000_000_000n
export const USDV_TOP_UP_THRESHOLD = 50_000_000n

export const erc20Abi = [
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const

export type StreamRate = {
  id: string
  amountUnits: bigint
  periodMicros: bigint
  amountLabel: string
  periodLabel: string
  shortLabel: string
}

export const RATE_PRESETS: StreamRate[] = [
  {
    id: '5-minute',
    amountUnits: 5_000_000n,
    periodMicros: 60_000_000n,
    amountLabel: '5 USDV',
    periodLabel: 'minute',
    shortLabel: '5 / min',
  },
  {
    id: '60-minute',
    amountUnits: 60_000_000n,
    periodMicros: 60_000_000n,
    amountLabel: '60 USDV',
    periodLabel: 'minute',
    shortLabel: '60 / min',
  },
  {
    id: '100-hour',
    amountUnits: 100_000_000n,
    periodMicros: 3_600_000_000n,
    amountLabel: '100 USDV',
    periodLabel: 'hour',
    shortLabel: '100 / hr',
  },
]

export type LiveContracts = {
  eip8130?: {
    DefaultAccount?: Address
    CanonicalHighRatePayerAccount?: Address
  }
  usdv?: Address
  [key: string]: unknown
}

export type ChainHealth = {
  healthy: boolean
  reason?: string | null
  detail?: string | null
  head: number
  headAgeSecs: number
  faucetBacklog?: number
  stuckSecs?: number
}

export type FaucetStatus = {
  address: Address
  chain_id: number
  drip_wei: string
  balance_wei: string
  ip_cooldown_secs: number
  addr_cooldown_secs: number
  usdv_address: Address
  usdv_drip_units: string
}
