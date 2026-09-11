import type { Hex } from '@vibenet/aa'

import { EXECUTION_WS } from './config'

export type TransferLog = {
  transactionHash: Hex
  blockNumber: number
}

export type ChainHead = {
  number: number
}

/** Receives canonical head notifications for the header without eth_blockNumber polling. */
export function subscribeToHeads(onHead: (head: ChainHead) => void): () => void {
  let socket: WebSocket | null = null
  let reconnectTimer: number | null = null
  let attempts = 0
  let stopped = false

  const connect = () => {
    if (stopped) return
    socket = new WebSocket(EXECUTION_WS)
    socket.addEventListener('open', () => {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_subscribe', params: ['newHeads'] }))
      }
    })
    socket.addEventListener('message', (event) => {
      let message: any
      try {
        message = JSON.parse(String(event.data))
      } catch {
        return
      }
      if (message.id === 1 && message.error) {
        socket?.close()
        return
      }
      if (message.method !== 'eth_subscription' || typeof message.params?.result?.number !== 'string') return
      onHead({ number: Number(BigInt(message.params.result.number)) })
    })
    socket.addEventListener('error', () => socket?.close())
    socket.addEventListener('close', () => {
      socket = null
      if (stopped) return
      attempts += 1
      const delay = Math.min(5_000, 250 * 2 ** Math.min(attempts, 4))
      reconnectTimer = window.setTimeout(connect, delay)
    })
  }

  connect()
  return () => {
    stopped = true
    if (reconnectTimer !== null) window.clearTimeout(reconnectTimer)
    socket?.close()
  }
}
