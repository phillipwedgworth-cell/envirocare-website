# Decision: company naming

**Ruled by Phillip, 2026-08-09.** Committed to the repo 2026-08-09 because the
original (`EnviroCare-Name-Decision-FINAL-Aug9.md`) lives in the Claude project, not
here — which is why an earlier session cited it as authority and could not find it.

## The ruling

| Role | Value |
|---|---|
| **Published brand name** | **EnviroCare Pest Services** |
| **Legal entity** | **EnviroCare, LLC** — what BBB registers |
| **DBA / short form** | **EnviroCare** |
| **Retired** | ~~EnviroCare Pest & Termite Services~~ · ~~EnviroCare Pest & Termite Services LLC~~ |

## Three constraints a find-and-replace WILL break

### 1. Do not push "Pest Services" onto the verified GBP listings
The per-location rule stands: **a location's published name must match the sign on
that location's door.** Huntsville publishes **EnviroCare** and stays that way.
Alabaster and Alex City get a **casing fix only** (`Envirocare` → `EnviroCare`).

Adding words to a verified listing is a name change and can trigger re-review. This
ruling governs the **website, schema, collateral and directory records** — not
per-location GBP titles.

Accordingly, `app/layout.tsx` carries door-sign names per office
(`EnviroCare — Huntsville`, `EnviroCare — Alabaster`, `EnviroCare — Alex City / Lake
Martin`, `EnviroCare Pest Services` for Birmingham), while
`lib/seo/organization-schema.ts` carries the brand.

### 2. Descriptive phrases keep "termite"
"Pest & Termite Services in Mountain Brook", "Alabama Pest & Termite Services |
EnviroCare", "Pest & Termite Control Services" describe the **service**, not the
company. Stripping "termite" costs topical relevance for no benefit.

The sweep matched only strings prefixed with `EnviroCare`, so these survived
untouched — **verified after the sweep, not assumed.**

### 3. The retired name STAYS in `alternateName`
`lib/seo/organization-schema.ts` retains both retired forms. Roughly **50 existing
citations** across directories still carry the old string; `alternateName` is how
Google and the answer engines are told those describe the same entity. Deleting it
everywhere would split the brand in two exactly as a new Birmingham profile is trying
to establish itself.

**Retired for authoring. Retained for reconciliation.** Do not tidy these out.

## What shipped

- PR #74 — 106 occurrences across 51 files
- PR #75 — 14 more the first sweep missed: the name existed in **three encodings**
  (`&`, `&amp;`, and truncated without "Services"). The `&amp;` form was in the footer
  twice including the copyright line, so it rendered on all 156 pages while the sweep
  reported clean. Caught only by checking the **rendered page after deploy**.
- PR #76 — Organization schema aligned to the ruling: `name` is the published brand,
  `legalName` the entity, `alternateName` retains the retired forms.

## Open

**Page titles still use the short form "EnviroCare"** (e.g. "EnviroCare — Family-Owned
Alabama Since 1958"). That is defensible — "DBA / short form" is what the ruling calls
it, and 56 of 156 titles already exceed 65 characters, so lengthening them costs
click-through. **If titles should carry the full published brand instead, say so** and
it is a single sweep.

## Guard

`data/compliance.ts` flags all three encodings of the retired name at `warn` severity.
`agents/lib/compliance.mjs` states the per-location rule so agents cannot regenerate
the retired name. `agents/oneup-push.mjs` blocks it before anything reaches social.
Tests: `npm run test:compliance`.
