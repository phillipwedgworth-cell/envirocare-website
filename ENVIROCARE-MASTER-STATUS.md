# EnviroCare — MASTER STATUS

**Updated:** July 23, 2026
**Rule:** Read this first every session. One source of truth. No other handoff files.

---

## REPO (definitive)

**Local path:** `C:\Users\pwedg\Desktop\Envirocare Stuf\envirocare-website-deploy\`
**GitHub:** `https://github.com/phillipwedgworth-cell/envirocare-website`
**Vercel project:** `envirocare-web` · `prj_bD63HstQIuOMn5cEGDK4RAW7yM2F` · team `envirocare-50d39ae8`
**Live URL:** `https://envirocare-web.vercel.app` (no custom domain — Phase 6)
**Current HEAD:** `7fdd49a` (July 23, 2026 — SEO Local Falcon fix + blog updates, deployed green)

**Old repo clone** `Desktop\Envirocare Stuf\envirocare-web\` is the ARCHIVED repo — never push there. Recommend archiving the folder.

---

## GENERATION — SETTLED (do not re-derive)

The company is **fourth-generation** (founded 1958). **Kevin Wedgworth is the third-generation OWNER.** Phillip M. Wedgworth is the gen-1 FOUNDER, not an owner. The live site says "Four Generations Strong" everywhere and this is machine-enforced in `data/compliance.ts` (company-level "third-generation family/business/company" is a banned pattern). Older docs saying "Three Generations Strong" are stale — the hero was corrected.

---

## RECENT WORK (July 23, 2026)

- **SEO Local Falcon fix (commit `a599592`)** — both SoLV agents were reading the wrong source and the 2026-07-22 "EnviroCare is invisible, every keyword at 0%" digest was a BUG, never true. `seo-snapshot.mjs` pointed at v2 campaign keys paused since 6/30 (frozen numbers for 23 days); `seo-monitor.mjs` polled the scan list where campaign scans never appear. Both now read `GET /v1/campaigns/{key}/report` (0 scan credits) against the live v3 campaigns. Targets re-baselined for the v3 9x9@20mi grid (Alabaster 20 / Alex City 40 / Huntsville 10). Source of truth: `agents/knowledge/local-falcon-baseline.md` — any SoLV-touching agent reads it first. **🔴 REQUIRES a Supabase migration** — `agents/lib/migrations/add_seo_metrics_baseline_grid.sql` must be run in the Supabase SQL editor (project `dyoujmyleihcpqgeifre`) or the daily 09:00 UTC snapshot throws PGRST204. Confirm via `/command-center` → Ranking Snapshots after the next cron run.
- **Blog (commit `7fdd49a`)** — new post `fleas-in-house-no-pets`; `spider-control-alabama` expanded 584 → ~1,384 words. Added optional `updatedAt` to the BlogPost interface (emits dateModified in Article schema).
- **CFO / growth analysis (separate repo `envirocare-cfo`)** — full FY2025 baseline: revenue $2.16M, net income $147K, ~54% GM. Growth is ~16% billed / ~5–6% organic net of churn. CY2025 churn $217,788 (~11% dollar). Rep concentration (one rep 57% of credited ACV) and 76% blank marketing attribution are the two structural caps. Forecast out-years not credible (COGS modeled to fall while revenue doubles). Docs live in `Desktop\Envirocare-System\`.

---

## WHAT'S LIVE

- **Hero**: "Four Generations Strong" headline + one-tech-one-invoice sub, clutter stripped per panel spec (no stat boxes/floating cards/pest strip/orbs)
- **Pricing section (Jun 11 spec — SUPERSEDED, see docs/PRICING-SECTION-COPY-SPEC.md; prices come from data/pricing.ts)**: 4 plan cards in both toggle states — Essential $35/mo ($70/visit · $108 quarterly · $150/$99 initial), Foundation $67/mo ($325 install incl yr-1 + $380/yr renewal per-service), **Outdoor Pro $49/mo** (= $65 × 9 treatments billed evenly · mosquito + tick + chigger · NO flea · $0 initial), **Complete $116/mo** (printed math $35+$32+$49). Initial-fee trust strip (competitor-neutral variant).
- **Brand system locked in code**: `lib/brand.ts` tokens · BrandBand identifier on every interior page (via shared Header) · shared Footer · Playfair/DM Sans · the real full logo (old `public/logo.png` was a cropped file — replaced Jun 10, original archived)
- 31 city pages (Pelham/Alabaster/Helena/Decatur/Athens/Madison/Huntsville all DEEP) + 15 Lake Martin neighborhood pages with waterfront language (dock-pier-boathouse line)
- **6 city×service combo pages**: birmingham/huntsville × mosquito-control/termite-control/exterminator
- Service pages incl. **NEW /services/interior-pest-control** and the rebuilt standalone /services/fire-ant
- **Scout chatbot**: sales talk tracks (value→price→included→close), branded widget (ink header, white logo, cream bubbles), callback capture, current pricing — verified live
- **ScheduleRequest** widget on Homepage + /quote + all CityPage cities (Formspree `xwvypjal`)
- **AI search layer**: /llms.txt fact sheet · robots.ts explicitly allows GPTBot/ClaudeBot/PerplexityBot/Google-Extended
- Sitemap: 80+ canonical URLs incl. all 21 blog posts + combos (rebuilt Jun 10 — old one listed redirect URLs and zero blog posts)
- Agent system: brightlocal + review-responder (Mondays) + seo-monitor + neuronwriter-qa (Mondays, quota-gated) + cfo + site-reviewer + orchestrator. **Cron is DAILY 9:00 UTC.** Digests email from alerts@envirocarellc.com (domain verified in Resend).
- `/api/integrations/status` — read-only health check for Resend/Supabase/keys

## NAV/FOOTER LINKS — FIXED (Jun 9–10)

The 9 broken links are redirected in next.config.ts and all 8 page templates now use the unified shared Header/Footer (the old root cause). NOTE: `/services/commercial → /commercial` from the original fix list was BACKWARDS (sent a real page to a 404) — corrected Jun 10 to `/commercial → /services/commercial`.

**Still open from that audit:** 5 redirects shadow real pages that exist in the repo: `/pricing→/quote`, `/bundle-services→/pricing`, `/reviews→/`, `/special-offers→/pricing`, `/realtor→/services/wdo-letters`. Phillip decides: keep redirect or surface page.

---

## SEO STATUS (Jun 10–11)

- **Lighthouse**: desktop 92 perf / 100 SEO / 93 a11y · mobile 65 (LCP 7.1s = the one real issue; 8 images compressed Jun 11, fonts→next/font still queued)
- **NeuronWriter** (project `9d0bec3a70f4743c`, ~25 of 75 monthly queries used): 22 pages tracked, leaders birmingham-mosquito 66 / huntsville 60; floor crawlspace 15, commercial 25 — those two need full Stage-2 builds. Re-scoring is FREE via `agents/rescore-all.mjs` (evaluate-content costs no quota).
- **Local (v3 grid, re-baselined 2026-07-23)**: SoLV now read from live v3 campaigns (9x9@20mi) — do NOT compare against pre-7/23 v2 numbers (5x5@15mi), different denominator. Latest: Birmingham/Alabaster ~2.7%, Lake Martin/Alex City ~44%, Huntsville ~0.2%. Huntsville is genuinely weak (review-volume problem, real on both grids). Alex City still 0/100 citations, NO Citation Tracker campaign — must be created in BrightLocal dashboard.
- envirocarellc.com DNS still points at old Scorpion host — nothing new shows there until Phase 6

---

## OPEN ITEMS (priority order)

**Phillip-only (blocked on him):**
0. **🔴 Run the Supabase migration** `agents/lib/migrations/add_seo_metrics_baseline_grid.sql` in the Supabase SQL editor (project `dyoujmyleihcpqgeifre`). Until then the daily SEO snapshot fails. Verify via `/command-center` after the next 09:00 UTC run.
1. Confirm $98/quarter assumption: full standalone inside+outside quarterly plan, or interior-only bolt-on? (interior-pest-control page header carries the assumption)
2. `vercel env add NOTION_TOKEN production` — last missing key; unblocks review-drafter Notion posting
3. Supermetrics Google Ads login (link in chat Jun 10) → then the Huntsville bridge campaign builds from chat
4. hero-tech.jpg/webp → Downloads → hero photo swap (spec already received)
5. GBP session: 3 offices (categories/photos/services/descriptions) + fix "Bundle & Save" zombie copy in BrightLocal GMB Active Sync description (location 4068335) + create Alex City CT campaign
6. $5/review tech incentive — yes/no
7. Anthropic budget alert at console.anthropic.com (credits ran dry once Jun 10 — Scout went down silently)

**Code/content queue:**
8. Fonts → next/font display:swap (biggest remaining mobile-LCP lever)
9. Stage-2 deep builds: crawlspace (NW 15) + commercial (NW 25, 5K impressions/0 clicks)
10. City-page plan cards on ~10 older city components still show $59/$79 prices (cadence fixed, prices not — needs locked-pricing decision)
11. Two a11y items: ARIA toggle names + one contrast pair

---

## PHASE PLAN

1. Homepage v2 ✅  2. Auburn + Termite ✅  3. Cities/services v2 ✅ (deep content ongoing)
4. GSC + sitemap ✅  5. Google Ads — build sheet ready, blocked on Supermetrics auth or Chrome Claude
6. DNS flip — LAST

---

## KEY IDS / KEYS

- All required agent env vars present in Vercel (health: `/api/agents/health`). Only NOTION_TOKEN missing; NOTIFY_FROM set to alerts@envirocarellc.com (Resend domain VERIFIED).
- NeuronWriter: key + project in Vercel and `.env.local`; project `9d0bec3a70f4743c`
- Local Falcon CAMPAIGN keys (v3 live, 9x9@20mi — store these, NOT scan report_keys which expire): Huntsville `a58db3090ac9ab0` · Birmingham/Alabaster `4ee47a23fc4793e` · Lake Martin/Alex City `a99dae3fd51a462`. Read via `GET /v1/campaigns/{key}/report` (0 scan credits). Dead: report_keys `cd64365e1dab32f`/`7febc8908039d6d`/`644c1bcec9e3b67` and v2 campaigns `1822923e68f74d1`/`b6d42c9c19856f2`/`7d2a6df072df6f8` (paused 6/30).
- Place IDs: Alabaster `ChIJr8cmt-EeiYgR_jgX9xsiZWY` · Huntsville `ChIJd4YXKCRmqmIR1DmDoEcGohU` · Alex City `ChIJ508mEjcLjIgRZ2HdWgXX76c`
- BrightLocal RM reports: Alabaster 630345 · Huntsville 630846 · Alex City 631866 · location IDs 4068335/4068730/4068729
- Google Ads account: `6799827884` — all 37 campaigns PAUSED
- Formspree: `xwvypjal` (working — do not touch) · second form `xzdozjdk` unused/reserved
- Notion pages: 48-Hour Test Plan `37b202ee-7a71-8132-a234-d3f88eacfeb3` · NeuronWriter QA `37b202ee-7a71-81d1-952d-da64def90de0` · Review Response Station `37b202ee-7a71-813f-a3f8-e3e5807bd7bb` · Monday Brief `377202ee-7a71-81fa-9e5b-e06097a75012`

---

## PRICING MODEL

**⚠️ SUPERSEDED (2026-07-24): `data/pricing.ts` is now the single source of truth and the live /pricing page matches it.** Current plan set: Pest **$35/mo** ($75 startup) · Pest + Mosquito **$69/mo** ($75 startup, Most Popular) · Complete **~$100/mo** ($229 startup, Best Value). Termite has NO flat price (quoted after free WDO inspection; `monthlyAnchor` is an OPEN Phillip decision). Mosquito add-on $45/visit ($34/mo only when paired with pest); Mosquito+Tick $65/visit. The $116 Complete and the Jun-11 card set below are HISTORICAL — do not quote them. ($127 and $60-Outdoor remain retired.)

## OLD PRICING MODEL (locked Jun 11 — superseded, kept for history)

- Bi-monthly pest: $35/mo ACH · $70/visit · $108 quarterly · initial $150 (ask about $99). Covers 30+ pests. Fire ant/flea/tick NOT included.
- Fire ant: $150 minimum, priced per sq ft of covered area. Standalone, open to anyone. Locked copy: "Starting at $150 — priced by the size of your yard."
- Tick: $150 minimum standalone, OR +$20/treatment with mosquito ($65 total) = **Outdoor Pro $49/mo** ($65 × 9 treatments Mar–Nov billed evenly across 12 months). Chigger coverage included. NO flea in Outdoor.
- Mosquito alone: $45/mo, 9 treatments Mar–Nov, 30-day cycle.
- Interior + exterior quarterly plan: $98/quarter. Flea = +$30/quarter add-on REQUIRING it ($128/quarter). Page: /services/interior-pest-control.
- Sentricon: $32/mo OR $325 install (includes year-1 guarantee) + $380/yr renewal. Up to $1M coverage.
- ~~Plans: Essential $35 · Foundation $67 · Outdoor Pro $49 · **Complete $116**~~ **SUPERSEDED — these are Jun-11 spec numbers, not live prices. data/pricing.ts reads $35 / $69 / ~$100. Do not implement.** Original for history:

## DO NOT

- Delete the `envirocare-web` Vercel project
- Push to the archived old repo (`zz-ARCHIVED-envirocare-web-OLD`)
- Mention lawn care anywhere on the site
- Use banned language: same-day, pet-safe, kid-safe, non-toxic, eco-safe, "safe for kids/pets" — EPA Option 1 copy only
- Say quarterly for the core plan (bi-monthly), or that fire ant/flea/tick are "included"
- Put "500+" review count on public pages — use real number or remove
- Touch `node_modules/`, `.next/`, `package-lock.json`
- Let neuronwriter-qa run outside Mondays in automation (16 queries/run × daily cron = month's quota in 5 days; gate is in code)
