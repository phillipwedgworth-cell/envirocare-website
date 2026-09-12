# Local Falcon measurement baseline
# Updated: 2026-09-08 — grid/radius corrected to what the scans actually report.

Any agent, digest, or report that touches SoLV or SAIV must read this first.

## The live campaigns (v3)

⚠️ **The grids are NOT uniform.** This table said 9x9 / 20 mi for all four until
2026-09-08. Three of those four entries were wrong. The values below are what the
live scan metadata reports (`data.run_data.scans[].grid_size` / `.radius`,
read 2026-09-08); the previous values were assumed, never verified.

| Market | Campaign key | Grid | Radius | Status | Notes |
|---|---|---|---|---|---|
| Huntsville | `a58db3090ac9ab0` | **7x7** | **7 mi** | scheduled | biweekly. Doc claimed 9x9/20mi |
| Birmingham / Alabaster (Butler Rd) | `4ee47a23fc4793e` | 9x9 | 20 mi | scheduled | biweekly. The only one matching the stated epoch |
| Lake Martin / Alex City | `a99dae3fd51a462` | **7x7** | **10 mi** | scheduled | biweekly. Doc claimed 9x9/20mi |
| Birmingham (16th Ave, Jefferson Co.) | `e9348fff16b95fa` | 9x9 | 20 mi | scheduled | biweekly, created Sep 5 2026, first run Sep 9 — grid unverified until it runs |

**What this means for the numbers you already have.** Because rule 2 below is
real, the headline SoLV figures are NOT on a common scale and must not be ranked
against each other as if they were:

- Huntsville **0.26%** is measured on a 7-mile grid — near-total absence within
  7 miles of its own office. On the 20-mile grid the others use it would be
  lower, not higher. Treat 0.26% as the optimistic reading.
- Lake Martin **53.06%** is measured on a 7x7/10mi grid, which is easier than the
  9x9/20mi the 55% target assumes. It is further from target than it looks.
- Alabaster **3.39%** is the only figure directly comparable to the stated epoch.

**Open decision (not made here):** either reconfigure Huntsville and Lake Martin
to 9x9/20mi so the epoch becomes true — which costs scan credits and starts a new
comparison series, breaking continuity with every stored row — or restate the
epoch as per-campaign geometry and keep comparing each market only to itself.
Until that is decided, compare a market to its own history, never to another.

Read with `GET https://api.localfalcon.com/v1/campaigns/{key}/report?api_key=...`
→ `data.run_data.{ run, by_keyword[] }`, `by_keyword[] = { keyword, arp, atrp, solv }`.
Costs **0 scan credits** — it reads a run that already happened.

## Two rules

**1. Never store a scan `report_key`.** They retire after each scan. Store the
campaign key — it is stable across runs.

**2. Never compare across a grid change.** SoLV is the share of grid points where
the business appears. Widen the grid and SoLV falls without any real change.

Code stores a per-campaign baseline such as `9x9-20mi`, `7x7-10mi`, or
`7x7-7mi` on every row. Week-over-week state is discarded when that campaign's
baseline changes. The canonical keys, geometry, place IDs, and targets live in
`agents/lib/local-falcon-campaigns.mjs`.

## Retired — do not read

`1822923e68f74d1` (Huntsville v2) · `b6d42c9c19856f2` (Birmingham v2) ·
`7d2a6df072df6f8` (Lake Martin v2). All paused since 2026-06-30.

## Targets (per-market v3 baseline)

| Market | Target | Current |
|---|---|---|
| Alabaster (Butler Rd) | 20% | 3.39% (Aug 27) |
| Birmingham (16th Ave) | 15% | first scan Sep 9 |
| Alex City | 55% | 53.06% (Sep 5) |
| Huntsville | 10% | 0.26% (Aug 25) |
