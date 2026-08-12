# NeuronWriter → repo enrichment handoff (Aug 12, 2026)

From the Cowork session. Eight pieces of content are finished, compliance-clean, and
scored in the NeuronWriter editor (project `9d0bec3a70f4743c`). Nothing here is live
until this repo consumes it. Read the content out of NW (`get-content` via MCP or the
editor UI) — do NOT rewrite it; it is already scored and rule-checked.

## Scored content ready in NW editor

Scores below are as measured on push. The five city rows were re-measured
independently on Aug 12 and differ by a point in two places (gardendale 56, not 55;
meridianville 49, not 48) — scoring is not perfectly deterministic across runs, so
treat these as ±1, not exact.

| NW query id | keyword | score | maps to |
|---|---|---|---|
| `dd6cfc96a49a7ac1` | flea control birmingham al | **78** | `data/services.ts` → slug `flea` (enrich) |
| `808d78f03f1a9876` | tick control birmingham al | **78** | `data/services.ts` → slug `tick-control` (enrich) |
| `24a3c45c2fd08981` | commercial pest control birmingham al | **73** | `data/services.ts` → slug `commercial` (enrich) |
| `62a1aa71638c91f8` | pre-construction pest treatment alabama | 69 | `/builders` |
| `3a1a7781cefeaeb2` | pest control sylacauga al | 64 | `data/cities.ts` → sylacauga |
| `c15fec13fdda0990` | pest control mccalla al | 59 | `data/cities.ts` → mccalla |
| `76cfc114e678967c` | pest control gardendale al | 56 | `data/cities.ts` → gardendale |
| `21d41c2926735743` | pest control bessemer al | 55 | `data/cities.ts` → bessemer |
| `508dcd3056241d2d` | pest control meridianville al | 49 | `data/cities.ts` → meridianville |

**The floor matters here.** `agents/neuronwriter-narrator.mjs` sets
`SCORE_FLOOR = 65` (ready to ship) and `SHIP_GOOD = 70` (strong). So:

- **The three service drafts (73/78/78) clear both marks.** These are the ones worth
  shipping.
- **Only one of six page drafts clears the floor** (builders, 69). The five city
  drafts are 49–64 and are *not* ready. The city pages they target already exist and
  rank — do not swap working copy for unscored copy on those numbers.

Pricing in the three service drafts was corrected Aug 12 to match `data/services.ts`
exactly (flea $98 + $30 = $128/qtr interior; Mosquito + Tick ~$65/treatment ≈
$48.75/mo, chiggers yes fleas no; commercial walkthrough-quoted). City drafts use
`data/pricing.ts` anchors ($35 / $69 / ~$100). Phone: Birmingham office
(205) 991-2882 throughout.

## Drip schedule (do not ship all at once)

- **Day 0:** merge the graphics branch (images are inert until referenced) and wire
  the two termite/mosquito graphics into their existing posts.
- **Day 2–3:** enrich `services/tick-control` from NW — peak season now, highest urgency.
- **Day 5–6:** enrich `services/flea` from NW.
- **Day 8–10:** enrich `services/commercial` from NW.
- **Following week:** city-page enrichment, one or two per deploy, and only *after*
  their term scores get a lift pass. At 49–64 they are not ready today.

## Repo follow-ups from that session

1. **DELETE stale branch `claude/remote-control-laptop-jF8Mi`** — ruled Aug 12.
   Verified independently: it carries **5 blocking violations**, including the dead
   tracking number `(205) 649-5278` twice, a manufacturer warranty attribution, an
   unqualified $1,000,000, the retired name, and a same-day claim. Its two topics
   (`mosquito-season-alabama`, `termite-swarmers-in-house`) are already covered on
   main by `alabama-termite-swarm-season`, `termite-season-2026-alabama`,
   `mosquito-season-birmingham-al` and `lake-martin-mosquito-guide`.
2. **Guard gap: entity + duration verb + "since 1958"** — CLOSED Aug 12.
   `"EnviroCare has handled … since 1958"` passed `scan-source-compliance` because the
   founded-1958 rule knows only *origin* verbs. Verified, rule added, 4 live
   violations fixed (`/birmingham-mosquito-control`, `/decatur-pest-control`,
   `/mountain-brook`, one blog post) and all six drafts corrected.
   **Calibration note:** the rule must require a duration VERB. Matching bare
   `EnviroCare … since 1958` flagged 93 places, ~60 of them page titles plus the live
   header tagline `EnviroCare · Since 1958` — approved brand shorthand, same shape as
   the sanctioned "Family-owned since 1958". The claim is the verb.
3. **Run `scripts/neuronwriter-cleanup.mjs`** — 119 queries, ~69 duplicates
   (11× "pest control birmingham al", 7× "termite control birmingham al", 6× several
   others). Pushes have to guess "newest per keyword", which is fragile.

## Known limitation when pushing to NW

Reading a content score **requires a write** — `import-content` is the only call that
returns `content_score`; `list-queries` exposes no score field. So there is no way to
check what an editor holds before overwriting it. The narrator's own
`PROTECT_AT = 70` guard refuses to overwrite content scoring ≥70, but pushing via MCP
bypasses that guard. Prefer running the narrator where practical.
