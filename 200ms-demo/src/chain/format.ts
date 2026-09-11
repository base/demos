import { TOKEN_DECIMALS } from './config'

export function formatUnits(value: bigint, decimals = TOKEN_DECIMALS, maxFraction = decimals): string {
  const negative = value < 0n
  const absolute = negative ? -value : value
  const base = 10n ** BigInt(decimals)
  const whole = absolute / base
  const rawFraction = (absolute % base).toString().padStart(decimals, '0')
  const fraction = rawFraction.slice(0, maxFraction).replace(/0+$/, '')
  return `${negative ? '-' : ''}${whole.toLocaleString()}${fraction ? `.${fraction}` : ''}`
}

export function formatFixedUnits(value: bigint, decimals = TOKEN_DECIMALS): string {
  const negative = value < 0n
  const absolute = negative ? -value : value
  const base = 10n ** BigInt(decimals)
  const whole = absolute / base
  const fraction = (absolute % base).toString().padStart(decimals, '0')
  return `${negative ? '-' : ''}${whole.toLocaleString()}.${fraction}`
}

export function formatEth(value: bigint): string {
  return formatUnits(value, 18, 4)
}

export function shortAddress(value: string, leading = 6, trailing = 4): string {
  if (value.length <= leading + trailing + 1) return value
  return `${value.slice(0, leading)}…${value.slice(-trailing)}`
}

export function formatDuration(milliseconds: number): string {
  const seconds = Math.max(0, Math.floor(milliseconds / 1_000))
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  return `${minutes}m ${seconds % 60}s`
}

export function parseDecimalUnits(value: string, decimals = TOKEN_DECIMALS): bigint {
  const normalized = value.trim()
  if (!/^\d+(?:\.\d*)?$/.test(normalized)) throw new Error('Enter a positive number')
  const [whole, fraction = ''] = normalized.split('.')
  const padded = fraction.padEnd(decimals, '0').slice(0, decimals)
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(padded || '0')
}
