# Local Falcon measurement baseline
# Updated: 2026-09-05 — Birmingham 16th Ave campaign added.

Any agent, digest, or report that touches SoLV or SAIV must read this first.

## The live campaigns (v3)

| Market | Campaign key | Grid | Radius | Status | Notes |
|---|---|---|---|---|---|
| Huntsville | `a58db3090ac9ab0` | 9x9 | 20 mi | scheduled | biweekly |
| Birmingham / Alabaster (Butler Rd) | `4ee47a23fc4793e` | 9x9 | 20 mi | scheduled | biweekly |
| Lake Martin / Alex City | `a99dae3fd51a462` | 9x9 | 20 mi | scheduled | biweekly |
| Birmingham (16th Ave, Jefferson Co.) | `e9348fff16b95fa` | 9x9 | 20 mi | scheduled | biweekly, created Sep 5 2026, first run Sep 9 |

Read with `GET https://api.localfalcon.com/v1/campaigns/{key}/report?api_key=...`
→ `data.run_data.{ run, by_keyword[] }`, `by_keyword[] = { keyword, arp, atrp, solv }`.
Costs **0 scan credits** — it reads a run that already happened.

## Two rules

**1. Never store a scan `report_key`.** They retire after each scan. Store the
campaign key — it is stable across runs.

**2. Never compare across a grid change.** SoLV is the share of grid points where
the business appears. Widen the grid and SoLV falls without any real change.

Code marks the epoch as `BASELINE = "v3-9x9-20mi"`. Rows with a different baseline
are discarded rather than compared. Bump on any future geometry change.

## Retired — do not read

`1822923e68f74d1` (Huntsville v2) · `b6d42c9c19856f2` (Birmingham v2) ·
`7d2a6df072df6f8` (Lake Martin v2). All paused since 2026-06-30.

## Targets (v3 grid — 9x9 / 20 mi)

| Market | Target | Current |
|---|---|---|
| Alabaster (Butler Rd) | 20% | 3.39% (Aug 27) |
| Birmingham (16th Ave) | 15% | first scan Sep 9 |
| Alex City | 55% | 53.06% (Sep 5) |
| Huntsville | 10% | 0.26% (Aug 25) |
