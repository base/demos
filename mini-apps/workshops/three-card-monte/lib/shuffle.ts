// lib/shuffle.ts

// Fisher-Yates shuffle backed by a cryptographically secure random source.
//
// `Math.random()` was used here previously. V8 implements it with xorshift128+,
// whose internal state can be recovered from a modest number of observed
// outputs, after which every subsequent value is predictable. The card order is
// presentation only now that `/api/game/start` chooses the winning card
// server-side, but a shuffle helper that leaks its future outputs is the kind of
// thing that gets reused somewhere it matters.
//
// `Math.floor(Math.random() * n)` also carries modulo bias; `randomBelow` below
// uses rejection sampling instead, so every index is equally likely.

/** Returns a uniformly distributed integer in `[0, bound)`. `bound` must be >= 1. */
function randomBelow(bound: number): number {
  // Largest multiple of `bound` that fits in a uint32. Values at or above this
  // limit are discarded rather than folded back into range, which is what keeps
  // the distribution uniform.
  const limit = Math.floor(0x1_0000_0000 / bound) * bound
  const buffer = new Uint32Array(1)

  // Available in browsers and in Node 19+, so this works in client components
  // and in route handlers alike.
  for (;;) {
    globalThis.crypto.getRandomValues(buffer)
    if (buffer[0] < limit) {
      return buffer[0] % bound
    }
  }
}

export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = randomBelow(i + 1)
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}