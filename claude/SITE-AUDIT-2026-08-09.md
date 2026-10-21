# Site audit — 2026-08-09 (Claude Code → Desktop handoff)

## October 18, 2026 update — lead reliability and pricing navigation

This section is the current handoff for **PR #272**, branch
`fix/site-lead-reliability-2026-10-17`. The August findings below are historical.
Phillip requested useful improvements and a Vercel preview for review. This
branch includes current main `dad906de93509335022546f62a74fa628edb16c1` and the
original quote-delivery, canonical ZIP-routing and server-rendered blog fixes.

### What this follow-up changes

- **Active contact form:** a synchronous in-flight/completed guard prevents
  duplicate handler submissions; rejected requests can be retried. Successful
  confirmation uses the name and phone from the accepted request, even if the
  visitor edited the form while it was pending. GA4 and Meta failures are
  isolated independently. The existing Formspree destination is retained.
- **Quote form:** confirmation uses the accepted name and phone and deliberately
  moves focus to the confirmation heading. The original PR's email provider
  acknowledgement handling, mapped ZIP routing and tracking isolation remain.
- **Contact accessibility and narrow layouts:** labels are associated with
  inputs; contact fields have autofill hints; errors are announced; focus is
  visible. Responsive section padding and shrinkable grid tracks replace the
  minimum widths that could clip fields on narrow phones.
- **Pricing navigation:** 13 link definitions in shared service/city templates,
  Birmingham, Mountain Brook, FAQ, reviews, service index and footer now send
  pricing/plan requests to `/pricing`. Actual quote buttons retain `/quote`.
- **Pricing comparison:** the existing **$70 every-other-month pest option** is
  recorded in `data/pricing.ts` and shown beside the monthly ACH alternative.
  The note preserves the 12-month ACH agreement, $150 regular / $75 promotional
  pest initial service, applicability to Pest + Mosquito, and $229 Complete
  initial-service exception. No new customer price is introduced.
- **Local service links:** render the complete labels already in
  `data/services.ts`; remove the redundant prefix that produced text such as
  "Pest control in Birmingham pest control."
- **Sitemap freshness:** the static page-modification date is October 18 to
  reflect these page changes; no Search Console submission is performed.

The older `RequestQuoteForm` component has no importer in the current app and
components tree. Its tracking debt is not counted as an active customer-flow
failure and it is not part of this follow-up.

### Evidence and verification

Live content/link checks on October 18 confirmed the pricing-link mismatch and
the existing $70 option at `https://www.envirocarellc.com/services/pest-control`
and `https://www.envirocarellc.com/pricing`. Local source review reproduced two
concurrent ContactUs POSTs and a tracking exception preventing the second tag.
These are reproducible failure paths, not proof of historical lost leads.

The focused suites exercise the actual handlers with mocked HTTP, email,
database and tracking dependencies. No live lead, notification or customer
record is created by these tests.

- **23 quote/routing/blog regression checks and 8 contact checks pass.** The
  quote suite loads the canonical map and checks all 179 ZIP entries.
- **The local Next.js production build passes**, generating 214 routes. An
  HTML audit covers 190 output files and verifies all 474 pricing/plan links
  point to `/pricing`, all seven contact labels match their fields, and the
  pricing disclosures appear in the generated page.
- **21 of 22 local guard groups pass.** `test:listings` explicitly skips because
  `BRIGHTLOCAL_API_KEY` is absent locally. This is not a successful live-listings
  audit. The PR records exact-commit GitHub build/guard results separately.
- **Standalone TypeScript validation is not clean:** it reports 17 errors
  outside this patch's changed files. The repository's existing build settings
  skip type validation and lint; a passing build does not clear that debt.
- The shared package/test-runner edits merge cleanly with PR #275 and retain
  all three new test commands. Authenticated browser/phone interaction remains
  a review task; static output and mocked component tests do not substitute
  for that check.

### Review in Vercel

Use the preview for **envirocare-web-only-testing**, team
`team_e56vlWMynAPn6B3dI83AzgAD`; this project also serves production, so the
deployment must remain a **preview**. Vercel sign-in protects preview URLs.
No authentication-bypass share link or access-control change is required.

1. Inspect `/contact-us` at 320, 375 and 390px: complete field visibility,
   keyboard focus, label clicks and all four office cards.
2. With the POST intercepted, check success, failure/retry, rapid repeat submit,
   and editing the phone while the first request is pending. Confirm the
   success text matches the payload and receives focus.
3. Check `/quote` and `/quote?service=termite` with mocked POST responses. Retain
   the canonical ZIP fixtures from the original PR; do not change office policy.
4. Check pricing links on `/services/pest-control`, `/auburn`, `/reviews`, `/faq`
   and the footer. Check the pest comparison row and initial-service disclosure.
5. Preview browser/phone interaction and real integration delivery are separate
   from a successful build and isolated tests. They must not be described as
   completed unless actually exercised. No production merge is requested here.

### Related work for Claude

- **Homepage design:** [PR #273](https://github.com/phillipwedgworth-cell/envirocare-website/pull/273)
  remains the dedicated homepage/layout proposal; assess its authenticated
  preview separately. This follow-up does not replace that design.
- **Remaining Shelby office labels:** [PR #274](https://github.com/phillipwedgworth-cell/envirocare-website/pull/274)
  already holds Claude's follow-up. Avoid duplicating those page edits.
- **NeuronWriter quota protection:** [PR #275](https://github.com/phillipwedgworth-cell/envirocare-website/pull/275),
  branch `fix/neuronwriter-query-reuse-2026-10-18`, is a separate review. Its existing
  `agents/neuronwriter-content/review-2026-10-17/SPYFU-TO-NEURON-CLAUDE.md`
  handoff is corrected from Claude's October 17 scoring comment. The four
  drafts are already evaluated and should not be appended merely for length.
- **Next content-trust review:** `/reviews` displays prose labelled as common
  themes with quotation marks and individual five-star treatments. Verify the
  underlying source before presenting a theme as a customer's actual quote.
  This patch changes that page's pricing destination only.

---

**Method.** Fetched all **156 URLs in the live sitemap** on www.envirocarellc.com,
stripped tags, and scanned rendered text against `data/compliance.ts` plus the
owner-stated bans. Rendered output, not source — the "founded in 1958" episode
showed source can look clean while the page is still wrong.

Everything below is **verified live or verified in the rule text**, with the check
named. Where I could not verify, I say so instead of guessing.

---

## 1. Two claims in the Aug-9 live-verification doc are FALSE

Do not action §10 of that doc. Checked with `AllowAutoRedirect=$false`:

| Doc claim | Actual |
|---|---|
| `envirocare-web.vercel.app` returns **302**, "change to 301" | **308** → `https://www.envirocarellc.com/` — already permanent |
| apex `envirocarellc.com` "serves 200, consolidation by canonical only" | **308** → `https://www.envirocarellc.com/` |

Both already correct. There is no redirect fix to make. This matches what
`AGENTS.md` recorded on Jul 26 — the doc regressed against a verified finding.

---

## 2. FIXED this pass (pushed to `fix/orphans-and-header`, PR #74)

### 2a. The site told realtors the wrong WDO form — 11 places

The most serious finding. `/realtor` (including its **search-result metadata**),
`/builders`, `/services`, `/faq`, two blog posts and the Realtor/Builders/Services
components all said Alabama uses the **NPMA-33**. It does not.

**Ala. Admin. Code r. 80-10-9-.18**, rule text read directly 2026-08-08 at
`admincode.legislature.state.al.us/api/rule/80-10-9-.18`: the instrument is the
**"Official Alabama Wood Infestation Inspection Report"**, Part A and Part B,
issued as **Exhibit "A"** to the rule and obtained from the Commissioner.

`/realtor` went further: *"NPMA-33 is the federal standard — same form your lender
already accepts. No special version, no rejection at closing."* That is an
affirmative false statement aimed at the one audience that would catch it.

`WDIIR-100` also appears nowhere in the rule — same class of error as the
fabricated `ADAI-WDO-100` caught earlier.

> **⚠ Needs Phillip, not code.** If EnviroCare *does* in practice issue an NPMA-33
> alongside the Alabama report, that is an operations fact I cannot verify from the
> repo. I changed the copy to the form the rule names. If practice differs, tell me
> and I will reflect both.

### 2b. Turnaround-time promises removed from every WDO/termite surface
`/realtor` (×3, in metadata), `/services/wdo-letters` (×3), `/birmingham-termite-control`,
`/builders`, `/services`, FAQ, blog, `data/services.ts`.

**Deliberately kept** (not violations): `/contact-us` "we call back within 2 hours"
— a real commitment the office makes, not a WDO claim; and genuine non-promises
like "if heavy rain falls within 24 hours of your treatment" on `/faq/mosquito`.

### 2c. Contract-free claims
"pay per visit with **no long-term agreement**" on `/best-pest-control-birmingham`
and `/family-owned-vs-national-chains`. Retired by owner direction. Replaced with
the positive framing: pay per visit billed as serviced, or equal monthly ACH under
a 12-month billing agreement, terms confirmed in writing before service starts.

### 2d. Guarantee asserted as a claim
`/faq/termite-warranty` — *"Our guarantee — four generations behind it"* survived
the earlier sweep. Now "Subject to the terms of the agreement".

### 2e. Visible typo on `/realtor`
The hero rendered **`we\'ve`** with a literal backslash — an escaped apostrophe
sitting in JSX text, where escaping does not apply. Live before/after verified.
Scanned the rest of the codebase for the same pattern: this was the only one.

### 2f. Guards added so none of it regenerates
This is the part that matters. Every item above was **already a written rule with
no machine check behind it** — the same failure mode as the retired $32/mo price.
Added to `data/compliance.ts`: contract-free claims, cancel-anytime, turnaround
promises, wrong/nonexistent WDO form designations, retired company name.

Tested **20/20**, including that approved phrasings still pass: "unlimited free
re-service", the negated guarantee hedges ("we never guarantee elimination"), and
the statutory 90-day retreatment period.

Turnaround and name are `warn`, not `block` — the owner's turnaround rule is
page-scoped and the name is still sitewide `BRAND_NAME`, so blocking either would
fail the build today.

---

## 3. Open — needs a decision before code

### 3a. The name rollout (biggest outstanding item)
`EnviroCare Pest & Termite Services` renders on **all 156 pages** — it is the
sitewide footer heading and `BRAND_NAME` in `lib/schema.tsx`, which feeds
**Organization JSON-LD on every page**. 47 files reference it.

I have **stopped the agents generating it** (`agents/lib/compliance.mjs`, pushed).
I have **not** touched the 47 files, because that is an outward-facing NAP change.

> The authority for the change is cited as `claude/EnviroCare-Name-Decision-FINAL-Aug9.md`.
> **That file is not in the repo.** Before a sitewide NAP edit, either commit it or
> confirm the decision directly. Per-location target:
> Alexander City / Alabaster / Huntsville → **EnviroCare**; Birmingham → **EnviroCare Pest Services**.
> Reminder: do **not** add words to a verified Google listing name — that triggers re-review.

### 3b. `AGENTS.md` contradicts the compliance rules
Two conflicts, both in the file every agent reads first:
- says **"founded 1958"** — banned phrasing (family since 1958; EnviroCare LLC began 1993)
- says canonical brand is **"EnviroCare, LLC"** — `compliance.mjs` bans that string

Left alone because it interacts with 3a. Worth resolving in the same pass.

### 3c. `/faq/mosquito` publishes "Get 50% Off First Treatment"
Discounts are decision-gated (`severity: 'warn'`), not banned. Is this offer current?
Also live on `/special-offers`, `/huntsville-mosquito-control`, `/auburn`.

---

## 4. Technical findings — real but low severity

| Finding | Count | Note |
|---|---|---|
| `<title>` over 65 chars | **56** | worst: `/birmingham` (**91**), `/blog/cockroach-control-alabama` (76), `/wdo-inspection-letters-alabama` (75) |
| meta description over 165 chars | **15** | worst: `/wdo-inspection-letters-alabama` (238), `/` (236), `/birmingham` (226) |
| HTTP status ≠ 200 in sitemap | **0** | every sitemap URL returns 200 |
| missing title / meta / canonical / h1 | **0** | clean across all 156 |
| duplicate h1 | **0** | clean |

Google truncates rather than penalises, so this is a CTR question, not a ranking
one. `/birmingham` at 91 chars is the clear first fix.

---

## 5. Code findings for Desktop

### 5a. Next 15 breaking change — sync `params` in 4 files
`params` is a **Promise** in Next 15. These use the Next 14 signature:
- `app/api/ads/[id]/route.ts`
- `app/api/ads/[id]/approve/route.ts`
- `app/api/ads/[id]/feedback/route.ts`
- `app/ads/[id]/page.tsx`

All four are the **approval-console** surface (PR #67). Next 15 still allows sync
access during migration but warns; this is the thing to fix before it hard-breaks.
**Not touched** — it is Desktop's area and I did not want to collide mid-PR.

### 5b. `npx tsc --noEmit` reports 21, not 11 — but the baseline is intact
**10 of the 21 are stale `.next/types` build artifacts, not source.** Proof:
`.next/types/app/request-quote/page.ts` references `app/request-quote/`, which no
longer exists. Filter with `grep -v '^\.next/'` and it is **11**, the known baseline,
unchanged before and after everything in this audit. Anyone quoting "21 type errors"
is reading a stale build directory.

The 11 real ones are unchanged and still open: `PestIconName` (CityPage,
PestLibraryIndex, PestLibraryPage), `JSX` namespace (ChatWidget), generic arity
(`lib/ads.ts`), and a dead string comparison in `ContactUs.tsx`.

---

## 6. Method note — two bugs in my own audit tooling, both fixed

Recording these because the same shape will bite anything that reads
`data/compliance.ts` by parsing instead of importing:

1. **Backslashes were not unescaped** on the single-quoted pattern path, so every
   `\b`-anchored rule compiled to a literal backslash and silently matched nothing.
   The first audit run under-reported.
2. **`notIf` was not unescaped either**, so every carve-out was dead — which
   reported all 81 pages using the *approved* "unlimited free re-service" phrasing
   as violations.

A `notIf` on its own line is also silently dropped by line-by-line parsers. I put a
comment in `data/compliance.ts` requiring `pattern` and `notIf` to stay on one line.

**If a scan of this file reports zero hits, suspect the parser before believing the
site is clean.**
