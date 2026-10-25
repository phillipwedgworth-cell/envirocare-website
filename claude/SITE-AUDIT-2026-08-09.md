# Homepage mobile redesign review — 2026-10-18

This section records a new homepage proposal. The historical August audit below
remains dated; it is not evidence of the current production state.

**Branch:** `design/homepage-mobile-2026-10-18`, based on production/main
`390f32eafcdfc35d0d7d9bd7608dfdfbb9b4869a`. Review before merging.
The Vercel project serving www is `envirocare-web-only-testing`.

**Review status:** [draft PR #273](https://github.com/phillipwedgworth-cell/envirocare-website/pull/273)
has a successful Guards workflow and two successful Vercel checks. The intended
project's [preview deployment](https://vercel.com/envirocare-50d39ae8/envirocare-web-only-testing/2BMq1PP8mtuLsj7ekcZveEZFiTvu)
is READY for application commit `343c348b6647c67306e9acfd5fa0aad5eda0f157`.
The preview requires Vercel authentication. Visual/browser interaction checks
are pending access; a successful deployment is not a substitute for them.

## Measured live baseline

[Google PageSpeed mobile report, October 18 at 7:52 AM CDT](https://pagespeed.web.dev/analysis/https-www-envirocarellc-com/f1v4td27i3?form_factor=mobile)
uses Lighthouse 13.5.0, an emulated Moto G Power and slow 4G. One run is a lab
sample, not a promise about every visitor.

| Measurement | Live homepage |
|---|---:|
| Mobile performance | 85 / 100 |
| Accessibility | 96 / 100 |
| Best practices / SEO | 100 / 100 each |
| First contentful paint | 1.1 s |
| Largest contentful paint | 4.0 s |
| Total blocking time | 0 ms |
| Cumulative layout shift | 0 |
| Speed index | 4.1 s |

The same report shows **origin-level** real-user Core Web Vitals passing over
the latest 28 days: LCP 1.0 s, CLS 0, INP unavailable. URL-level data is disabled.
Do not describe that origin sample as a homepage-specific INP result.

Independent HTTP/source inspection found a 96,316-byte `/family-yard.jpg`
background under an almost opaque gradient, with its own high-priority preload.
The separate visible mobile hero was already optimized: its 750px AVIF was
24,793 bytes. The background is genuinely used by the old CSS; the proposal
removes both that background and its preload. It replaces the separate desktop
and mobile hero elements with one responsive image, closing the old 961–1023px
visibility gap. These are measured payload/code changes, not measured LCP gains.

The old document contained 64,062 characters of inline CSS, including competing
mobile/base rules. The new static homepage uses a CSS module and renders on the
server, with small pricing and ZIP form client components. Existing deferred
chat/tracking, font-display swap, image optimization and immutable asset caching
are retained.

A matched local-build comparison finds approximately 19% less decoded HTML,
75% less homepage route JavaScript, 12% less initial modern JavaScript overall,
and 27% less combined inline/external CSS. The per-resource gzip estimate for
HTML + initial JS + external CSS falls about 8%, excluding images, fonts, later
chunks and third-party scripts. Removing the 96,316-byte background request is
additional. These local byte comparisons are not Vercel transfer measurements
or a measured reduction in LCP.

## Design decisions for Claude to review

- First screen: service/location eyebrow, one benefit-led heading, one short
  introduction, quote and call actions, and a single existing family-yard photo.
- Service/pricing comparison: three desktop cards; native expandable phone
  rows. The per-service / Monthly ACH toggle reads canonical pricing. All terms
  remain in server-rendered HTML. Monthly mosquito pricing visibly identifies
  the average-size-yard condition.
- Social proof: four existing published customer quotes without an invented
  live rating, review count or verification claim.
- Family story: the actual ribbon-cutting image and Kevin portrait; 1958 is
  explicitly the family's history with roots in Alexander City.
- Local help: a labeled ZIP form using canonical routing and all four canonical
  office cards. Auburn remains a service-area phone, not a fifth office.
- Mobile actions: Quote is gold with dark lettering, Call stays clear, Pay Bill
  remains available. Existing behavior and destinations are retained.
- Footer secondary text: `#5f6d63` on `#F2F6EF`, calculated contrast 4.98:1,
  replacing 3.40:1. Other footer content and layout are unchanged.

No generated staff, trucks or offices, additional font, carousel, video,
third-party dependency or changed lead endpoint. The hero is the existing
approved stock photo and is not presented as a photographed customer/job.

## Review path and acceptance checks

On the branch's Vercel preview, open `/design-review`. The review board compares
the current live site and redesign at 360, 390, 430, 768, 980 and 1280px.
Scroll inside the embedded page. This checks CSS layout, not phone hardware or
network performance. The board is noindex and returns 404 in production.

1. Check first-screen order, photo cropping, CTA visibility and horizontal
   overflow at each offered width, especially 980px.
2. Expand each phone pricing row; switch Per Service / Monthly ACH. Confirm
   $70/visit, from $35/month pest, $45/month mosquito, from $69/month bundle,
   inspection-only termite pricing, the initial-service promo and ACH terms.
3. Test ZIP input with Enter, an invalid value, an unmapped ZIP, Birmingham,
   Alabaster, Huntsville and Auburn; inspect phone hrefs without placing calls.
4. Open the quote page without submitting a lead, and inspect mobile Call,
   Pay Bill and Quote destinations. Plain `/quote` links avoid exposing an
   existing service-query hydration issue while PR #272 remains separate.
5. Verify metadata/canonical, Speakable selectors, crawlable service and city
   destinations, actual family photos and coverage attribution/qualifications.
6. Re-run mobile PageSpeed against an accessible preview, then production only
   after an approved merge. Keep lab results separate from 28-day field data.

Local verification: production build succeeds (214 generated pages; final
application build reports 6.70 kB route size / 118 kB First Load JS). All 19 local guards that can
run fully pass. BrightLocal listings is explicitly skipped because its API key
is not configured. Targeted ESLint passes. The repository already suppresses
build type/lint gates. Before generating route types, standalone TypeScript
reports 11 existing source errors outside the changed homepage files. After
building it reports those 11 plus seven generated-type errors for the unchanged
ads routes (18 total). There are no errors in the changed homepage/review files.
No additional checks were suppressed.

A self-contained static layout snapshot was supplied to Phillip separately.
It embeds the built CSS, fonts and existing photos for width-by-width review.
Native pricing disclosures work; it intentionally has no live application
scripts, tracking or working form submission. It is not evidence that the
protected Vercel app has passed interaction or visual QA.

The existing PR #272 quote-lead/office-routing/blog work is independent of this
homepage proposal. Do not mark it merged or combine its validation claims here.

---

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
