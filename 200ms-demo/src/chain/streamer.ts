import {
  allPhasesSucceeded,
  encodeFunctionData,
  encodeWalletCalls,
  keccak256,
  nonceKeyMax,
  toHex,
  type Hex,
} from '@vibenet/aa'

import { StreamLease } from './account'
import {
  CHAIN_ID,
  erc20Abi,
  ETH_TOP_UP_THRESHOLD,
  FUNDING_POLL_MS,
  FALLBACK_RECEIPT_POLL_MS,
  MAX_PENDING,
  MAX_TICKER_ROWS,
  NONCE_FREE_VALIDITY_MS,
  PENDING_UNKNOWN_MS,
  TICK_MS,
  STATE_POLL_MS,
  USDV_TOP_UP_THRESHOLD,
  type StreamRate,
} from './config'
import type { StreamRuntime } from './bootstrap'
import { RationalAccumulator } from './rationalAccumulator'
import {
  getChainHealth,
  isRecoverableBroadcastError,
  readCode,
  readFreshBalances,
  readGenesisHash,
  readLatestBlock,
  readReceipt,
  readTransaction,
  sendRaw,
} from './rpc'
import type { TransferLog } from './subscriptions'
import { openStreamSocket, type StreamSocket } from './streamSocket'

export type StreamPhase = 'idle' | 'streaming' | 'paused' | 'stopping' | 'stopped' | 'error'
export type TransactionStatus = 'pending' | 'confirmed' | 'reverted' | 'unknown'

export type StreamTransaction = {
  hash: Hex
  amount: bigint
  status: TransactionStatus
  /** Monotonic timestamp captured after the RPC acknowledges the transaction. */
  acceptedAt: number
  blockNumber?: number
  /** Client-observed time from RPC acknowledgement to block/receipt observation. */
  latencyMs?: number
  message?: string
}

type PendingTransaction = StreamTransaction & {
  raw: Hex
  validBefore: number
  lastBroadcastAt: number
}

export type StreamSnapshot = {
  version: number
  phase: StreamPhase
  rate: StreamRate
  confirmedUnits: bigint
  pendingUnits: bigint
  displayPendingUnits: bigint
  owedUnits: bigint
  senderEthBalance: bigint
  senderTokenBalance: bigint
  recipientTokenBalance: bigint
  transferCount: number
  confirmedCount: number
  revertedCount: number
  elapsedActiveMs: number
  startedAt: number | null
  head: number
  cadenceMs: number | null
  transactions: StreamTransaction[]
  notice: string | null
  error: string | null
  errorCode: 'NETWORK_RESET' | 'LEASE_HELD' | 'STREAM_ERROR' | null
}

type Listener = () => void

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))
const minBigInt = (left: bigint, right: bigint) => left < right ? left : right

function receiptSucceeded(receipt: Record<string, any>) {
  return receipt.status !== '0x0' && allPhasesSucceeded(receipt.eip8130 ?? receipt)
}

export class MoneyStreamer {
  private snapshot: StreamSnapshot
  private readonly listeners = new Set<Listener>()
  private readonly pending = new Map<string, PendingTransaction>()
  private readonly lease = new StreamLease()
  private tickTimer: number | null = null
  private watchTimer: number | null = null
  private fundingTimer: number | null = null
  private lastTickAt: number | null = null
  private nextTickAt = 0
  private readonly accumulator = new RationalAccumulator()
  private sending = false
  private destroyed = false
  private watcherRunning = false
  private transferFeedLive = false
  private readonly streamSocket: StreamSocket
  private fundingRunning = false
  private receiptConfirmedUnits = 0n
  private lastHeadSeenAt = performance.now()
  private lastStateSyncAt = -Infinity
  private transactionOrdinal = 0
  private readonly sessionId = crypto.randomUUID()

  constructor(readonly runtime: StreamRuntime, initialRate: StreamRate) {
    this.snapshot = {
      version: 0,
      phase: 'idle',
      rate: initialRate,
      confirmedUnits: 0n,
      pendingUnits: 0n,
      displayPendingUnits: 0n,
      owedUnits: 0n,
      senderEthBalance: runtime.senderEthBalance,
      senderTokenBalance: runtime.senderTokenBalance,
      recipientTokenBalance: runtime.recipientTokenBalance,
      transferCount: 0,
      confirmedCount: 0,
      revertedCount: 0,
      elapsedActiveMs: 0,
      startedAt: null,
      head: runtime.health.head,
      cadenceMs: null,
      transactions: [],
      notice: null,
      error: null,
      errorCode: null,
    }
    document.addEventListener('visibilitychange', this.handleVisibility)
    this.streamSocket = openStreamSocket({
      token: runtime.token,
      sender: runtime.identity.account.address,
      recipient: runtime.identity.recipient,
      onLog: this.handleTransferLog,
      onHead: this.handleHead,
      onState: (state) => {
        const wasLive = this.transferFeedLive
        this.transferFeedLive = state === 'live'
        if (wasLive && !this.transferFeedLive) this.scheduleWatcher(0)
      },
    })
    runtime.faucet.setRequester(this.streamSocket)
    this.scheduleWatcher(0)
    this.scheduleFunding(FUNDING_POLL_MS)
  }

  getSnapshot = () => this.snapshot

  subscribe = (listener: Listener) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  setRate(rate: StreamRate) {
    if (this.snapshot.phase === 'streaming') this.accrue(performance.now())
    this.patch({ rate, notice: this.snapshot.phase === 'streaming' ? `Rate changed to ${rate.shortLabel}` : null })
  }

  start() {
    if (this.destroyed) return
    if (this.snapshot.phase === 'streaming') return
    if (!this.lease.acquire()) {
      this.fail('Another tab is already streaming from this account.', 'LEASE_HELD')
      return
    }
    const now = performance.now()
    this.lastTickAt = now
    this.nextTickAt = now + TICK_MS
    this.patch({
      phase: 'streaming',
      startedAt: this.snapshot.startedAt ?? Date.now(),
      notice: null,
      error: null,
      errorCode: null,
    })
    this.scheduleTick()
  }

  pause(reason = 'Stream paused') {
    if (this.snapshot.phase !== 'streaming') return
    this.accrue(performance.now())
    this.clearTick()
    this.lastTickAt = null
    this.lease.release()
    this.patch({ phase: 'paused', notice: reason })
  }

  resume() {
    if (this.snapshot.phase !== 'paused') return
    this.start()
  }

  stop() {
    if (!['streaming', 'paused'].includes(this.snapshot.phase)) return
    if (this.snapshot.phase === 'streaming') this.accrue(performance.now())
    this.clearTick()
    this.lastTickAt = null
    this.patch({
      phase: this.pending.size > 0 || this.sending ? 'stopping' : 'stopped',
      notice: this.pending.size > 0 ? 'Waiting for final confirmations…' : 'Stream stopped',
    })
    if (this.pending.size === 0 && !this.sending) this.lease.release()
  }

  destroy() {
    this.destroyed = true
    this.clearTick()
    if (this.watchTimer !== null) window.clearTimeout(this.watchTimer)
    if (this.fundingTimer !== null) window.clearTimeout(this.fundingTimer)
    this.lease.release()
    this.streamSocket.close()
    document.removeEventListener('visibilitychange', this.handleVisibility)
    this.listeners.clear()
  }

  private readonly handleVisibility = () => {
    if (document.hidden && this.snapshot.phase === 'streaming') {
      this.pause('Paused — this tab was hidden')
    }
  }

  private scheduleTick() {
    this.clearTick()
    if (this.snapshot.phase !== 'streaming') return
    const delay = Math.max(0, this.nextTickAt - performance.now())
    this.tickTimer = window.setTimeout(() => {
      const now = performance.now()
      this.accrue(now)
      do this.nextTickAt += TICK_MS
      while (this.nextTickAt <= now)
      if (this.pending.size < MAX_PENDING) void this.pump()
      else this.patch({ notice: 'Network backlog — accrued value is being held safely' })
      this.scheduleTick()
    }, delay)
  }

  private clearTick() {
    if (this.tickTimer !== null) window.clearTimeout(this.tickTimer)
    this.tickTimer = null
  }

  private accrue(now: number) {
    if (this.lastTickAt === null) return
    const elapsedMs = Math.max(0, now - this.lastTickAt)
    const elapsedMicros = BigInt(Math.round(elapsedMs * 1_000))
    this.lastTickAt = now
    if (elapsedMicros === 0n) return

    const wholeUnits = this.accumulator.accrue(this.snapshot.rate, elapsedMicros)

    this.patch({
      owedUnits: this.snapshot.owedUnits + wholeUnits,
      elapsedActiveMs: this.snapshot.elapsedActiveMs + elapsedMs,
    }, false)
  }

  private async pump() {
    if (this.sending || this.snapshot.phase !== 'streaming' || this.snapshot.owedUnits < 1n) return
    this.sending = true
    const reserved = [...this.pending.values()].reduce((sum, transaction) => sum + transaction.amount, 0n)
    const available = this.snapshot.senderTokenBalance > reserved
      ? this.snapshot.senderTokenBalance - reserved
      : 0n
    const amount = minBigInt(this.snapshot.owedUnits, available)
    if (amount < 1n) {
      this.sending = false
      this.patch({ notice: 'Waiting for a USDV top-up…' })
      return
    }

    this.patch({ owedUnits: this.snapshot.owedUnits - amount }, false)
    const ordinal = this.transactionOrdinal++
    const validBefore = Date.now() + NONCE_FREE_VALIDITY_MS
    const calls = [[{
      to: this.runtime.token,
      value: 0n,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [this.runtime.identity.recipient, amount],
      }),
    }]] as const

    try {
      const raw = await this.runtime.identity.account.signTransaction({
        chainId: CHAIN_ID,
        accountChanges: [],
        calls: encodeWalletCalls({ account: this.runtime.identity.account.address, calls }),
        metadata: toHex(`200ms-demo:${this.sessionId}:${ordinal}:${validBefore}`),
        nonceKey: nonceKeyMax,
        validBefore: BigInt(validBefore),
        maxFeePerGas: this.runtime.maxFeePerGas,
        maxPriorityFeePerGas: this.runtime.maxPriorityFeePerGas,
        gas: this.runtime.gasLimit,
      })
      const hash = keccak256(raw)
      const acceptedHash = await this.broadcast(raw, hash)
      const acceptedAt = performance.now()
      const transaction: PendingTransaction = {
        hash: acceptedHash,
        raw,
        amount,
        status: 'pending',
        acceptedAt,
        validBefore,
        lastBroadcastAt: acceptedAt,
      }
      this.pending.set(hash.toLowerCase(), transaction)
      this.patch({
        transferCount: this.snapshot.transferCount + 1,
        notice: null,
        transactions: [transaction, ...this.snapshot.transactions].slice(0, MAX_TICKER_ROWS),
      })
    } catch (error) {
      this.patch({
        owedUnits: this.snapshot.owedUnits + amount,
        notice: error instanceof Error ? `Send delayed: ${error.message}` : 'Send delayed',
      })
    } finally {
      this.sending = false
    }
  }

  private async submitRaw(raw: Hex): Promise<Hex> {
    try {
      return await this.streamSocket.sendRaw(raw)
    } catch {
      return sendRaw(raw)
    }
  }


  private async broadcast(raw: Hex, expectedHash: Hex): Promise<Hex> {
    let lastError: unknown
    for (let attempt = 0; attempt < 4; attempt += 1) {
      try {
        const returnedHash = await this.submitRaw(raw)
        if (returnedHash.toLowerCase() !== expectedHash.toLowerCase()) {
          throw new Error(`RPC returned an unexpected transaction hash`)
        }
        return expectedHash
      } catch (error) {
        lastError = error
        const [transaction, receipt] = await Promise.all([
          readTransaction(expectedHash, this.streamSocket).catch(() => null),
          readReceipt(expectedHash, this.streamSocket).catch(() => null),
        ])
        if (transaction || receipt) return expectedHash
        if (!isRecoverableBroadcastError(error) && attempt >= 1) throw error
        await sleep(80 + attempt * 100)
      }
    }
    throw lastError instanceof Error ? lastError : new Error('Transaction broadcast failed')
  }

  private scheduleWatcher(delay = this.transferFeedLive ? STATE_POLL_MS : FALLBACK_RECEIPT_POLL_MS) {
    if (this.destroyed) return
    if (this.watchTimer !== null) window.clearTimeout(this.watchTimer)
    this.watchTimer = window.setTimeout(() => void this.watch(), delay)
  }

  private async watch() {
    if (this.watcherRunning || this.destroyed) return this.scheduleWatcher()
    this.watcherRunning = true
    try {
      const now = performance.now()
      if (now - this.lastStateSyncAt >= STATE_POLL_MS) {
        this.lastStateSyncAt = now
        if (!await this.refreshState()) return
      }

      const oldest = [...this.pending.values()]
        .sort((left, right) => left.acceptedAt - right.acceptedAt)
        .slice(0, 10)
      const fallbackTransactions = this.transferFeedLive
        ? oldest.filter((transaction) => performance.now() - transaction.acceptedAt > 3_000)
        : oldest
      for (const transaction of fallbackTransactions) await this.reconcile(transaction)

      this.recomputePending()
      if (this.snapshot.phase === 'stopping' && this.pending.size === 0 && !this.sending) {
        this.lease.release()
        this.patch({ phase: 'stopped', notice: 'Stream stopped' })
      } else {
        this.emit()
      }
    } catch (error) {
      this.patch({ notice: error instanceof Error ? `Watcher retrying: ${error.message}` : 'Watcher retrying' })
    } finally {
      this.watcherRunning = false
      this.scheduleWatcher()
    }
  }

  private async refreshState(): Promise<boolean> {
    const [balances, implementationCode, tokenCode, health, latestBlock, genesisHash] = await Promise.all([
      readFreshBalances(
        this.runtime.token,
        this.runtime.identity.account.address,
        this.runtime.identity.recipient,
        this.streamSocket,
      ),
      readCode(this.runtime.identity.implementation, this.streamSocket),
      readCode(this.runtime.token, this.streamSocket),
      getChainHealth(),
      readLatestBlock(this.streamSocket),
      readGenesisHash(this.streamSocket),
    ])
    if (
      implementationCode === '0x'
      || tokenCode === '0x'
      || !health.healthy
      || genesisHash.toLowerCase() !== this.runtime.identity.genesisHash.toLowerCase()
    ) {
      this.fail('Vibenet reset or maintenance detected — rebuilding the stream.', 'NETWORK_RESET')
      return false
    }
    if (balances.blockNumber > this.snapshot.head) {
      const now = performance.now()
      const blockDelta = balances.blockNumber - this.snapshot.head
      const cadence = blockDelta > 0 ? (now - this.lastHeadSeenAt) / blockDelta : this.snapshot.cadenceMs
      this.lastHeadSeenAt = now
      this.snapshot = { ...this.snapshot, head: balances.blockNumber, cadenceMs: cadence }
    }

    const balanceConfirmedUnits = balances.recipientToken > this.runtime.recipientBaseline
      ? balances.recipientToken - this.runtime.recipientBaseline
      : 0n
    this.snapshot = {
      ...this.snapshot,
      confirmedUnits: balanceConfirmedUnits > this.receiptConfirmedUnits
        ? balanceConfirmedUnits
        : this.receiptConfirmedUnits,
      senderEthBalance: balances.eth,
      senderTokenBalance: balances.senderToken > this.snapshot.senderTokenBalance
        ? balances.senderToken
        : this.snapshot.senderTokenBalance,
      recipientTokenBalance: balances.recipientToken > this.snapshot.recipientTokenBalance
        ? balances.recipientToken
        : this.snapshot.recipientTokenBalance,
    }
    const baseFee = BigInt(latestBlock.baseFeePerGas ?? 1_000_000_000n)
    this.runtime.maxFeePerGas = baseFee * 2n + this.runtime.maxPriorityFeePerGas
    return true
  }



  private readonly handleHead = (head: { number: number }) => {
    if (head.number <= this.snapshot.head) return
    const observedAt = performance.now()
    const blockDelta = head.number - this.snapshot.head
    const cadence = (observedAt - this.lastHeadSeenAt) / blockDelta
    this.lastHeadSeenAt = observedAt
    this.snapshot = { ...this.snapshot, head: head.number, cadenceMs: cadence }
    this.emit()
  }


  private readonly handleTransferLog = (log: TransferLog) => {
    const transaction = this.pending.get(log.transactionHash.toLowerCase())
    if (!transaction) return
    const observedAt = performance.now()
    this.pending.delete(log.transactionHash.toLowerCase())
    this.receiptConfirmedUnits += transaction.amount
    this.snapshot = {
      ...this.snapshot,
      head: Math.max(this.snapshot.head, log.blockNumber),
      confirmedUnits: this.receiptConfirmedUnits > this.snapshot.confirmedUnits
        ? this.receiptConfirmedUnits
        : this.snapshot.confirmedUnits,
      confirmedCount: this.snapshot.confirmedCount + 1,
      senderTokenBalance: this.snapshot.senderTokenBalance > transaction.amount
        ? this.snapshot.senderTokenBalance - transaction.amount
        : 0n,
      recipientTokenBalance: this.snapshot.recipientTokenBalance + transaction.amount,
      transactions: this.replaceTransaction(transaction.hash, {
        status: 'confirmed',
        blockNumber: log.blockNumber,
        latencyMs: observedAt - transaction.acceptedAt,
      }),
    }
    this.emit()
  }
  private async reconcile(transaction: PendingTransaction) {
    const receipt = await readReceipt(transaction.hash, this.streamSocket)
    const receiptObservedAt = performance.now()
    if (!this.pending.has(transaction.hash.toLowerCase())) return
    if (receipt) {
      const succeeded = receiptSucceeded(receipt)
      const blockNumber = Number(BigInt(receipt.blockNumber))
      this.pending.delete(transaction.hash.toLowerCase())
      const timing = {
        blockNumber,
        latencyMs: receiptObservedAt - transaction.acceptedAt,
      }
      if (!succeeded) {
        this.snapshot = {
          ...this.snapshot,
          owedUnits: this.snapshot.owedUnits + transaction.amount,
          revertedCount: this.snapshot.revertedCount + 1,
          transactions: this.replaceTransaction(transaction.hash, {
            status: 'reverted',
            ...timing,
            message: 'Call phase reverted; value returned to the accumulator',
          }),
        }
      } else {
        this.receiptConfirmedUnits += transaction.amount
        this.snapshot = {
          ...this.snapshot,
          confirmedUnits: this.receiptConfirmedUnits > this.snapshot.confirmedUnits
            ? this.receiptConfirmedUnits
            : this.snapshot.confirmedUnits,
          confirmedCount: this.snapshot.confirmedCount + 1,
          senderTokenBalance: this.snapshot.senderTokenBalance > transaction.amount
            ? this.snapshot.senderTokenBalance - transaction.amount
            : 0n,
          recipientTokenBalance: this.snapshot.recipientTokenBalance + transaction.amount,
          transactions: this.replaceTransaction(transaction.hash, {
            status: 'confirmed',
            ...timing,
          }),
        }
      }
      return
    }


    const now = performance.now()
    const chainTransaction = await readTransaction(transaction.hash, this.streamSocket).catch(() => null)
    if (!chainTransaction && Date.now() < transaction.validBefore - 500 && now - transaction.lastBroadcastAt > 700) {
      transaction.lastBroadcastAt = now
      try {
        await this.submitRaw(transaction.raw)
      } catch (error) {
        if (!isRecoverableBroadcastError(error)) {
          transaction.message = error instanceof Error ? error.message : 'Rebroadcast failed'
        }
      }
    }

    if (performance.now() - transaction.acceptedAt > PENDING_UNKNOWN_MS) {
      this.pending.delete(transaction.hash.toLowerCase())
      this.snapshot = {
        ...this.snapshot,
        transactions: this.replaceTransaction(transaction.hash, {
          status: 'unknown',
          message: 'No receipt after 30 seconds; balance reads remain authoritative',
        }),
      }
    }
  }

  private replaceTransaction(hash: Hex, update: Partial<StreamTransaction>) {
    return this.snapshot.transactions.map((transaction) =>
      transaction.hash.toLowerCase() === hash.toLowerCase()
        ? { ...transaction, ...update }
        : transaction,
    )
  }

  private recomputePending() {
    const values = [...this.pending.values()]
    const pendingUnits = values.reduce((sum, transaction) => sum + transaction.amount, 0n)
    const latestPending = values.sort((left, right) => right.acceptedAt - left.acceptedAt)[0]
    this.snapshot = {
      ...this.snapshot,
      pendingUnits,
      displayPendingUnits: latestPending?.amount ?? 0n,
    }
  }

  private scheduleFunding(delay = FUNDING_POLL_MS) {
    if (this.destroyed) return
    if (this.fundingTimer !== null) window.clearTimeout(this.fundingTimer)
    this.fundingTimer = window.setTimeout(() => void this.fund(), delay)
  }

  private async fund() {
    if (this.fundingRunning || this.destroyed) return this.scheduleFunding()
    this.fundingRunning = true
    let toppedUp = false
    try {
      if (this.snapshot.senderEthBalance < ETH_TOP_UP_THRESHOLD) {
        this.patch({ notice: 'Topping up gas automatically…' })
        await this.runtime.faucet.ensureEth(this.runtime.identity.account.address, ETH_TOP_UP_THRESHOLD)
        toppedUp = true
      }
      if (this.snapshot.senderTokenBalance < USDV_TOP_UP_THRESHOLD) {
        this.patch({ notice: 'Topping up USDV automatically…' })
        await this.runtime.faucet.ensureUsdv(this.runtime.identity.account.address, USDV_TOP_UP_THRESHOLD)
        toppedUp = true
      }
    } catch (error) {
      this.patch({ notice: error instanceof Error ? `Top-up retrying: ${error.message}` : 'Top-up retrying' })
    } finally {
      if (toppedUp) {
        this.lastStateSyncAt = -Infinity
        this.scheduleWatcher(0)
      }
      this.fundingRunning = false
      this.scheduleFunding()
    }
  }

  private fail(message: string, code: StreamSnapshot['errorCode']) {
    this.clearTick()
    this.lease.release()
    this.patch({ phase: 'error', error: message, errorCode: code, notice: null })
  }

  private patch(update: Partial<StreamSnapshot>, emit = true) {
    this.snapshot = { ...this.snapshot, ...update }
    if (emit) this.emit()
  }

  private emit() {
    this.recomputePendingWithoutEmit()
    this.snapshot = { ...this.snapshot, version: this.snapshot.version + 1 }
    for (const listener of this.listeners) listener()
  }

  private recomputePendingWithoutEmit() {
    const values = [...this.pending.values()]
    const pendingUnits = values.reduce((sum, transaction) => sum + transaction.amount, 0n)
    const latestPending = values.sort((left, right) => right.acceptedAt - left.acceptedAt)[0]
    this.snapshot = {
      ...this.snapshot,
      pendingUnits,
      displayPendingUnits: latestPending?.amount ?? 0n,
    }
  }
}
