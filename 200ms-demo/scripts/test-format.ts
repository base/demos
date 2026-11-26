import assert from 'node:assert/strict'

import { parseDecimalUnits } from '../src/chain/format.ts'

assert.equal(parseDecimalUnits('1'), 1_000_000n)
assert.equal(parseDecimalUnits('  12.34  '), 12_340_000n)
assert.equal(parseDecimalUnits('0.000001'), 1n)
assert.equal(parseDecimalUnits('0002.5'), 2_500_000n)
assert.equal(parseDecimalUnits('1.', 2), 100n)
assert.equal(parseDecimalUnits('1.23', 2), 123n)
assert.equal(parseDecimalUnits('7', 0), 7n)

assert.throws(() => parseDecimalUnits('0.0000001'), {
  message: 'Amount supports at most 6 decimal places',
})
assert.throws(() => parseDecimalUnits('1.001', 2), {
  message: 'Amount supports at most 2 decimal places',
})
for (const invalid of ['', '.5', '-1', '+1', '1e3', '1,000', 'NaN']) {
  assert.throws(() => parseDecimalUnits(invalid), undefined, `rejects ${JSON.stringify(invalid)}`)
}
assert.throws(() => parseDecimalUnits('1', -1), RangeError)
assert.throws(() => parseDecimalUnits('1', 1.5), RangeError)

console.log('Strict decimal parsing checks passed.')
