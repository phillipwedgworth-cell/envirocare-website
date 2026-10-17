# SpyFu → NeuronWriter intelligence pack | 2026-10-17 | REVIEW ONLY

**Source ranking data:** saved SpyFu October 5 full workbook (not fresh account login); saved SpyFu October 11 dashboard handoff; Supabase GSC snapshot Oct 13 and Local Falcon Oct 16; GitHub current main. No direct SpyFu or NeuronWriter authenticated API was used in this session. **Scores below are not new NeuronWriter scores.**

## Do not confuse vendor populations
SpyFu saved project EnviroCare SEO + PPC (My Sites ID 42322; project 380f4fb2-b704-4468-864c-5f257e71552d) was observed Oct 11 at **968** organic keywords, **330** estimated clicks, domain strength **41**, and **324 selected tracked keyword rows** (15 overlapping groups; collecting). October 5 workbook reported **990** domain keywords and 321 estimated clicks for the September reference period. Both are vendor estimates, not GSC clicks. Oct 5 exact ranking export has multiple ranking URLs per term; the 11-row database table retains only each term's best rank. 43 new exact tracked-term candidates were prepared Oct 11 but **NOT IMPORTED** (requires deduplication against all 324).

## What I would optimize FIRST (Google ranks are Oct 5 SpyFu; GSC page figures are Oct 13 snapshot)
| Keyword / intent | SpyFu rank / volume | Ranking URL problem | Existing target | Action |
|---|---|---|---|---|
| pest control birmingham al | #30 / 660 monthly | /services/pest-control #30, /birmingham #58, /best-pest-control-birmingham #78 | /birmingham | disambiguate generic service vs city hub; improve local authority and internal city links; no redirects until link inventory |
| pest control huntsville al | #29 / 1000 | /huntsville ranks but page had GSC 658 impressions, 0 clicks | /huntsville | optimize snippet+first screen+real evidence; stronger local/third-party citation evidence |
| mosquito control birmingham al | #11 / volume unavailable | /blog/mosquito-season-birmingham-al #11, /services/mosquito #45 | /birmingham-mosquito-control | link from blog to buyer-intent combo page; avoid duplicate content/canonical changes |
| exterminator birmingham al | #26 / 80 | /birmingham already ranking, generic /services/pest-control #57 | /birmingham | keep secondary 'exterminator' intent without keyword stuffing |
| pest control hoover al | #12 / 44 | /hoover ranks | /hoover | preserve; audit links and office attribution, no mass rewrite |
| pest control pelham al | #11 / 50 | /pelham ranks | /pelham | preserve title, add local-specific practical FAQ that answers purchase intent |
| pest control madison al | #28 / 44 | legacy /service-areas/madison listed in SpyFu | /madison | keep working redirect, verify canonical and links; do not create new page |
| pest control alabaster al | #3 / 12 | /alabaster rank 3 | /alabaster | protect existing winner; existing NW77 draft needs change review |
| pest control chelsea al | #1 / 80 | /chelsea rank 1 | /chelsea | protect; no rewrite |
| pest control alexander city | #1 / n/a | /alexander-city rank 1 | /alexander-city | protect |

The SpyFu workbook also reports **pest control athens al** as a potential gap, volume 250, with Cook's #8 and Wayne's #5 on the earlier competitor intersection, and the existing EnviroCare route /athens. This is directional only; test live GSC demand before investing.

## Keyword-to-URL target map for NeuronWriter research
1. Birmingham `/birmingham`: "pest control birmingham al" (primary existing head term); NeuronWriter October 11 already analyzed "exterminator birmingham al" (02ecf0ee8bed260c), "pest control for older homes in birmingham" (166eff50cf51a586), "how much does pest control cost in birmingham al" (2a835952f99dc211), "roach exterminator birmingham al" (6ba0afd5906f45e0), "fire ant treatment birmingham al" (213aadffa0f13619). **Consolidate to ONE city-page rewrite, not five pages.** Avoid unsourced "oldest company" superlatives.
2. Huntsville `/huntsville`: existing GSC demand for pest/exterminator; pair with separate existing termite landing `/huntsville-termite-control` and mosquito landing `/huntsville-mosquito-control`. Real Huntsville office (256) 937-7676, Old Madison Pike address.
3. Termite service `/services/termite-control`: NW queries "termite bond birmingham al" (b0b9daa0701d6dbd), "termite inspection birmingham al" (dcc8724112919bb6), "how much does a termite bond cost in alabama" (2de5ca802639d50c). Compare with `/birmingham-termite-control` and `/blog/termite-bond-alabama-explained` for intent overlap. No flat public termite price and no Sentricon-backed repair promise.
4. WDO letters `/services/wdo-letters`: "wdo inspection birmingham al" (200ec42b2f61f21d), "termite letter birmingham al" (70942702c14d4439), "who does termite letters for home sales in birmingham" (755a634fb80bca79). Verify actual fees, timing, license before adding.
5. Existing ant article `/blog/how-to-get-rid-of-ants-in-house-alabama`: GSC **3,768 impressions, 1 click, avg pos 13.7**. Improve snippet, answer-first opening, safety-limited homeowner advice and link to `/services/pest-control`; check other ant articles for duplicate intents.
6. Commercial `/services/commercial`: GSC **441 impressions, 0 clicks**, NW ledger Oct 13 proposed **59→70**. Review saved proposal instead of generating another. No unsupported data-center methods or HACCP guarantees.
7. Protect `/blog/is-sentricon-worth-it` (GSC **624 impressions, 10 clicks, avg pos 6.1**); improve contact path, not URL.

## Existing agent workflow (do not let automation publish)
The repo has `agents/neuronwriter-narrator.mjs`, `agents/content-refresh.mjs`, `agents/blog-from-drafts.mjs`, and `agents/neuronwriter-content/manifest.json`. The narrator's own comment says 9/24 Oct 12 score-ready drafts contained prohibited claims; **score-ready ≠ approved**. The October 11 workbook has 58 analysis query IDs, 56 active after 2 canceled service-inaccurate topics. Reuse these queries and run evaluate-content on final edited HTML in an authenticated NeuronWriter environment, 70–80 editorial guide only; run plagiarism/source/compliance checks. Never auto-publish, never append new 'PAGE' articles just to use monthly credits.

### Draft queue (current branch)
`agents/neuronwriter-content/review-2026-10-17/` contains editor-ready draft sections and instructions. **These are intentionally NOT listed in manifest.json**, because the current Narrator would automatically import hand-written manifest HTML on its Monday fill run. Claude should check the existing NeuronWriter editor first, compare facts and scores, and explicitly import approved sections. The site itself changes only in the separate reviewed source edits.

### Critical source/claim restrictions
Keep brand **EnviroCare Pest Services**, legal **EnviroCare, LLC**. Alabama Wedgworth family pest-control history began Alexander City 1958, **not** Birmingham office since 1958. Birmingham office 2120 16th Ave S, Ste 302 (205) 991-2882; Huntsville 7027 Old Madison Pike, Ste 108 (256) 937-7676. Alabaster 2025 Butler Rd (205) 940-6360. Personal/commonly shared 940-6360 is primary company-wide phone, not substitute for city-office NAP. Pricing/seasonality are conflicted across older handoffs: always check `data/pricing.ts` and operational signoff before making price promises. Monthly payments entail a 12-month ACH agreement. Exterior-focused recurring pest work, interior upon request. Termite coverage, if mentioned, must be qualified as **up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection, approval, and the terms of the agreement**, never a guarantee or manufacturer's coverage. Do not assert wildlife, rodent-only or general bee/wasp removal. No fabricated reviews, local customers, photos, certifications or citations.

## Acceptance gates for Claude
Verify live URLs and actual metadata before editing; use targeted pages and real source evidence. Run `npm test`, `npm run test:source`, `npm run test:generated`, `npm run test:similarity`, `npm run test:page-refresh`, `npm run build`. Record exact changed routes, NW score before/after **if the editor ran**, originality checks, approved pricing, and post-deploy GSC tracking. Existing PR #264 has NAP guard changes; don't overwrite it. No production merge/deployment pending Phillip approval.

*Files/data: October 11 saved workbook `EnviroCare_SpyFu_NeuronWriter_Final_2026-10-11.xlsx`; saved SpyFu 43 import manifest; Supabase project dyoujmyleihcpqgeifre; existing Drive SEO MASTER and NeuronWriter handoff.*
