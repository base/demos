import type { Address, Hex } from '@vibenet/aa'

import { EXECUTION_WS } from './config'
import type { RpcRequester } from './rpc'
import type { ChainHead, TransferLog } from './subscriptions'

type RpcError = { code?: number; message?: string }
type PendingRequest = {
  resolve: (value: any) => void
  reject: (error: Error) => void
  timer: number
}

type StreamSocketOptions = {
  token: Address
  sender: Address
  recipient: Address
  onLog: (log: TransferLog) => void
  onHead: (head: ChainHead) => void
  onState: (state: 'connecting' | 'live' | 'retrying') => void
}

export type StreamSocket = RpcRequester & {
  sendRaw(raw: Hex): Promise<Hex>
  close(): void
}

const transferTopic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' as Hex

function addressTopic(address: Address): Hex {
  return `0x${address.slice(2).padStart(64, '0')}` as Hex
}

/** One persistent WSS connection for streaming RPC requests and chain notifications. */
export function openStreamSocket(options: StreamSocketOptions): StreamSocket {
  let socket: WebSocket | null = null
  let opening: Promise<WebSocket> | null = null
  let reconnectTimer: number | null = null
  let attempts = 0
  let stopped = false
  let logSubscriptionId: string | null = null
  let headSubscriptionId: string | null = null
  let nextId = 2
  const pending = new Map<number, PendingRequest>()

  const rejectPending = (error: Error) => {
    for (const request of pending.values()) {
      window.clearTimeout(request.timer)
      request.reject(error)
    }
    pending.clear()
  }

  const scheduleReconnect = () => {
    if (stopped || reconnectTimer !== null) return
    attempts += 1
    const delay = Math.min(5_000, 250 * 2 ** Math.min(attempts, 4))
    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null
      void connect().catch(() => undefined)
    }, delay)
  }

  const connect = (): Promise<WebSocket> => {
    if (socket?.readyState === WebSocket.OPEN) return Promise.resolve(socket)
    if (opening) return opening

    options.onState(attempts === 0 ? 'connecting' : 'retrying')
    opening = new Promise<WebSocket>((resolve, reject) => {
      const nextSocket = new WebSocket(EXECUTION_WS)
      socket = nextSocket
      let opened = false
      const failOpen = () => {
        if (!opened) reject(new Error('Vibenet stream WebSocket failed to connect'))
      }

      nextSocket.addEventListener('open', () => {
        opened = true
        nextSocket.send(JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_subscribe',
          params: ['logs', {
            address: options.token,
            topics: [transferTopic, addressTopic(options.sender), addressTopic(options.recipient)],
          }],
        }))
        nextSocket.send(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'eth_subscribe', params: ['newHeads'] }))
        resolve(nextSocket)
      }, { once: true })

      nextSocket.addEventListener('message', (event) => {
        let message: { id?: number; result?: any; error?: RpcError; method?: string; params?: any }
        try {
          message = JSON.parse(String(event.data))
        } catch {
          return
        }
        if (message.id === 1) {
          if (message.error || typeof message.result !== 'string') nextSocket.close()
          else {
            logSubscriptionId = message.result
            attempts = 0
            options.onState('live')
          }
          return
        }
        if (message.id === 2) {
          if (message.error || typeof message.result !== 'string') nextSocket.close()
          else headSubscriptionId = message.result
          return
        }
        if (typeof message.id === 'number') {
          const request = pending.get(message.id)
          if (!request) return
          pending.delete(message.id)
          window.clearTimeout(request.timer)
          if (message.error) request.reject(new Error(message.error.message ?? 'WebSocket JSON-RPC request failed'))
          else request.resolve(message.result)
          return
        }
        if (message.method !== 'eth_subscription') return
        if (message.params?.subscription === logSubscriptionId) {
          const log = message.params.result
          if (log?.removed || typeof log?.transactionHash !== 'string' || typeof log?.blockNumber !== 'string') return
          options.onLog({ transactionHash: log.transactionHash as Hex, blockNumber: Number(BigInt(log.blockNumber)) })
        } else if (message.params?.subscription === headSubscriptionId) {
          const head = message.params.result
          if (typeof head?.number === 'string') options.onHead({ number: Number(BigInt(head.number)) })
        }
      })

      nextSocket.addEventListener('error', () => nextSocket.close(), { once: true })
      nextSocket.addEventListener('close', () => {
        if (socket === nextSocket) socket = null
        logSubscriptionId = null
        headSubscriptionId = null
        rejectPending(new Error('Vibenet stream WebSocket closed'))
        if (!stopped) options.onState('retrying')
        failOpen()
        scheduleReconnect()
      }, { once: true })
    }).finally(() => { opening = null })

    return opening
  }

  const request = async <T>(method: string, params: unknown[] = []): Promise<T> => {
    const activeSocket = await connect()
    const id = ++nextId
    return new Promise<T>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        pending.delete(id)
        reject(new Error(`${method} timed out over WebSocket`))
      }, 3_000)
      pending.set(id, { resolve, reject, timer })
      activeSocket.send(JSON.stringify({ jsonrpc: '2.0', id, method, params }))
    })
  }

  void connect().catch(() => undefined)
  return {
    request,
    sendRaw: (raw) => request<Hex>('eth_sendRawTransaction', [raw]),
    close: () => {
      stopped = true
      if (reconnectTimer !== null) window.clearTimeout(reconnectTimer)
      reconnectTimer = null
      socket?.close()
      socket = null
      rejectPending(new Error('Vibenet stream WebSocket closed'))
    },
  }
}
