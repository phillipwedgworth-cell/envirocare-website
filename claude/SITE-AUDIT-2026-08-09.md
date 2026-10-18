# Homepage mobile redesign review — 2026-10-18

This section records a new homepage proposal. The historical August audit below
remains dated; it is not evidence of the current production state.

**Branch:** `design/homepage-mobile-2026-10-18`, based on production/main
`390f32eafcdfc35d0d7d9bd7608dfdfbb9b4869a`. Review before merging.
The Vercel project serving www is `envirocare-web-only-testing`.

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

Local verification: production build succeeds (214 generated pages; homepage
reported 6.68 kB route size / 118 kB First Load JS). All 19 local guards that can
run fully pass. BrightLocal listings is explicitly skipped because its API key
is not configured. Targeted ESLint passes. The repository already suppresses
build type/lint gates; standalone TypeScript reports 11 existing errors outside
the changed homepage files. No additional checks were suppressed.

The existing PR #272 quote-lead/office-routing/blog work is independent of this
homepage proposal. Do not mark it merged or combine its validation claims here.

---

# Site audit — 2026-08-09 (Claude Code → Desktop handoff)

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
