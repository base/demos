import {
  createPublicClient,
  decodeAbiParameters,
  encodeFunctionData,
  getTransactionReceipt,
  http,
  type Address,
  type Hex,
} from '@vibenet/aa'

import {
  ACCOUNT_RPC,
  API_URL,
  CHAIN_ID,
  erc20Abi,
  EXECUTION_RPC,
  NETWORK_NAME,
  type ChainHealth,
  type FaucetStatus,
  type LiveContracts,
} from './config'

const chain = {
  id: CHAIN_ID,
  name: NETWORK_NAME,
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: [EXECUTION_RPC] } },
}

export const publicClient = createPublicClient({ chain, transport: http(EXECUTION_RPC) })

export class RpcError extends Error {
  readonly code?: number
  readonly data?: unknown
  readonly method: string
  readonly endpoint: string

  constructor(message: string, options: { code?: number; data?: unknown; method: string; endpoint: string }) {
    super(message)
    this.name = 'RpcError'
    this.code = options.code
    this.data = options.data
    this.method = options.method
    this.endpoint = options.endpoint
  }
}

export async function fetchJson<T>(url: string, init: RequestInit = {}, timeoutMs = 12_000): Promise<T> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...init, signal: controller.signal, cache: 'no-store' })
    const body = await response.json().catch(() => null)
    if (!response.ok) {
      throw new Error(body?.error ?? body?.message ?? `${response.status} ${response.statusText}`)
    }
    return body as T
  } finally {
    window.clearTimeout(timer)
  }
}

let rpcId = 0
export async function rpc<T = unknown>(
  method: string,
  params: unknown[] = [],
  endpoint = EXECUTION_RPC,
): Promise<T> {
  const body = await fetchJson<{ result?: T; error?: { code?: number; message?: string; data?: unknown } }>(
    endpoint,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: ++rpcId, method, params }),
    },
  )
  if (body.error) {
    throw new RpcError(body.error.message ?? `${method} failed`, {
      code: body.error.code,
      data: body.error.data,
      method,
      endpoint,
    })
  }
  return body.result as T
}

export const getChainHealth = () => fetchJson<ChainHealth>(`${API_URL}/api/vibenet/chain-health`)
export const getContracts = () => fetchJson<LiveContracts>(`${API_URL}/api/vibenet/contracts`)
export const getFaucetStatus = () => fetchJson<FaucetStatus>(`${API_URL}/api/vibenet/faucet/status`)

export async function postFaucet(path: '/drip' | '/drip-usdv', address: Address) {
  return fetchJson<{ tx_hash: Hex; to: Address; usdv_address?: Address }>(
    `${API_URL}/api/vibenet/faucet${path}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ address }),
    },
  )
}

export async function readCode(address: Address): Promise<Hex> {
  return rpc<Hex>('eth_getCode', [address, 'latest'])
}

export async function readGenesisHash(): Promise<Hex> {
  const block = await rpc<{ hash: Hex }>('eth_getBlockByNumber', ['0x0', false])
  if (!block?.hash) throw new Error('Vibenet returned no genesis hash')
  return block.hash
}

export async function readHead(): Promise<number> {
  return Number(BigInt(await rpc<Hex>('eth_blockNumber')))
}

export async function readLatestBlock(): Promise<{ number: Hex; hash: Hex; baseFeePerGas?: Hex }> {
  return rpc('eth_getBlockByNumber', ['latest', false])
}

export async function readEthBalance(address: Address, blockTag: Hex | 'latest' = 'latest'): Promise<bigint> {
  return BigInt(await rpc<Hex>('eth_getBalance', [address, blockTag]))
}

export async function readTokenBalance(
  token: Address,
  address: Address,
  blockTag: Hex | 'latest' = 'latest',
): Promise<bigint> {
  const data = encodeFunctionData({ abi: erc20Abi, functionName: 'balanceOf', args: [address] })
  const raw = await rpc<Hex>('eth_call', [{ to: token, data }, blockTag])
  return decodeAbiParameters([{ type: 'uint256' }], raw)[0] as bigint
}

export async function readFreshBalances(token: Address, sender: Address, recipient: Address) {
  const blockNumber = await rpc<Hex>('eth_blockNumber')
  try {
    const [eth, senderToken, recipientToken] = await Promise.all([
      readEthBalance(sender, blockNumber),
      readTokenBalance(token, sender, blockNumber),
      readTokenBalance(token, recipient, blockNumber),
    ])
    return { blockNumber: Number(BigInt(blockNumber)), eth, senderToken, recipientToken }
  } catch {
    const [eth, senderToken, recipientToken] = await Promise.all([
      readEthBalance(sender),
      readTokenBalance(token, sender),
      readTokenBalance(token, recipient),
    ])
    return { blockNumber: Number(BigInt(blockNumber)), eth, senderToken, recipientToken }
  }
}

export async function readReceipt(hash: Hex) {
  return getTransactionReceipt(publicClient, { hash }).catch(() => null)
}

export async function readTransaction(hash: Hex) {
  return rpc<Record<string, unknown> | null>('eth_getTransactionByHash', [hash])
}

export async function sendRaw(raw: Hex): Promise<Hex> {
  try {
    return await rpc<Hex>('eth_sendRawTransaction', [raw], EXECUTION_RPC)
  } catch (primaryError) {
    try {
      return await rpc<Hex>('eth_sendRawTransaction', [raw], ACCOUNT_RPC)
    } catch {
      throw primaryError
    }
  }
}

export function isRecoverableBroadcastError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error)
  return /already known|nonce too low|nonce too high|nonce mismatch|signature limit reached|timeout|network|fetch/i.test(message)
}
