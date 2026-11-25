# EnviroCare — Claude's ranking audit and 30-day plan (Nov 23, 2026)

A second opinion on PR #322's plan. Every number below names the call and date that produced it. All calls were made on Nov 23, 2026 unless another date is given.

## What the data says

**1. Maps: EnviroCare loses every head term in the two weak markets. A page can't fix that alone.**
Source: `lf_visibility`, latest Google rows per campaign (Supabase).
- **Huntsville is at 0% SoLV on all nine core terms.** That covers pest control, exterminator, termite control, termite inspection and termite treatment (all "Huntsville"), mosquito control, rodent control, "pest control madison al" and "who is the best exterminator in huntsville".
  - Prime Pest Control leads most of them.
  - A Plus Pest Control scores 97.96 on "pest control madison al".
  - EnviroCare's best Huntsville results are "commercial pest control huntsville" (10.2%) and "pest control service" (8.16%).
- **Birmingham is at 0% on the head terms:** pest control, exterminator, termite control and mosquito control "birmingham al". Cook's, Alabama Pest Control and Red Mountain lead.
  - Birmingham is already competitive in Over the Mountain: "pest control vestavia hills" 35.8% and "pest control mountain brook" 28.4%.
  - **The Birmingham profile can win where it is close and the competition is thinner.** It is not invisible.
- **AGENTS.md rule zero (Jul 25 test):**
  - "City pages are too thin" was disproven: `/huntsville` is about 3,000 words.
  - "Huntsville's problem is review volume" was disproven: competitors with 15–37 reviews outrank it.
  - What has never been tested is **off-site authority**. Ahrefs on 10-17 measured Domain Rating 0.8 and **zero editorial links**.
  - Rewriting `/huntsville` (PR #322's Priority 1) is worth doing for conversion and AI answers. It should not be expected to move Maps on its own.

**2. Organic: the cheap wins are pages already near page 1, not Huntsville head terms at position 44.**
Source: `gsc_queries` / `gsc_pages`, snapshot 11-19.

| Query or page | Position | Impressions | Clicks | Why it's cheap |
|---|---:|---:|---:|---|
| "termite bonds" | **8.9** | 273 | 0 | Bottom of page 1 with no clicks, so the snippet isn't earning them |
| `/blog/termite-bond-alabama-explained` | **9.2** | 837 | 4 | Same intent |
| "exterminator madison" | **9.5** | 28 | 0 | Already page 1 |
| "mosquito control madison" | 12.7 | 16 | 0 | Top of page 2 |
| `/madison-exterminator` | 12.9 | 52 | 0 | Top of page 2 |
| "pest control madison" | 15.2 | 17 | 0 | |
| `/birmingham` | 23.9 | **798** | 3 | Biggest impression pool among the city pages |
| `/huntsville` | 38.5 | 627 | **0** | Far off; Maps decides this market |
| "huntsville pest control" | 44.3 | 17 | 0 | |

**North Alabama's fastest organic route is Madison, not Huntsville.** The Madison pages already sit at positions 9–15.

**3. Leads match the rankings.**
Source: `leads` table, web leads, last 30 days. Alabaster 13 · Birmingham 5 · **Huntsville 1**.

**4. The profiles themselves still have defects that work against trust.**
Source: BrightLocal `get_location`, Nov 22.
- **Google shows the Huntsville and Alabaster profiles as "EnviroCare" and Alex City as "Envirocare".** The listing name everywhere else is "EnviroCare Pest Services". A name change needs your approval, because it can trigger re-verification.
- **Huntsville's Bing and Apple Maps syncs are "pending"** and have never confirmed.
- **The founding date shows "1958" on the Alex City and Huntsville profiles.** The LLC dates from 1993/2005; 1958 is the family.
- **Every $1M line in the listing copy is missing "approval".**
- **Alex City's Facebook link is wrong:** `facebook.com/3Dandstlprobables`.
- **Birmingham's Yelp listing shows "closed every day".** The alert has been pending 89 days.
- **Two site patches are still unlanded:**
  - 0026: the homepage title doesn't say what the business is.
  - 0028: 146 "no drilling" absolutes across 50 files contradict a Nov 15 ruling.

**5. Measurement is broken, so gains can't be proven yet.**
- **The BrightLocal agent can't fetch Birmingham at all.** Its office list stops at three.
- **Two of the three Monday report agents escalate every week,** and the third (review-responder) failed today on a missing setting.
- Total Search Console clicks across the four most recent 7-day snapshots went 95 → 88 → 80 → 72 (11-16 → 11-19). That's a short window; watch it rather than act on it.

## The plan, in priority order

| # | Action | Why | Owner | Days |
|---|---|---|---|---|
| 1 | **Land patches 0030–0033 and set `NOTION_TOKEN`** | No measurement means no proof any change worked | Phillip (Desktop push / Vercel env) | 1 |
| 2 | **Termite-bond snippet:** rewrite the title and meta of `/blog/termite-bond-alabama-explained` and `/services/termite-control` around "termite bond in Alabama: what it covers, cost, transfer" (no price; termite is priced at inspection) | Position about 9 with 1,100+ impressions and under 1% CTR. The fastest click gain available | Claude (patch) | 2 |
| 3 | **Madison push:** strengthen `/madison-exterminator`, `/madison-pest-control` and `/madison-mosquito-control`, and link them from `/huntsville`. Use the corrected PR #322 drafts for `/huntsville` and `/huntsville-termite-control` | Positions 9–15 already; Huntsville head terms are at 38–44 | Claude (drafts) → Phillip (approve) | 3–10 |
| 4 | **Profile hygiene, all four offices:** fix the $1M copy, the Alex City Facebook URL, the founding dates and the Birmingham Yelp hours; get Huntsville's Bing/Apple to sync; decide whether Google names should read "EnviroCare Pest Services" | Consistent records are the one ranking factor you fully control | **Phillip** (BrightLocal is read-only for Claude) | 3–7 |
| 5 | **Link Birmingham's profile in Local Falcon** (OAuth) so its services and posts can be audited the way the other three are | Birmingham is the only profile Claude can't read live | **Phillip** | 1 |
| 6 | **Get real local mentions (off-site authority).** Huntsville/Madison Chamber; Shelby County Chamber and the Birmingham Business Alliance; Alabama pest-control association member listing; the Sentricon specialist-locator listing (confirm it shows all four offices); pages from the builders you already supply with Sentricon; one local news or neighborhood-association feature per market. **Never buy links or reviews** | Domain Rating 0.8 with zero editorial links is the constraint every analysis since July has landed on | Phillip (relationships) / Claude (outreach drafts) | 7–30 |
| 7 | **Reviews, Huntsville first:** a neutral review request after every completed Huntsville job (no scripts, no incentives) | 40 reviews against about 300 in Alabaster. Not the whole answer (see rule zero), but it compounds | Office | ongoing |
| 8 | **Land 0026 and 0028** | Clearer homepage title, and stop contradicting your own termite ruling on 50 pages | Phillip (push) | 2 |
| 9 | **Spend no Local Falcon credits on new ad-hoc grids.** Re-read the 11-27 biweekly run and compare only like-for-like grids | Avoids paying for numbers that can't be compared | — | — |

## Targets (judged on the same grids, plus leads)

| Measure | Now | 30 days | 90 days |
|---|---|---|---|
| "termite bonds" position / CTR | 8.9 / 0% | ≤ 6 / ≥ 2% | top 3 |
| Madison queries (exterminator / pest / mosquito) | 9.5 / 15.2 / 12.7 | all on page 1 | top 5 |
| `/birmingham` average position | 23.9 | ≤ 18 | ≤ 12 |
| Birmingham Maps SoLV (`4ee47a23`) | 6.58% | hold | 10%+ |
| Huntsville Maps SoLV (`a58db30`) | 2.31% | hold | 5%+ (needs #4, #6, #7) |
| Huntsville web leads per 30 days | 1 | 3 | 6+ |
| Monday agent reports passing their quality check | 1 of 3 | 3 of 3 | 3 of 3 |

## How this differs from PR #322
- **It agrees on:** no termite category exists (re-verified via `searchLocalFalconGbpCategories`), Birmingham's profile isn't linked in Local Falcon, improve existing pages rather than add more, and no fake reviews or links.
- **It disagrees on where the gains come from.** Huntsville Maps is an authority and profile problem; a page rewrite won't move it alone (AGENTS.md rule zero). The fastest gains are pages already near page 1: termite bonds, Madison, `/birmingham`.
- **It adds:** the measurement fixes, profile name and founding-date consistency, and the two unlanded site patches.
- **Corrected PR #322 drafts are in this branch** (commit `a2f911b`): $1M wording, origin claim removed, links, price wording.

## Not checked
- Live Google profile contents (only BrightLocal's stored copy).
- Citation Tracker results.
- Competitors' review counts.
- Google Ads/LSA.
- Live site HTML. The Search Console figures are Supabase snapshots dated 11-19.
