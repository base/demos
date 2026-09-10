import type { Address, Hex } from '@vibenet/aa'

import { MIN_ETH_BOOTSTRAP, USDV_TOP_UP_THRESHOLD, type FaucetStatus } from './config'
import { postFaucet, readEthBalance, readTokenBalance } from './rpc'

const LAST_DRIP_KEY = 'base.money-stream.faucet.last.v1'
const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

export type FaucetEvent = {
  kind: 'eth' | 'usdv'
  hash: Hex
}

export class FaucetQueue {
  private tail = Promise.resolve()
  private nextAllowedAt = 0

  constructor(
    readonly status: FaucetStatus,
    readonly token: Address,
    private readonly onEvent?: (event: FaucetEvent) => void,
  ) {
    try {
      const stored = Number(localStorage.getItem(LAST_DRIP_KEY) ?? 0)
      this.nextAllowedAt = Number.isFinite(stored) ? stored : 0
    } catch {
      this.nextAllowedAt = 0
    }
  }

  ensureEth(address: Address, minimum = MIN_ETH_BOOTSTRAP): Promise<Hex | null> {
    return this.enqueue(async () => {
      const before = await readEthBalance(address)
      if (before >= minimum) return null
      const response = await this.drip('/drip', address)
      await this.waitForIncrease(() => readEthBalance(address), before, 'ETH faucet balance')
      this.onEvent?.({ kind: 'eth', hash: response.tx_hash })
      return response.tx_hash
    })
  }

  ensureUsdv(address: Address, minimum = USDV_TOP_UP_THRESHOLD): Promise<Hex | null> {
    return this.enqueue(async () => {
      const before = await readTokenBalance(this.token, address)
      if (before >= minimum) return null
      const response = await this.drip('/drip-usdv', address)
      await this.waitForIncrease(() => readTokenBalance(this.token, address), before, 'USDV faucet balance')
      this.onEvent?.({ kind: 'usdv', hash: response.tx_hash })
      return response.tx_hash
    })
  }

  private enqueue<T>(task: () => Promise<T>): Promise<T> {
    const result = this.tail.then(task, task)
    this.tail = result.then(() => undefined, () => undefined)
    return result
  }

  private async drip(path: '/drip' | '/drip-usdv', address: Address) {
    const cooldownMs = (Math.max(this.status.ip_cooldown_secs, this.status.addr_cooldown_secs) + 1) * 1_000
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const waitMs = this.nextAllowedAt - Date.now()
      if (waitMs > 0) await sleep(waitMs)
      try {
        const response = await postFaucet(path, address)
        this.nextAllowedAt = Date.now() + cooldownMs
        try { localStorage.setItem(LAST_DRIP_KEY, String(this.nextAllowedAt)) } catch { /* session-only cooldown */ }
        return response
      } catch (error) {
        this.nextAllowedAt = Date.now() + cooldownMs
        try { localStorage.setItem(LAST_DRIP_KEY, String(this.nextAllowedAt)) } catch { /* session-only cooldown */ }
        if (attempt === 3) throw error
      }
    }
    throw new Error('Faucet retries exhausted')
  }

  private async waitForIncrease(read: () => Promise<bigint>, before: bigint, label: string) {
    const deadline = Date.now() + 60_000
    while (Date.now() < deadline) {
      try {
        if ((await read()) > before) return
      } catch {
        // A lagging replica is retried on the next poll.
      }
      await sleep(350)
    }
    throw new Error(`Timed out waiting for ${label}`)
  }
}
