import type { StreamRate } from './config'

function gcd(left: bigint, right: bigint): bigint {
  let a = left < 0n ? -left : left
  let b = right < 0n ? -right : right
  while (b !== 0n) [a, b] = [b, a % b]
  return a || 1n
}

/** Carries sub-base-unit value exactly across ticks and rate changes. */
export class RationalAccumulator {
  private numerator = 0n
  private denominator = 1n

  accrue(rate: StreamRate, elapsedMicros: bigint): bigint {
    if (elapsedMicros <= 0n) return 0n
    const incrementNumerator = rate.amountUnits * elapsedMicros
    const incrementDenominator = rate.periodMicros
    const combinedNumerator = this.numerator * incrementDenominator
      + incrementNumerator * this.denominator
    const combinedDenominator = this.denominator * incrementDenominator
    const wholeUnits = combinedNumerator / combinedDenominator
    let remainder = combinedNumerator % combinedDenominator
    let denominator = combinedDenominator
    if (remainder !== 0n) {
      const divisor = gcd(remainder, denominator)
      remainder /= divisor
      denominator /= divisor
    } else {
      denominator = 1n
    }
    this.numerator = remainder
    this.denominator = denominator
    return wholeUnits
  }

  fraction() {
    return { numerator: this.numerator, denominator: this.denominator }
  }
}
