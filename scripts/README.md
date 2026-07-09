# scripts/

Repo automation. Run from the project root.

## `audit:locations` — `npm run audit:locations`

Non-destructive page-structure audit (`audit-location-pages.mjs`). Reports:

1. **Stray unrouted pages.** Next.js App Router only serves files under `app/`.
   Any `<dir>/page.tsx` at the **repo root** is dead code Next never builds.
   These typically come from a content generator writing
   `drafts/<slug>.md` → `<slug>/page.tsx` at the repo root instead of under
   `app/`. The live route for `/<slug>` is `app/<slug>/page.tsx`.
2. **SEO metadata gaps** on the real routed `app/` pages (missing `title`,
   `description`, or `alternates.canonical`). Dynamic `generateMetadata` routes
   are listed for manual review, not failed.

Add `--strict` to exit non-zero when stray pages exist (useful as a CI gate):

```bash
node scripts/audit-location-pages.mjs --strict
```

### Note on `drafts/` generators

If you run a local generator that turns `drafts/<slug>.md` into a page, point its
output at `app/<slug>/page.tsx` (or `app/service-areas/<slug>/page.tsx`) — **not**
the repo root — otherwise the generated page is never served.
