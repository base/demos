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

// Invalid rates should fail fast instead of causing division-by-zero or negative accrual.
assert.throws(
  () => new RationalAccumulator().accrue({ ...monthly, periodMicros: 0n }, 200_000n),
  { name: 'RangeError', message: 'Stream rate period must be greater than zero' },
)
assert.throws(
  () => new RationalAccumulator().accrue({ ...monthly, amountUnits: -1n }, 200_000n),
  { name: 'RangeError', message: 'Stream rate amount cannot be negative' },
)

// Non-positive elapsed time is a no-op and must not consume a fractional remainder.
const noOp = new RationalAccumulator()
assert.equal(noOp.accrue(first, 1n), 0n)
const remainderBefore = noOp.fraction()
assert.equal(noOp.accrue(first, 0n), 0n)
assert.equal(noOp.accrue(first, -1n), 0n)
assert.deepEqual(noOp.fraction(), remainderBefore)

console.log('Exact rational accumulator checks passed.')
