# SpyFu → NeuronWriter intelligence pack | updated 2026-10-18 | REVIEW ONLY

**Source ranking data for the original October 17 pack:** saved SpyFu October 5 full workbook (not a fresh account login); saved SpyFu October 11 dashboard handoff; Supabase GSC snapshot Oct 13 and Local Falcon Oct 16; GitHub main at preparation. **October 18 correction:** the live GitHub discussion for [merged PR #269](https://github.com/phillipwedgworth-cell/envirocare-website/pull/269) contains Claude's later NeuronWriter measurements and changes the draft recommendations. No fresh SpyFu or NeuronWriter account read was made for this correction. Historical account and ranking figures below retain their original dates.

## Completed NeuronWriter check — supersedes the original rewrite recommendations

Source: [Claude's October 17, 18:17 UTC scoring comment](https://github.com/phillipwedgworth-cell/envirocare-website/pull/269#issuecomment-6238433330), read from GitHub October 18. Claude ran `evaluate-content` on rendered HTML from the PR's production build, with and without each draft. The check did not save the drafts into NeuronWriter editors. These are **October 17 build measurements**, not new scores of today's production pages.

| Existing page | Query ID and keyword | Rendered page | Page + draft | Disposition |
|---|---|---:|---:|---|
| `/birmingham` | `96c200a1ac6b9d72` — pest control birmingham al | 80 | 80 | Do not append; the draft repeats an existing cost FAQ |
| `/huntsville` | `c42659f7ac3e2ac5` — pest control huntsville al | 75 | 76 | Do not append for this small score change |
| `/services/termite-control` | `b0b9daa0701d6dbd` — termite bond birmingham al | 36 | 41 | Wrong target for the city-specific draft; review useful sections against the existing bond article or Birmingham termite page |
| `/birmingham-mosquito-control` | `1d35d2e70d77981f` — mosquito control birmingham al | 59 | 60 | Do not append merely to add one point |

The same comment reports URL-import scores of **21 / 21 / 8 / 17**, versus **80 / 75 / 36 / 59** for rendered HTML. For further comparisons, score the rendered HTML against the same query before and after the proposed edit; do not use those low URL-import scores as evidence that the pages need wholesale rewrites.

PR #267 separated statewide termite-service intent from `/birmingham-termite-control`. Do not undo that by appending the Birmingham termite-bond draft to `/services/termite-control`. If the draft answers a real remaining question, compare it with `/blog/termite-bond-alabama-explained` and `/birmingham-termite-control`, then score a specific revision on its intended page. The five-point result above does not establish the gain on either alternative page.

**Query duplication, measured October 17 by Claude:** project `9d0bec3a70f4743c` contained **260 ready queries for 185 distinct keywords**, leaving **75 duplicate query rows**. Examples were Birmingham pest ×11 and Birmingham termite ×7. This is an inventory count, not evidence that all 75 were created in one billing cycle or that deletion would refund quota. Reuse existing IDs; do not rerun keyword analysis merely because an older handoff says a draft is missing.

## Do not confuse vendor populations
SpyFu saved project EnviroCare SEO + PPC (My Sites ID 42322; project 380f4fb2-b704-4468-864c-5f257e71552d) was observed Oct 11 at **968** organic keywords, **330** estimated clicks, domain strength **41**, and **324 selected tracked keyword rows** (15 overlapping groups; collecting). October 5 workbook reported **990** domain keywords and 321 estimated clicks for the September reference period. Both are vendor estimates, not GSC clicks. Oct 5 exact ranking export has multiple ranking URLs per term; the saved 11-row database snapshot retained only each term's best rank. The 43 new exact tracked-term candidates were **not imported as of the October 11 handoff**. Their current import status is unverified; compare a current full tracking export before importing any candidates.

## Historical research leads (ranks are Oct 5 SpyFu; GSC page figures are Oct 13 snapshot)

Confirm the actual ranking page in GSC before acting on vendor URL attribution. The October 17 cross-check in `agents/knowledge/ahrefs-baseline.md` found several vendor-attributed URLs wrong. The completed scoring review above supersedes any suggestion here to append the four saved drafts.

| Keyword / intent | SpyFu rank / volume | Vendor-attributed URLs | Existing target | Action |
|---|---|---|---|---|
| pest control birmingham al | #30 / 660 monthly | /services/pest-control #30, /birmingham #58, /best-pest-control-birmingham #78 | /birmingham | confirm query/page pairs in GSC; retain existing copy after the 80→80 draft result; assess local authority and city links |
| pest control huntsville al | #29 / 1000 | /huntsville ranks but page had GSC 658 impressions, 0 clicks | /huntsville | optimize snippet+first screen+real evidence; stronger local/third-party citation evidence |
| mosquito control birmingham al | #11 / volume unavailable | /blog/mosquito-season-birmingham-al #11, /services/mosquito #45 | /birmingham-mosquito-control | link from blog to buyer-intent combo page; avoid duplicate content/canonical changes |
| exterminator birmingham al | #26 / 80 | /birmingham already ranking, generic /services/pest-control #57 | /birmingham | keep secondary 'exterminator' intent without keyword stuffing |
| pest control hoover al | #12 / 44 | /hoover ranks | /hoover | preserve; audit links and office attribution, no mass rewrite |
| pest control pelham al | #11 / 50 | /pelham ranks | /pelham | preserve title, add local-specific practical FAQ that answers purchase intent |
| pest control madison al | #28 / 44 | legacy /service-areas/madison listed in SpyFu | /madison | verify GSC attribution before treating this as a URL problem; retain existing redirects and page |
| pest control alabaster al | #3 / 12 | /alabaster rank 3 | /alabaster | protect existing winner; existing NW77 draft needs change review |
| pest control chelsea al | #1 / 80 | /chelsea rank 1 | /chelsea | protect; no rewrite |
| pest control alexander city | #1 / n/a | /alexander-city rank 1 | /alexander-city | protect |

The SpyFu workbook also reports **pest control athens al** as a potential gap, volume 250, with Cook's #8 and Wayne's #5 on the earlier competitor intersection, and the existing EnviroCare route /athens. This is directional only; test live GSC demand before investing.

## Keyword-to-URL target map for NeuronWriter research
1. Birmingham `/birmingham`: "pest control birmingham al" (primary existing head term); NeuronWriter October 11 already analyzed "exterminator birmingham al" (02ecf0ee8bed260c), "pest control for older homes in birmingham" (166eff50cf51a586), "how much does pest control cost in birmingham al" (2a835952f99dc211), "roach exterminator birmingham al" (6ba0afd5906f45e0), "fire ant treatment birmingham al" (213aadffa0f13619). **Keep these intents on the existing city page; the October 17 check does not support the proposed rewrite.** Avoid unsourced "oldest company" superlatives.
2. Huntsville `/huntsville`: retain the existing page after the 75→76 draft result. Check its snippet, first screen, local evidence and contact path against current GSC demand; pair with separate existing termite landing `/huntsville-termite-control` and mosquito landing `/huntsville-mosquito-control`. Real Huntsville office (256) 937-7676, Old Madison Pike address.
3. Termite-bond research: reuse NW queries "termite bond birmingham al" (b0b9daa0701d6dbd), "termite inspection birmingham al" (dcc8724112919bb6), "how much does a termite bond cost in alabama" (2de5ca802639d50c). Compare useful questions with `/birmingham-termite-control` and `/blog/termite-bond-alabama-explained` before proposing a specific addition. Preserve statewide intent on `/services/termite-control`. No flat public termite price and no Sentricon-backed repair promise.
4. WDO letters `/services/wdo-letters`: "wdo inspection birmingham al" (200ec42b2f61f21d), "termite letter birmingham al" (70942702c14d4439), "who does termite letters for home sales in birmingham" (755a634fb80bca79). Verify actual fees, timing, license before adding.
5. Existing ant article `/blog/how-to-get-rid-of-ants-in-house-alabama`: GSC **3,768 impressions, 1 click, avg pos 13.7**. Improve snippet, answer-first opening, safety-limited homeowner advice and link to `/services/pest-control`; check other ant articles for duplicate intents.
6. Commercial `/services/commercial`: GSC **441 impressions, 0 clicks**, NW ledger Oct 13 proposed **59→70**. Review saved proposal instead of generating another. No unsupported data-center methods or HACCP guarantees.
7. Protect `/blog/is-sentricon-worth-it` (GSC **624 impressions, 10 clicks, avg pos 6.1**); improve contact path, not URL.

## Existing agent workflow (do not let automation publish)
The repo has `agents/neuronwriter-narrator.mjs`, `agents/content-refresh.mjs`, `agents/blog-from-drafts.mjs`, and `agents/neuronwriter-content/manifest.json`. The narrator's own comment says 9/24 Oct 12 score-ready drafts contained prohibited claims; **score-ready ≠ approved**. The October 11 workbook has 58 analysis query IDs, 56 active after 2 canceled service-inaccurate topics. Reuse these queries and run evaluate-content on final edited HTML in an authenticated NeuronWriter environment, 70–80 editorial guide only; run plagiarism/source/compliance checks. Never auto-publish, never append new 'PAGE' articles just to use monthly credits.

### Draft disposition after PR #269

`agents/neuronwriter-content/review-2026-10-17/` retains the four reviewed HTML drafts as reference material. **They are intentionally NOT listed in manifest.json**, because the Narrator imports manifest HTML into the matching editors. Claude already evaluated them on October 17; do not treat them as an unscored or ready-to-publish backlog. Follow the disposition table above. Any revised section needs a fresh comparison on its intended page and separate review before editor import or site publication.

The October 18 workflow change restricts push-triggered fills to the active HTML drafts, manifest and narrator-related code. Review directories and documentation-only changes are excluded. The existing Monday score/fill schedule and manual controls remain in place. **The workflow file itself remains an intentional fill trigger:** merging the October 18 workflow edit will still start a fill under that existing rule. A later change confined to this review document or its reference drafts will not.

### Critical source/claim restrictions
Brand in copy: **EnviroCare**; legal name **EnviroCare, LLC** (AGENTS.md; "EnviroCare Pest Services" is an open naming ruling, so the drafts use "EnviroCare" — corrected by Claude 2026-10-17). Alabama Wedgworth family pest-control history began Alexander City 1958, **not** Birmingham office since 1958. Birmingham office 2120 16th Ave S, Ste 302 (205) 991-2882; Huntsville 7027 Old Madison Pike, Ste 108 (256) 937-7676. Alabaster 2025 Butler Rd (205) 940-6360. Personal/commonly shared 940-6360 is primary company-wide phone, not substitute for city-office NAP. Pricing/seasonality are conflicted across older handoffs: always check `data/pricing.ts` and operational signoff before making price promises. Monthly payments entail a 12-month ACH agreement. Exterior-focused recurring pest work, interior upon request. Termite coverage, if mentioned, must be qualified as **up to $1,000,000 in EnviroCare damage repair coverage, subject to inspection, approval, and the terms of the agreement**, never a guarantee or manufacturer's coverage. Do not assert wildlife, rodent-only or general bee/wasp removal. No fabricated reviews, local customers, photos, certifications or citations.

## Acceptance gates for Claude
For a further content edit, verify live URLs and actual metadata; use targeted pages and real source evidence. Run `npm test`, `npm run test:source`, `npm run test:generated`, `npm run test:similarity`, `npm run test:page-refresh`, `npm run build`. Record exact changed routes, rendered-HTML NW score before/after **if a new evaluation ran**, originality checks, approved pricing, and post-deploy GSC tracking. Preserve the NAP guards introduced in PR #264. Further production publication requires Phillip's approval; PR #269 itself is already merged.

*Files/data: October 11 saved workbook `EnviroCare_SpyFu_NeuronWriter_Final_2026-10-11.xlsx`; saved SpyFu 43 import manifest; Supabase project dyoujmyleihcpqgeifre; existing Drive SEO MASTER and NeuronWriter handoff.*
