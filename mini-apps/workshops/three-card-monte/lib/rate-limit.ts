// lib/rate-limit.ts

/**
 * Best-effort, in-process sliding-window rate limiter.
 *
 * The reward routes spend real funds from the deployment's CDP signer, so the
 * request rate has to be bounded even after a caller is otherwise authorised.
 *
 * Limitation, stated plainly: the counters live in process memory, so each
 * serverless instance enforces its own budget and a horizontally scaled
 * deployment multiplies the effective limit by the instance count. Redis is
 * already a dependency of this project and would be the right home for a real
 * guarantee; this is a floor, not a ceiling.
 */

/** Distinct client keys tracked before the table is pruned. */
const MAX_TRACKED_KEYS = 5_000;

const buckets = new Map<string, number[]>();

/**
 * Derives a client key from proxy headers.
 *
 * These headers are attacker-controlled unless a trusted proxy overwrites them.
 * Vercel and most managed platforms do overwrite `x-forwarded-for`; behind
 * anything that does not, the limiter degrades to one shared bucket rather than
 * failing open per-request.
 */
export function clientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // The left-most entry is the original client as recorded by the first proxy.
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Records a request against `key` and reports whether it is within budget.
 *
 * @param key Client identifier, typically from {@link clientKey}.
 * @param maxRequests Requests permitted per window.
 * @param windowMs Window length in milliseconds.
 */
export function withinRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;

  if (buckets.size > MAX_TRACKED_KEYS) {
    // Unbounded growth is itself a denial-of-service vector, so keys whose
    // entire history has aged out are dropped before a new one is admitted.
    //
    // `forEach` rather than `for...of`: this project's `tsconfig.json` sets no
    // `target`, so it compiles as ES5 and iterating a `Map` directly would
    // require `--downlevelIteration`. Deletions are deferred into `stale` so the
    // map is not mutated while it is being walked.
    const stale: string[] = [];
    buckets.forEach((timestamps: number[], candidate: string) => {
      const live = timestamps.filter((timestamp: number) => timestamp > cutoff);
      if (live.length === 0) {
        stale.push(candidate);
      } else {
        buckets.set(candidate, live);
      }
    });
    stale.forEach((candidate) => buckets.delete(candidate));
  }

  const recent = (buckets.get(key) ?? []).filter(
    (timestamp) => timestamp > cutoff,
  );
  if (recent.length >= maxRequests) {
    buckets.set(key, recent);
    return false;
  }

  recent.push(now);
  buckets.set(key, recent);
  return true;
}