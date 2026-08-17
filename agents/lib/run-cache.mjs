// agents/lib/run-cache.mjs
// Per-process memoization for side-effecting agent tools.
//
// WHY THIS EXISTS (2026-08-16). criticLoop() is wired as
// `revise: (fb) => workerDraft(fb)`, so every critic revision pass re-runs the
// worker's ENTIRE tool loop. In seo-monitor and brightlocal the analysis tools
// are side-effecting — analyzeLocation() and recordScore() hit external APIs
// and call writeFinding() as part of producing their result. A critic asking
// for 3 revisions therefore did not just re-word the brief: it re-fetched every
// Local Falcon campaign, re-fetched every BrightLocal score, and re-wrote every
// finding, MAX_LOOPS + 1 times.
//
// Evidence — 5 identical seo-monitor finding waves 15-20s apart:
//   09:00:06   09:00:28   09:00:44   09:00:52   09:01:11
// plus 6 brightlocal waves the same morning. agent_runs logged FEWER runs than
// finding waves because logAgentRun() fires at the END of run(), so the
// intermediate revision passes wrote findings without ever logging a run. That
// mismatch is what made this look like a scheduler problem. It was not:
// vercel.json and the GitHub workflows were innocent and never fired 5x.
//
// Dedup in writeFinding() makes the DATA correct. This makes the WORK correct —
// the expensive part now happens once per process.
//
// SCOPE IS DELIBERATELY PER-PROCESS. The Map is module-level, so it lives
// exactly as long as one lambda invocation / one Actions job — i.e. exactly one
// run. Nothing persists across runs and tomorrow always recomputes. Do NOT
// promote this to KV or Supabase "so it caches better": a cross-run cache would
// serve yesterday's SoLV as today's reading, which is precisely the class of
// bug the 2026-07-19 seo-monitor rewrite existed to kill.

const DEFAULT_KEY = (...args) => JSON.stringify(args);

/**
 * Wrap an async function so that identical calls within this process share a
 * single underlying invocation.
 *
 * @param {Function} fn            the async function to memoize
 * @param {object}   [opts]
 * @param {Function} [opts.key]    derives a cache key from the call arguments;
 *                                 defaults to JSON.stringify(args)
 * @param {string}   [opts.label]  name used in cache-hit logs
 * @returns {Function} memoized fn, with .clear() and .size() attached
 */
export function once(fn, { key = DEFAULT_KEY, label = fn.name || "anonymous" } = {}) {
  const cache = new Map();

  const memoized = (...args) => {
    let raw;
    try {
      raw = key(...args);
    } catch {
      raw = null;
    }
    // An unkeyable argument (circular object, BigInt, …) must never silently
    // collapse two distinct calls onto one entry. Fall through uncached — a
    // duplicated call is recoverable, a wrong cache hit is not.
    if (raw === null || raw === undefined) {
      console.warn(`[run-cache] ${label}: arguments not keyable — running uncached`);
      return Promise.resolve().then(() => fn(...args));
    }
    const k = String(raw);

    const hit = cache.get(k);
    if (hit) {
      console.log(`[run-cache] ${label} served from cache — ${k.slice(0, 120)}`);
      return hit;
    }

    // Promise.resolve().then(...) so a fn that throws synchronously still
    // produces a rejected promise rather than blowing up the caller before the
    // entry is written.
    const p = Promise.resolve().then(() => fn(...args));
    cache.set(k, p);
    // Rejections are deliberately NOT cached: a failed fetch stays retryable by
    // a later pass rather than poisoning the key for the whole run. This
    // .catch() only evicts — `p` itself still rejects for every caller, and
    // attaching the handler here keeps Node from reporting it as unhandled.
    p.catch(() => cache.delete(k));
    return p;
  };

  memoized.clear = () => cache.clear();
  memoized.size = () => cache.size;
  return memoized;
}
