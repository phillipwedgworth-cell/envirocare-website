# EnviroCare broad competitive investigation

Source: `envirocare_ai_research_hub` package (SpyFu-based), saved 2026-09-17.
Companion to `spyfu-marketing-intelligence-2026-09-17.md` and
`spyfu-current-findings-2026-09-17.json` — same source, same corrections
philosophy. See those files' notes for the general caveat on third-party
estimated data vs. real GSC numbers.

## ⚠️ Corrections applied before saving

1. **Tuscaloosa (item #4 below, and the Weeks 3–6 plan) — not actionable.**
   Tuscaloosa is not a service area (`strategy.md`: "No Tuscaloosa"; AGENTS.md:
   retired). This is the third artifact in this package that targets
   Tuscaloosa (also in `config.json`'s `priority_locations` and
   `CURRENT_FINDINGS.json`) — it's structural to how the package was built,
   not a one-off. Don't build Tuscaloosa content from any of these.
2. **"Quarterly pest control" (implicit in item #7 / rodent gap theme) —
   EnviroCare's actual cadence is bi-monthly**, not quarterly
   (`app/services/pest-control/page.tsx`). Content built for quarterly-intent
   keywords must describe the real bi-monthly service.
3. Rodent/mice/ant demand (item #7) is a legitimate content gap, not a scope
   question — those pests are already covered under the standard $35/mo Pest
   plan. Wasps should be spot-checked the same way before writing content.

## What is most actionable now

1. **Huntsville needs a focused local-service push.** Wayne's ranks #4 for `huntsville pest control` while EnviroCare ranks #33 on `/huntsville`.
2. **Birmingham commercial intent is under-realized.** Wayne's ranks #1 for `pest control birmingham`; EnviroCare ranks #25 on `/services/pest-control`. Magic City also outranks EnviroCare on Birmingham variants.
3. **Termite bonds are a near-page-one opportunity.** Wayne's ranks #2 for `termite bond birmingham al`; EnviroCare ranks #13 on `/termite-control/`.
4. ~~Tuscaloosa needs a dedicated local landing strategy.~~ **Not actionable — see correction #1 above.**
5. **The Sentricon/termite content cluster is proven but under-optimized.** Wayne's ranks #6 for `does sentricon work`; EnviroCare ranks #16 with its Sentricon comparison article. (Reminder: the $1M coverage is EnviroCare's, never Sentricon's/Corteva's, per AGENTS.md §1.)
6. **Alabama pest education is a competitor moat worth attacking selectively.** Magic City ranks #1 for `cockroaches in alabama` and `ants of alabama`, while EnviroCare already has relevant pest-library/blog assets that rank lower.
7. **Rodent, mice, wasp and ant service demand deserves dedicated review.** A broad Magic City gap pull surfaced large `near me` demand and strong CPCs, especially rodent/mice terms. These are market-wide signals, not Alabama-only forecasts, and the services are already offered — see correction #3.

## 90-day operating plan

### Weeks 1–2
- Crawl the live site with Screaming Frog/Sitebulb or equivalent.
- Verify duplicates/canonicals/redirects for legacy location URL pairs. (Note: most of the `/where-we-service/*` pairs are already verified 308 redirects per AGENTS.md — this mainly means re-checking anything not already covered there.)
- Pull GSC queries/pages for the last 16 months. (`gsc_queries`/`gsc_pages` in Supabase already have recent weekly snapshots via `ingest-gsc.mjs` — start there before a fresh pull.)
- Map every ranking commercial keyword to exactly one primary conversion page.
- Confirm which Alabama cities are genuinely served and which have offices/technicians/reviews/case studies. (`data/offices.ts` + `data/city-offices.ts` are the source of truth here.)

### Weeks 3–6
- Rebuild/expand Birmingham and Huntsville landing experiences. ~~and Tuscaloosa~~
- Expand termite-bond and termite-treatment copy around real service details.
- Add a rodent-control / exclusion commercial hub — service is confirmed already offered (see correction #3).
- Improve internal links from Alabama pest-library articles to relevant local/service pages.
- Refresh cockroach, ant, spider, wasp/hornet and Sentricon content using competitor gaps.

### Weeks 7–12
- Build unique local proof into priority city pages: reviews, cases, service specifics, neighborhoods, office/staff information where factual.
- Test PPC on high-CPC, high-intent categories where organic ranks remain weak.
- Measure calls/forms/revenue by landing page and query theme.
- Refresh SpyFu weekly or monthly and compare rank gaps against the same competitor set. (Pipeline not yet live in this repo — collector script/workflow not delivered as of this save.)

## Measurement
Use SpyFu for market/competitor intelligence, then evaluate business impact with:
- Google Search Console: clicks, impressions, query/page trends. (Already automated weekly — `ingest-gsc.mjs`.)
- GA4: engaged sessions and conversion paths. (Already automated weekly — `ingest-ga4.mjs`.)
- Call tracking: qualified calls by landing page/source.
- CRM: booked jobs and revenue by lead source.
- Google Business Profile: calls, website clicks, direction requests and local visibility.
