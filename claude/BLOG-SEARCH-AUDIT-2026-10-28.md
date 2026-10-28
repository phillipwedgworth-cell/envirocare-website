# Blog content and AI-search audit — October 28, 2026

Review scope: all 65 blog records on main `b82e6fe5710ce0f00d48a2d939a6bec7baa46024`, plus the 71 records in cumulative draft PR #287. The draft contains 30 targeted refreshes and six data-center guides. It is not a release of 36 new URLs.

## Findings and disposition

| Priority | Finding | Action in review |
|---|---|---|
| High | The main-branch termite price ranges identified by the earlier audit | Already fixed by #284 on main; preserve that correction. |
| High | Eight posts expose the internal Mosquito + Tick amount | Replace with inspection-based quotes. Includes the lake-house guide and Birmingham/Huntsville guides missed by the original five-post list. |
| High | Two WDO articles publish an amount absent from the pricing canon | Remove the unverified amount; distinguish the free termite assessment from the paid real-estate report. Confirm scope/fee before booking. |
| High | Agent brand knowledge contradicts current pricing, agreement and staffing rules | Replace the stale price table with source-file instructions; remove unsupported promises and exclusivity. |
| High | Automated rewrite can replace an existing article with another topic | PR #287 incorporates #285's protections. Do not merge #283's Sylacauga rewrite into the emergency URL. |
| Medium | Preparation article is short and has no contextual internal links | Add practical follow-up questions and three relevant service/guide links. Preserve product-specific directions already corrected in this branch. |
| Medium | Sugar-ant article is short and includes an unsourced 60% result, universal timing and diagnosis from return speed | Rewrite with identification, sanitation, entry points and label-based advice; cite UC IPM and add contextual links. Preserve URL/author/publication date and record updatedAt. |
| Medium | Potential termite-swarm and cockroach overlap | Review query-to-page performance before choosing mergers; do not redirect URLs solely because topics overlap. |
| Medium | Long titles and descriptions | Preserve titles with existing search impressions unless factual corrections are required. Length is a review heuristic, not proof of truncation or ranking harm. Review unresolved descriptions individually. |
| Medium | Article artwork was undercounted | Six dedicated hero objects do not mean only six illustrated posts. The editorial map supplies other covers; six facility guides now share a relevant illustrated facility cover. |
| Medium | Public content sources versus external authority | A link to EPA supports a limited factual point; it does not create an independent mention of EnviroCare or prove all retained claims. |

## Existing-blog suggestions

1. Protect ranking URLs and the Sentricon content already performing. Review first-party search query/page pairings before changing titles or consolidating.
2. Distinguish cockroach identification, household removal and German-cockroach infestation intent. If actual query overlap warrants a merger, carry useful unique sections into the selected winner and implement a reviewed permanent redirect.
3. The 2026 termite-season article still needs an evidence review: asserted office call patterns, local annual activity changes, consumption arithmetic and builder-protection expiry statements need sources or removal. Its missing contextual internal links are an editorial gap. Do not present it as a verified current-year field report without supporting records.
4. Add concise answers and useful headings where they help readers. A question mark is not an AI-search requirement; avoid mechanically attaching FAQs to every post.
5. Use family history where relevant. Repeating 1958/four generations in every article is not an SEO requirement. Never turn family history into an incorrect legal-entity founding claim.
6. Add original evidence that operations can approve: an anonymized real inspection checklist, a sample service report with sensitive site details removed, and documented procedures. Do not invent clients, credentials, response commitments or outcome statistics.
7. Separate article usefulness from lead quality. Facility guides should lead to a site walkthrough and the existing data-center service page rather than compete with it for broad service intent.

## AI-search capabilities review

| Capability | Observed status | Practical meaning |
|---|---|---|
| Crawl access | Source explicitly permits named AI crawlers while restricting operational routes | Crawl eligibility; not proof of crawler visits or citation. |
| Indexing controls | Published-date gate and production canonicals exist | Check rendered HTML and sitemap for each approved article. |
| Article markup | BlogPosting/Breadcrumb nodes; PR #287 distinguishes Organization from Person bylines | Keep markup consistent with visible authors, images and dates. |
| Visible content | Six facility guides have direct openings, questions, checklists, contextual links and scoped sources | Review usefulness and accuracy rather than assigning an invented AI-readiness score. |
| AI text files | Existing llms.txt endpoint | Supplemental discovery information; not an AI ranking requirement or substitute for indexable pages. |
| Visibility measurement | Existing Local Falcon reports were consulted; no new scans were run | Keep AI SAIV separate from Maps SoLV, preserve platform/keyword/date/grid, and treat missing coverage as unknown. |
| SpyFu research | Public domain/keyword views were consulted; detailed authenticated exports remain unavailable | The exact data-center phrase showed under 20 monthly searches and no ranking history in that view. This is directional vendor data, not proof of no demand. |
| NeuronWriter evaluation | Actual scores are still pending | Evaluate exact reviewed/rendered HTML using existing matching query IDs; FILL may generate different copy. |
| Originality | Competitor-text checks pending | Structural gates and references do not establish originality. |
| Attribution/conversions | Existing tracking requires a separate read of measured traffic/leads | Citation growth should be assessed alongside qualified calls and facility walkthrough requests. |

Google's primary guidance: https://developers.google.com/search/docs/appearance/ai-features . Ordinary SEO fundamentals apply to AI features; no special AI schema or text-file treatment establishes inclusion.

## Data-center editorial priorities

The six guides cover IPM planning, rodent entry points, vendor questions, construction handover, service reports and activity response. Keep those intents distinct and conversion links on `/data-center-pest-control`. The exact phrase's low reported volume makes these specialist buyer resources, not a substantiated large traffic forecast.

Before release, operations should verify access/escort assumptions, approved methods, engineering repair responsibilities, reporting and escalation procedures. Sources establish general IPM principles rather than a data-center certification standard.

## Validation and limitations

The earlier cumulative review head built and passed its GitHub guards; its Vercel preview returned HTTP 200 with production canonicals, facility artwork and a preview noindex header. This follow-up changes content and agent knowledge, so its own commit checks and preview must be read separately.

Source review covers all records. It is not a live crawl of every production URL, an indexing inspection, a fresh AI scan, an authenticated SpyFu export, a NeuronWriter score or a complete factual validation of every retained sentence. Standalone TypeScript diagnostics exist in the baseline; a successful configured build must not be described as a type-clean repository.

Private account measurements are kept outside this public review branch. No production promotion, merge, new scan, publication schedule change or automated editor FILL is authorized by this audit.
