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

export type RpcRequester = {
  request<T = unknown>(method: string, params?: unknown[]): Promise<T>
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

async function requestFrom<T>(requester: RpcRequester | undefined, method: string, params: unknown[], endpoint?: string) {
  if (!requester) return rpc<T>(method, params, endpoint)
  try {
    return await requester.request<T>(method, params)
  } catch {
    return rpc<T>(method, params, endpoint)
  }
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

export async function readCode(address: Address, requester?: RpcRequester): Promise<Hex> {
  return requestFrom<Hex>(requester, 'eth_getCode', [address, 'latest'])
}

export async function readGenesisHash(requester?: RpcRequester): Promise<Hex> {
  const block = await requestFrom<{ hash: Hex }>(requester, 'eth_getBlockByNumber', ['0x0', false])
  if (!block?.hash) throw new Error('Vibenet returned no genesis hash')
  return block.hash
}

export async function readLatestBlock(requester?: RpcRequester): Promise<{ number: Hex; hash: Hex; baseFeePerGas?: Hex }> {
  return requestFrom(requester, 'eth_getBlockByNumber', ['latest', false])
}

export async function readEthBalance(
  address: Address,
  blockTag: Hex | 'latest' = 'latest',
  requester?: RpcRequester,
): Promise<bigint> {
  return BigInt(await requestFrom<Hex>(requester, 'eth_getBalance', [address, blockTag]))
}

export async function readTokenBalance(
  token: Address,
  address: Address,
  blockTag: Hex | 'latest' = 'latest',
  requester?: RpcRequester,
): Promise<bigint> {
  const data = encodeFunctionData({ abi: erc20Abi, functionName: 'balanceOf', args: [address] })
  const raw = await requestFrom<Hex>(requester, 'eth_call', [{ to: token, data }, blockTag])
  return decodeAbiParameters([{ type: 'uint256' }], raw)[0] as bigint
}

export async function readFreshBalances(
  token: Address,
  sender: Address,
  recipient: Address,
  requester?: RpcRequester,
) {
  const blockNumber = await requestFrom<Hex>(requester, 'eth_blockNumber', [])
  try {
    const [eth, senderToken, recipientToken] = await Promise.all([
      readEthBalance(sender, blockNumber, requester),
      readTokenBalance(token, sender, blockNumber, requester),
      readTokenBalance(token, recipient, blockNumber, requester),
    ])
    return { blockNumber: Number(BigInt(blockNumber)), eth, senderToken, recipientToken }
  } catch {
    const [eth, senderToken, recipientToken] = await Promise.all([
      readEthBalance(sender, 'latest', requester),
      readTokenBalance(token, sender, 'latest', requester),
      readTokenBalance(token, recipient, 'latest', requester),
    ])
    return { blockNumber: Number(BigInt(blockNumber)), eth, senderToken, recipientToken }
  }
}

export async function readReceipt(hash: Hex, requester?: RpcRequester) {
  if (requester) {
    try {
      return await requester.request<Record<string, any> | null>('eth_getTransactionReceipt', [hash])
    } catch {
      return readReceipt(hash)
    }
  }
  try {
    return await getTransactionReceipt(publicClient, { hash })
  } catch (error) {
    if (error instanceof Error && error.name === 'TransactionReceiptNotFoundError') return null
    throw error
  }
}

export async function readTransaction(hash: Hex, requester?: RpcRequester) {
  return requestFrom<Record<string, unknown> | null>(requester, 'eth_getTransactionByHash', [hash])
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
