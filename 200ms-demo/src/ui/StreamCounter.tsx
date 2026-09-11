import { useEffect, useRef, useState } from 'react'

import { formatFixedUnits } from '../chain/format'
import type { StreamPhase } from '../chain/streamer'

type Props = {
  confirmed: bigint
  pending: bigint
  phase: StreamPhase
}

const VISUAL_SCALE = 1_000_000n
const ALPHA_SCALE = 1_000_000n

export function StreamCounter({ confirmed, pending, phase }: Props) {
  const [displayed, setDisplayed] = useState(confirmed)
  const displayedScaled = useRef(confirmed * VISUAL_SCALE)
  const targetScaled = useRef(confirmed * VISUAL_SCALE)
  const phaseRef = useRef(phase)
  const finalSettleAt = useRef<number | null>(null)
  const lastRendered = useRef(confirmed)

  useEffect(() => {
    const target = confirmed * VISUAL_SCALE
    targetScaled.current = target
    if (target < displayedScaled.current || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      displayedScaled.current = target
      lastRendered.current = confirmed
      setDisplayed(confirmed)
    } else if (phaseRef.current === 'stopped') {
      finalSettleAt.current = performance.now() + 220
    }
  }, [confirmed])

  useEffect(() => {
    phaseRef.current = phase
    if (phase === 'stopped') finalSettleAt.current = performance.now() + 220
    else finalSettleAt.current = null
  }, [phase])

  useEffect(() => {
    let frame = 0
    let previousFrame = performance.now()
    const animate = (now: number) => {
      const elapsed = Math.min(50, Math.max(0, now - previousFrame))
      previousFrame = now
      const target = targetScaled.current
      let current = displayedScaled.current
      const difference = target - current

      if (difference > 0n) {
        const currentPhase = phaseRef.current
        const timeConstant = currentPhase === 'streaming'
          ? 200
          : currentPhase === 'stopping'
            ? 85
            : currentPhase === 'stopped'
              ? 65
              : 110
        const alpha = 1 - Math.exp(-elapsed / timeConstant)
        let step = (difference * BigInt(Math.max(1, Math.round(alpha * Number(ALPHA_SCALE))))) / ALPHA_SCALE
        if (step < 1n) step = 1n
        current = current + step > target ? target : current + step

        if (currentPhase === 'stopped' && finalSettleAt.current !== null && now >= finalSettleAt.current) {
          current = target
          finalSettleAt.current = null
        }
        displayedScaled.current = current
        const rendered = current / VISUAL_SCALE
        if (rendered !== lastRendered.current) {
          lastRendered.current = rendered
          setDisplayed(rendered)
        }
      }

      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const pendingLabel = phase === 'stopping'
    ? 'settling onchain'
    : phase === 'stopped'
      ? 'final onchain balance'
      : 'pending confirmation'

  return (
    <div
      className={`stream-counter is-${phase}`}
      aria-label={`${formatFixedUnits(confirmed)} USDV confirmed${pending > 0n ? `, ${formatFixedUnits(pending)} pending` : ''}`}
    >
      <div className="counter-value" aria-hidden="true">{formatFixedUnits(displayed)}</div>
      <div className={`pending-value ${pending > 0n || phase === 'stopped' ? 'is-visible' : ''}`}>
        {pending > 0n ? `+${formatFixedUnits(pending)} · ${pendingLabel}` : pendingLabel}
      </div>
      <div className="counter-label">USDV streamed</div>
    </div>
  )
}
