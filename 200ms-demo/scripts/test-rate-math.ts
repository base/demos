import assert from 'node:assert/strict'

import type { StreamRate } from '../src/chain/config.ts'
import { RationalAccumulator } from '../src/chain/rationalAccumulator.ts'

const monthly: StreamRate = {
  id: 'monthly',
  amountUnits: 10_000_000n,
  periodMicros: 2_628_000_000_000n,
  amountLabel: '10 USDV',
  periodLabel: 'month',
  shortLabel: '10 / month',
}

const accumulator = new RationalAccumulator()
let total = 0n
for (let index = 0; index < 13_140_000; index += 1) {
  total += accumulator.accrue(monthly, 200_000n)
}
assert.equal(total, 10_000_000n, '10 USDV/month must accrue exactly over the full period')
assert.deepEqual(accumulator.fraction(), { numerator: 0n, denominator: 1n })

const first: StreamRate = { ...monthly, amountUnits: 5_000_000n, periodMicros: 60_000_000n }
const second: StreamRate = { ...monthly, amountUnits: 100_000_000n, periodMicros: 3_600_000_000n }
const changed = new RationalAccumulator()
const firstHalf = changed.accrue(first, 30_000_000n)
const secondHalf = changed.accrue(second, 1_800_000_000n)
assert.equal(firstHalf + secondHalf, 52_500_000n, 'rate changes must preserve the exact accrued value')
assert.deepEqual(changed.fraction(), { numerator: 0n, denominator: 1n })

// A fractional remainder must survive a rate change with a different denominator.
const fractional = new RationalAccumulator()
const oneThird: StreamRate = { ...monthly, amountUnits: 1n, periodMicros: 3n }
const oneHalf: StreamRate = { ...monthly, amountUnits: 1n, periodMicros: 2n }
assert.equal(fractional.accrue(oneThird, 1n), 0n)
assert.deepEqual(fractional.fraction(), { numerator: 1n, denominator: 3n })
assert.equal(fractional.accrue(oneHalf, 1n), 0n)
assert.deepEqual(fractional.fraction(), { numerator: 5n, denominator: 6n })
assert.equal(fractional.accrue(oneHalf, 1n), 1n)
assert.deepEqual(fractional.fraction(), { numerator: 1n, denominator: 3n })

// Non-positive elapsed time must not change the carried fractional value.
assert.equal(fractional.accrue(oneHalf, 0n), 0n)
assert.equal(fractional.accrue(oneHalf, -1n), 0n)
assert.deepEqual(fractional.fraction(), { numerator: 1n, denominator: 3n })

// Splitting a duration into scheduler-sized ticks must equal one combined accrual.
const split = new RationalAccumulator()
const combined = new RationalAccumulator()
let splitTotal = 0n
for (let index = 0; index < 5_000; index += 1) {
  splitTotal += split.accrue(monthly, 200_000n)
}
const combinedTotal = combined.accrue(monthly, 1_000_000_000n)
assert.equal(splitTotal, combinedTotal, 'tick partitioning must not change the accrued total')
assert.deepEqual(split.fraction(), combined.fraction())

console.log('Exact rational accumulator checks passed.')
