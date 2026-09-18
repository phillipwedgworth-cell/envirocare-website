# SpyFu Marketing Intelligence Report — 2026-09-17

Source: SpyFu API, relayed via ChatGPT. **Not a live crawl** — the report itself
states locations and pages were inferred from indexed ranking URLs, SEO titles,
and SpyFu's own search index. Treat rankings/volumes/CPC as third-party
estimates, not verified numbers. `ingest-gsc.mjs` already stores EnviroCare's
actual GSC clicks/impressions/position weekly in Supabase (`gsc_queries`,
`gsc_pages`) — cross-check any decision against that before acting, since it's
real data and this report is inferred.

## ⚠️ Verification notes — read before acting on this report

1. **Tuscaloosa conflict — do not act on this.** The report's
   `locations_detected` list and **priority #2** both include Tuscaloosa as a
   market to target. `agents/knowledge/strategy.md` (the single source of
   strategic truth) states explicitly: **"No Tuscaloosa."** AGENTS.md's Code
   Review canon also lists it under retired services/areas: "Tuscaloosa is not
   a service area." SpyFu is picking up incidental ranking signal (probably
   from `/service-areas` or a blog mention), not an actual service commitment.
   **Do not build Tuscaloosa content, target Tuscaloosa keywords, or treat
   priority #2 as written** — strip Tuscaloosa out of it if this list is used
   to plan work.
2. **The "duplicate/legacy geo URL" technical item is already resolved for the
   `/where-we-service/*` examples.** AGENTS.md records these as verified-live
   one-hop server-side 308 permanent redirects (checked Jul 26 2026), not an
   open defect. The one pair worth a fresh look is `/decatur` vs.
   `/decatur-pest-control` — spot-check that it follows the same pattern
   before treating it as new work.
3. This file is a **raw external research drop**, saved for reference and
   cross-referencing — it hasn't been vetted line-by-line beyond the two
   points above. Verify specific rank/volume claims against GSC or Local
   Falcon before using them to justify a content or spend decision.

---

## Organic snapshot (SpyFu estimate)

| Metric | Value |
|---|---|
| Ranking keywords | 1,040 |
| Est. monthly organic clicks | 310 |
| Est. monthly organic value | $18,166.59 |
| Represented search volume | 46,155 |
| Detected top pages | 108 |

## Locations detected in SpyFu's index

Birmingham, Huntsville, Decatur, Chelsea, Alexander City, Alabaster, Hoover,
Auburn, Pelham, Gardendale, Opelika, Vestavia Hills, Trussville, Calera,
Leeds, Madison, Homewood, ~~Tuscaloosa~~ (not a service area — see note above),
Mountain Brook, Crestline, Fultondale, Greystone, Lake Martin, East
Birmingham, South Birmingham, Oak Mountain, English Village.

## SEO competitors (shared ranking terms)

| Domain | Shared terms |
|---|---|
| callwaynes.com | 125 |
| magiccitypestcontrol.com | 99 |
| alabamatermite.com | 97 |
| starkexterminators.com | 73 |
| knoxpest.com | 71 |
| cookspest.com | 68 |
| prewettpestcontrol.com | 58 |
| mrbuggs.com | 60 |
| safespraypestcontrol.com | 53 |
| peskiespestcontrol.com | 46 |
| alabamapestpros.us | 50 |
| roguepest.com | 39 |
| athenapestcontrol.com | 39 |
| scoutpestcontrol.com | 37 |
| steelcitypest.com | 25 |

## Priority commercial keywords

| Term | Volume | Rank | Difficulty | CPC | URL |
|---|---|---|---|---|---|
| pest control huntsville al | 1,000 | 29–31 | 41 | $9.02 | /huntsville |
| pest control birmingham al | 660 | 30 | 52 | $11.70 | /services/pest-control |
| pest control birmingham al | 660 | 58 | 52 | $11.70 | /birmingham |
| decatur pest control | 420 | 19–20 | 26 | $12.94 | /decatur |
| auburn pest control | 195 | 32 | 27 | $9.94 | /auburn |
| pest control opelika al | 195 | 17 | 23 | — | /opelika |
| pest control in alabama | 170 | 22 | 52 | $11.18 | / |
| pest control trussville al | 135 | 17 | 44 | — | /east-birmingham |
| chelsea pest control | 135 | 21 | 17 | — | /chelsea |
| pest control tuscaloosa | 115 | 37 | 23 | $12.93 | /service-areas |

*(Last row: Tuscaloosa — do not action per the note above.)*

## Content cluster opportunity — Sentricon / termite comparison

Already has a ranking page:
`https://www.envirocarellc.com/blog/sentricon-vs-liquid-termite-treatment`

| Term | Volume | Rank |
|---|---|---|
| is sentricon worth it | 510 | 27 |
| trelona vs sentricon | 340 | 20 |
| sentricon reviews | 220 | 23 |
| sentricon termite | 180 | 17 |
| does sentricon work | 135 | 16 |
| sentricon vs termidor | 135 | 15 |

**Reminder if this cluster gets expanded:** per AGENTS.md Code Review canon
§1, the $1,000,000 termite damage repair coverage is **EnviroCare's**, never
Sentricon's/Corteva's — any new content here must attribute it correctly and
say "damage repair coverage," never "warranty"/"guarantee."

## Top pages (SpyFu estimate)

| Page | Est. clicks | Keywords |
|---|---|---|
| / | 90 | 139 |
| /blog/sentricon-vs-liquid-termite-treatment | 21 | 34 |
| /huntsville | 21 | 27 |
| /chelsea | 14 | 17 |
| /contact-us | 14 | 14 |
| /decatur | 12 | 8 |
| /pest-library/centipedes | 11 | 10 |
| /pest-library/millipedes | 9 | 5 |
| /blog/cockroach-control-alabama | 9 | 11 |
| /services/termite-control | 9 | 27 |

## PPC snapshot

| Term | Volume | CPC | Competitors |
|---|---|---|---|
| guaranty pest control bessemer al | 55 | $6.21 | 5 |
| birmingham termite | — | — | 3 |
| pest control hoover alabama | — | — | 5 |
| envirocare 35007 alabama united states | — | — | 2 |

## Strategic priorities (as reported — see verification notes)

1. Improve existing local pages ranking positions 11–40 before creating
   excessive new city pages.
2. Concentrate first on Huntsville, Birmingham, Decatur, Opelika, Auburn,
   Chelsea, Trussville and ~~Tuscaloosa~~ commercial queries.
3. Consolidate duplicate/legacy geographic URLs where appropriate (see note —
   mostly already done).
4. Expand the Sentricon/termite educational cluster.
5. Strengthen internal links from pest-library articles to local
   service/conversion pages.
6. Compare location-page content, backlinks and keyword gaps against Magic
   City Pest Control, Alabama Termite, Prewett, Wayne's, Cook's, Stark, Mr.
   Buggs, Rogue Pest and SafeSpray. Note: **competitor names must never
   appear in customer-facing copy** (AGENTS.md Code Review canon §2) — this
   is internal research only.
