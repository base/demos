import { useMemo, useState } from 'react'

import { RATE_PRESETS, type StreamRate } from '../chain/config'
import { parseDecimalUnits } from '../chain/format'

type Props = {
  value: StreamRate
  onChange: (rate: StreamRate) => void
  disabled?: boolean
}

const periods = {
  minute: { label: 'minute', micros: 60_000_000n },
  hour: { label: 'hour', micros: 3_600_000_000n },
  day: { label: 'day', micros: 86_400_000_000n },
  month: { label: 'month', micros: 2_628_000_000_000n },
} as const

export function RateSelector({ value, onChange, disabled }: Props) {
  const [customOpen, setCustomOpen] = useState(value.id === 'custom')
  const [amount, setAmount] = useState('10')
  const [period, setPeriod] = useState<keyof typeof periods>('month')
  const [error, setError] = useState<string | null>(null)
  const customSummary = useMemo(() => `${amount || '0'} / ${period}`, [amount, period])

  const applyCustom = () => {
    try {
      const amountUnits = parseDecimalUnits(amount)
      if (amountUnits < 1n) throw new Error('The rate must accrue at least one USDV base unit')
      const selection = periods[period]
      onChange({
        id: 'custom',
        amountUnits,
        periodMicros: selection.micros,
        amountLabel: `${amount} USDV`,
        periodLabel: selection.label,
        shortLabel: customSummary,
      })
      setError(null)
      setCustomOpen(false)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Invalid rate')
    }
  }

  return (
    <div className="rate-selector">
      <div className="rate-options" aria-label="Stream rate">
        {RATE_PRESETS.map((rate) => (
          <button
            type="button"
            key={rate.id}
            className={value.id === rate.id ? 'rate-button is-selected' : 'rate-button'}
            onClick={() => { onChange(rate); setCustomOpen(false) }}
            disabled={disabled}
          >
            {rate.shortLabel}
          </button>
        ))}
        <button
          type="button"
          className={value.id === 'custom' ? 'rate-button is-selected' : 'rate-button'}
          onClick={() => setCustomOpen((open) => !open)}
          disabled={disabled}
          aria-expanded={customOpen}
        >
          custom
        </button>
      </div>
      {customOpen ? (
        <div className="custom-rate">
          <label>
            <span>Amount</span>
            <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" />
          </label>
          <label>
            <span>Every</span>
            <select value={period} onChange={(event) => setPeriod(event.target.value as keyof typeof periods)}>
              {Object.entries(periods).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
            </select>
          </label>
          <button type="button" className="apply-rate" onClick={applyCustom}>Apply next tick</button>
          {error ? <div className="field-error">{error}</div> : null}
        </div>
      ) : null}
    </div>
  )
}
