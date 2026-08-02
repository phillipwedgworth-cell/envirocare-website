# Local Falcon measurement baseline

Last verified against the live API: **2026-07-23**

Any agent, digest, or report that touches SoLV must read this first.

## The live campaigns (v3)

| Market | Campaign key | Grid | Radius | Status | Last run |
|---|---|---|---|---|---|
| Huntsville | `a58db3090ac9ab0` | 9x9 | 20 mi | scheduled | 2026-07-17 |
| Birmingham/Alabaster | `4ee47a23fc4793e` | 9x9 | 20 mi | scheduled | 2026-07-17 |
| Lake Martin/Alex City | `a99dae3fd51a462` | 9x9 | 20 mi | scheduled | 2026-07-17 |

Read with `GET https://api.localfalcon.com/v1/campaigns/{key}/report?api_key=...`
→ `data.run_data.{ run, by_keyword[] }`, `by_keyword[] = { keyword, arp, atrp, solv }`.
Costs **0 scan credits** — it reads a run that already happened.

## Two rules

**1. Never store a scan `report_key`.** Local Falcon mints a new one per scan and
retires the old one. Three keys recorded in the handoff docs (`cd64365e1dab32f`,
`7febc8908039d6d`, `644c1bcec9e3b67`) now return *"report not found"*. Store the
campaign key instead — it is stable across runs.

**2. Never compare across a grid change.** SoLV is the share of grid points where
the business appears in the local pack. Widen the grid and the denominator grows
with points the business was never going to win, so SoLV falls without any change
in rank.

| Market | v2 (5x5 @ 15mi, 6/30) | v3 (9x9 @ 20mi, 7/17) | Real change |
|---|---|---|---|
| Birmingham | 53.86% | 2.71% | none — geometry |
| Lake Martin | 47.50% | 44.49% | roughly flat |
| Huntsville | 0.67% | 0.20% | consistently weak, and real |

ARP tells the same story: Birmingham's average rank went 5.86 → 12.10 because the
outer ring of a 20-mile grid is full of points where a single Alabaster office
places poorly or not at all.

Code marks the epoch as `BASELINE = "v3-9x9-20mi"`. Stored week-over-week state
carrying a different baseline is discarded rather than reported as a move. Bump
the string on any future geometry change.

## Retired — do not read

`1822923e68f74d1` (Huntsville v2) · `b6d42c9c19856f2` (Birmingham v2) ·
`7d2a6df072df6f8` (Lake Martin v2). All paused since 2026-06-30.

## Targets

Re-baselined for the v3 grid. The old targets were set against v2 geometry and are
unreachable on a 20-mile grid from a single office, which is what made every market
read as catastrophically below target.

| Market | v3 target | old v2 target |
|---|---|---|
| Alabaster | 20% | 65% |
| Alex City | 40% | 50% |
| Huntsville | 10% | 35% |

Huntsville at 0.20% is genuinely bad and is a review-volume problem, not a grid
artifact. It read the same way on v2.

## Known failure mode this fixed

Two agents both wrote under the name `seo-monitor`:

- `seo-snapshot.mjs` used the correct campaign endpoint but pointed at the **v2**
  keys, which were paused — it re-reported frozen 6/30 numbers for 23 days.
- `seo-monitor.mjs` polled `/v1/reports`, the **scan** list. Campaign scans do not
  appear there, so it saw almost nothing and emitted dead-zone criticals for every
  market while the campaigns were healthy.

The 2026-07-22 digest's "every tracked keyword at 0% SoLV, EnviroCare is invisible"
came entirely from that second bug. It was never true.
