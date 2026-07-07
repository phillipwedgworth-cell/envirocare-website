# Huntsville Competitor Brief — 2026-07-06

Source: Local Falcon grid scans (7/6/2026) + competitor report for
`pest control huntsville al` (5×5 grid). Read-only research; no spend.

## The gap in one line

EnviroCare has **best-in-class quality (5.0★) but almost no review volume (28)**,
and in Huntsville the local map is won on volume. Result: **0% share of local
voice, avg rank ~18** — effectively invisible organically.

## Who owns Huntsville (top of the grid)

| Competitor | SoLV | Reviews | Rating |
|---|---|---|---|
| Prime Pest Control | 52% | 3,174 | 4.9 |
| Waynes Pest Control | 28% | 2,662 | 4.7 |
| SafeSpray Pest Control | 28% | 584 | 5.0 |
| A Plus Pest Control | 28% | 550 | 5.0 |
| Dane's Pest Control | 24% | 487 | 5.0 |
| Atlus Pest Solutions | 24% | 1,646 | 4.9 |
| Cook's Pest Control | 24% | 823 | 4.8 |
| **EnviroCare** | **0%** | **28** | **5.0** |

National chains present but weak on the grid: Terminix, Orkin, Massey, Cook's.

## What the data says to do

1. **Paid search is the only fast way into Huntsville.** Organic rank there is
   gated by review volume you don't have yet, so the paused **Huntsville Metro**
   campaign (see `agents/ad-launch-plan.md`) is the right primary spend. In the
   paid auction you compete on equal footing regardless of review count.
2. **Reviews are the #1 organic investment.** The quality (5.0★) is already there;
   only volume is missing. A concerted push from **28 → 250+** would make the map
   winnable over 6–12 months. BrightLocal Reputation Manager already tracks the
   Huntsville profile — turn on automated review requests after every job.
3. **Differentiate on trust, not scale.** Against national chains, lead with
   "fourth-generation, family-owned Alabama since 1958" + the 5.0★ — that's the
   angle the drafted Huntsville ads already use.

## Browser-research "formula" (read-only only)

Your repo already drives Chrome for read-only research/screenshots via
`playwright-core` (see `agents/shots-380.mjs`, `agents/measure-380.mjs`):

```js
import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
await page.goto(url);
// ...read the DOM / screenshot ...
await browser.close();
```

That pattern is fine for gathering public research. It must **never** be pointed
at a logged-in Google Ads account to create or launch campaigns — that spends
real money on the billing account and is done manually by a human, by design.
