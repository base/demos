import { useEffect, useRef, useState } from 'react'

import { bootstrap, type BootstrapProgress, type StreamRuntime } from './chain/bootstrap'
import { RATE_PRESETS, type StreamRate } from './chain/config'
import { formatDuration, formatUnits } from './chain/format'
import { MoneyStreamer } from './chain/streamer'
import { useChainHead } from './hooks/useChainHead'
import { useStream } from './hooks/useStream'
import { AccountCard } from './ui/AccountCard'
import { RateSelector } from './ui/RateSelector'
import { StreamCounter } from './ui/StreamCounter'
import { TxTicker } from './ui/TxTicker'

const progressOrder: BootstrapProgress['stage'][] = ['health', 'account', 'eth', 'usdv', 'deploy', 'gas', 'ready']
const progressLabels: Record<BootstrapProgress['stage'], string> = {
  health: 'Network healthy',
  account: 'Local account created',
  eth: 'Gas funded',
  usdv: 'USDV funded',
  deploy: 'Account deployed',
  gas: 'Stream calibrated',
  ready: 'Ready',
}

function Header({ phase }: { phase?: string }) {
  const { head, cadenceMs } = useChainHead()
  const live = head !== null
  return (
    <header className="site-header">
      <div className="demo-name">200ms demo</div>
      <div className="network-readout">
        <span>Vibenet</span>
        <span>block {head?.toLocaleString() ?? '—'}</span>
        <span>{cadenceMs ? `${Math.round(cadenceMs)}ms` : 'measuring'}</span>
        <span className={`live-state ${live ? 'is-live' : ''}`}><i />{phase === 'error' ? 'issue' : live ? 'live' : 'connecting'}</span>
      </div>
    </header>
  )
}

function BootstrapView({ progress, error, onRetry }: {
  progress: BootstrapProgress
  error: string | null
  onRetry: () => void
}) {
  const activeIndex = progressOrder.indexOf(progress.stage)
  return (
    <div className="state-page">
      <Header phase={error ? 'error' : 'loading'} />
      <main className="bootstrap-card">
        <div className="state-mark" aria-hidden="true" />
        <p className="eyebrow">Base Vibenet · native account abstraction</p>
        <h1>{error ? 'Vibenet is unavailable' : 'Setting up your stream'}</h1>
        <p className="state-copy">
          {error ?? `${progress.label}${progress.detail ? ` — ${progress.detail}` : ''}`}
        </p>
        {!error ? (
          <div className="progress-list">
            {progressOrder.slice(0, -1).map((stage, index) => (
              <div className={`progress-row ${index < activeIndex ? 'is-done' : index === activeIndex ? 'is-active' : ''}`} key={stage}>
                <i />
                <span>{progressLabels[stage]}</span>
              </div>
            ))}
          </div>
        ) : (
          <button className="secondary-button" type="button" onClick={onRetry}>Retry connection</button>
        )}
        <div className="progress-line"><i style={{ width: `${Math.max(8, ((activeIndex + 1) / progressOrder.length) * 100)}%` }} /></div>
        <p className="fine-print">Fresh accounts need two faucet drips separated by the live 10-second cooldown.</p>
      </main>
    </div>
  )
}

export default function App() {
  const [runtime, setRuntime] = useState<StreamRuntime | null>(null)
  const [streamer, setStreamer] = useState<MoneyStreamer | null>(null)
  const [rate, setRate] = useState<StreamRate>(RATE_PRESETS[0])
  const [bootstrapKey, setBootstrapKey] = useState(0)
  const [progress, setProgress] = useState<BootstrapProgress>({ stage: 'health', label: 'Checking Vibenet health…' })
  const [bootstrapError, setBootstrapError] = useState<string | null>(null)
  const [recovering, setRecovering] = useState(false)
  const forceRotate = useRef(false)
  const resumeAfterReset = useRef(false)

  useEffect(() => {
    let cancelled = false
    setBootstrapError(null)
    setProgress(forceRotate.current
      ? { stage: 'account', label: 'Network reset — starting over…' }
      : { stage: 'health', label: 'Checking Vibenet health…' })
    void bootstrap((next) => { if (!cancelled) setProgress(next) }, { forceRotate: forceRotate.current })
      .then((nextRuntime) => {
        if (cancelled) return
        forceRotate.current = false
        setRuntime(nextRuntime)
        setRecovering(false)
      })
      .catch((error) => {
        if (!cancelled) setBootstrapError(error instanceof Error ? error.message : 'Bootstrap failed')
      })
    return () => { cancelled = true }
  }, [bootstrapKey])

  useEffect(() => {
    if (!runtime) {
      setStreamer(null)
      return
    }
    const next = new MoneyStreamer(runtime, rate)
    setStreamer(next)
    if (resumeAfterReset.current) {
      resumeAfterReset.current = false
      queueMicrotask(() => next.start())
    }
    return () => next.destroy()
  }, [runtime])

  useEffect(() => { streamer?.setRate(rate) }, [rate, streamer])
  const snapshot = useStream(streamer)

  useEffect(() => {
    if (!snapshot || snapshot.errorCode !== 'NETWORK_RESET' || recovering) return
    resumeAfterReset.current = snapshot.startedAt !== null
    forceRotate.current = true
    setRecovering(true)
    setRuntime(null)
    const timer = window.setTimeout(() => setBootstrapKey((value) => value + 1), 1_200)
    return () => window.clearTimeout(timer)
  }, [snapshot, recovering])

  const retry = () => {
    setRuntime(null)
    setBootstrapKey((value) => value + 1)
  }

  if (!runtime || !streamer || !snapshot) {
    return <BootstrapView progress={progress} error={bootstrapError} onRetry={retry} />
  }

  const streamedBalance = snapshot.recipientTokenBalance > runtime.recipientBaseline
    ? snapshot.recipientTokenBalance - runtime.recipientBaseline
    : 0n
  const approximateTransfers = snapshot.senderEthBalance / 50_017_000_000_000n
  const runwayMinutes = Number(approximateTransfers) / 5 / 60
  const actionLabel = snapshot.phase === 'streaming'
    ? 'Stop stream'
    : snapshot.phase === 'paused'
      ? 'Resume stream'
      : snapshot.phase === 'stopping'
        ? 'Stopping…'
        : 'Start stream'

  const handleAction = () => {
    if (snapshot.phase === 'streaming') streamer.stop()
    else if (snapshot.phase === 'paused') streamer.resume()
    else if (snapshot.phase !== 'stopping') streamer.start()
  }

  const summary = snapshot.phase === 'stopped'
    ? `${snapshot.confirmedCount} confirmed · ${formatDuration(snapshot.elapsedActiveMs)} · ${rate.amountLabel} / ${rate.periodLabel}`
    : null

  return (
    <div className="app-shell">
      <Header phase={snapshot.phase} />
      <main className="stream-layout">
        <section className="hero-section">
          <StreamCounter
            confirmed={snapshot.confirmedUnits}
            pending={snapshot.displayPendingUnits}
            phase={snapshot.phase}
          />
          <div className="stream-meta">
            <span>{snapshot.confirmedCount} confirmed</span>
            <span>{snapshot.transferCount} transfers</span>
            <span>{formatDuration(snapshot.elapsedActiveMs)}</span>
            <span>{runwayMinutes.toFixed(1)}m gas runway</span>
          </div>
          {summary ? <div className="summary-line">{summary}</div> : null}
        </section>

        <section className="accounts-flow">
          <AccountCard
            label="You"
            address={runtime.identity.account.address}
            tokenBalance={snapshot.senderTokenBalance}
            ethBalance={snapshot.senderEthBalance}
            auxiliary="high-rate account"
          />
          <div className={`flow-rail ${snapshot.phase === 'streaming' ? 'is-flowing' : ''}`} aria-hidden="true">
            {Array.from({ length: 8 }).map((_, index) => <i key={index} />)}
          </div>
          <AccountCard
            label="Recipient"
            address={runtime.identity.recipient}
            tokenBalance={snapshot.recipientTokenBalance}
            auxiliary={`${formatUnits(streamedBalance, 6, 4)} received`}
          />
        </section>

        <section className="controls">
          <RateSelector value={rate} onChange={setRate} disabled={snapshot.phase === 'stopping'} />
          <button
            type="button"
            className={snapshot.phase === 'streaming' ? 'stream-button is-stop' : 'stream-button'}
            onClick={handleAction}
            disabled={snapshot.phase === 'stopping' || snapshot.phase === 'error'}
          >
            {actionLabel}
          </button>
          <div className={`status-note ${snapshot.error ? 'is-error' : ''}`}>
            {snapshot.error ?? snapshot.notice ?? (snapshot.phase === 'streaming'
              ? 'Streaming real nonce-free EIP-8130 transfers'
              : 'No wallet · no extension · no signing prompts')}
          </div>
        </section>

        <TxTicker transactions={snapshot.transactions} />
      </main>
      <footer>
        USDV is Vibenet&apos;s faucet-backed test USD stablecoin. Keys are local devnet-only bearer material.
      </footer>
    </div>
  )
}
