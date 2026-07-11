# AI Visibility Action Plan — July 2026

Built from the NeuronWriter AI Visibility dashboard snapshot (2026-07-11) and the
post-rebuild site structure. Goal per the review: **increase domain CITATIONS to
envirocarellc.com in AI answers**, not just brand mentions.

## Baseline (2026-07-11 snapshot)

| Metric            | Value | Read |
|-------------------|-------|------|
| Share of Voice    | 35%   | Good starting point |
| Google Top 10     | 20%   | Weakest traditional signal — the rebuild targets this |
| Brand in Answers  | 40%   | AI models know the brand |
| Domain Cited      | 30%   | **The money metric — every action below serves this** |
| Opportunities     | 20    | Export these prompts monthly (see cadence) |

The 10-point gap between Brand-in-Answers (40%) and Domain-Cited (30%) means AI
engines mention EnviroCare without sourcing envirocarellc.com. Fixes below are
ordered by expected citation impact.

## Why AI engines cite a domain (what we optimize for)

1. The page directly answers the exact prompt in the first ~2 sentences under a
   matching heading (answer-block format).
2. The page ranks in traditional Google top 10 (AI Overviews and Perplexity
   pull heavily from it — our 20% Top-10 rate caps our citation rate).
3. Machine-readable trust: FAQPage/Service/LocalBusiness schema, consistent NAP,
   third-party corroboration (GBP, BrightLocal citations, reviews).
4. The content is specific enough that a generic national page can't beat it
   (street-level local detail is our moat vs Terminix/Orkin/Cook's).

## DONE in the July rebuild (already serving this plan)

- 39-city page structure with per-city FAQPage schema (exact-prompt Q&As like
  "How much does pest control cost in Hoover?")
- 6 cluster pages (Over the Mountain, South/East/North Birmingham, North
  Alabama, Lake Martin & East Alabama) with Service + FAQPage + Breadcrumb schema
- Honest NAP: LocalBusiness schema only for the 3 real offices; areaServed
  everywhere else — no fake locations
- Duplicate /service-areas/* pages retired with 301s (split signals consolidated)
- Contract wording harmonized (trust/consistency signal)
- Blog (29 posts) now linked from sitewide header + footer nav (was orphaned —
  sitemap-only, zero internal links)

## Punch list — next 30 days

### A. Answer-block pass on the 14 target cities (highest citation ROI)
Cities: Birmingham, Hoover, Vestavia Hills, Mountain Brook, Homewood, Trussville,
Alabaster, Huntsville, Madison, Athens, Lake Martin, Alexander City, Auburn, Opelika.

For each city page, verify the first screen answers the prompt "best/who does
pest control in {city}" in 2–3 plain sentences naming the city, the office it's
served from, and the concrete offer (price anchors where approved). The CityPage
template already leads with intro copy — audit per city via NeuronWriter scores
(55 pages pending optimization; weekly QA batch resumes now that the quota
renewal-date fix is in).

### B. Comparison content vs national brands (AI loves comparisons)
- One page: "EnviroCare vs the national pest control chains in Alabama" —
  family-owned since 1958, same-technician routes, published pricing, unlimited
  re-service, local offices vs call centers. Factual, no disparagement.
- Huntsville angle: Cook's Pest Control is the incumbent — the huntsville city
  page already references this; extend with a short factual comparison FAQ.

### C. Third-party citation floor (AI engines corroborate before citing)
- GBP: submit the 20-service-area lists per office profile (Phillip, manual).
- BrightLocal Citation Builder: ensure the top directories carry the exact NAP
  of the 3 offices (agents/brightlocal integration already live).
- Reviews: review-responder resumes Monday; respond-rate and recency are
  AI-trust signals.

### D. Monthly AI-visibility cadence (once Advanced AI Monitoring is active — $20/mo, approved by the <$50 rule)
1. On the 15th of each month, export the Opportunities list (the 20 prompts).
2. For each weak prompt record: competitor mentioned, domain cited instead of
   ours, and whether we have an existing page.
3. Route each prompt to one of: improve existing page answer block / add FAQ /
   new comparison section / schema fix / third-party citation gap.
4. Feed page-level work into neuronwriter-targets.json so the weekly optimize
   agent picks it up inside quota (renews the 10th; ~16 analyses per batch,
   55 pages in the backlog → ~4 batches/month sustainable).

### E. Guardrails (unchanged)
- No fake offices, no fake NAP/location schema. Three real offices only.
- Approved pricing lines verbatim; the 12-month ACH billing agreement wording
  is canonical (July 11 harmonization).
- Service-area language everywhere outside the 3 office pages.

## Measurement

Re-check the five dashboard metrics on the 15th of each month. Success in 90
days = Domain Cited ≥ Brand in Answers (close the 10-pt gap), Google Top 10
≥ 35% on tracked prompts. If after 2–3 months the module isn't producing
actionable prompt-level gaps, cancel the add-on per the decision rule.
