## Summary
Fixes 3 launch-blocker issues found in the 2026-05-25 SEO audit.

## Changes
1. **Canonical metadata** — `app/layout.tsx` now uses `alternates: { canonical: './' }` against `metadataBase`, so every page canonicalizes to its own pathname under `envirocarellc.com`. Previously every page canonicalized to `/`.
2. **Title template dedupe** — removed duplicated brand suffix that produced titles like "…| EnviroCare | EnviroCare Pest & Termite".
3. **PageSpeed monitor retire** — sandbox-safe replacement in tasks.yaml (4 consecutive weeks of failures from the PSI API).

## Out of scope (intentionally not changed)
- `app/robots.ts` — host-aware logic already auto-flips at cutover.
- `robots: isProd ...` block in layout.tsx — same reasoning.
- The 50+ unrelated uncommitted files were committed to main separately before this branch was cut.

## Acceptance tests (run on the preview deploy)
curl -s <preview>/birmingham | grep canonical
  → href="https://envirocarellc.com/birmingham"
curl -s <preview>/services/termite-control | grep canonical
  → href="https://envirocarellc.com/services/termite-control"
curl -s <preview>/ | grep '<title>'
  → no duplicated brand suffix
