# Cited content batch and NeuronNarrator improvements — October 28, 2026

Review only. This branch builds on the three data-center guides in PR #286. It prepares **36 posts total: 30 targeted refreshes of existing URLs and six data-center guides**, of which three were already in #286. It does not create 36 new URLs or authorize a mass release.

## Content changes

The 30 refreshes preserve slugs, authors and original publication dates. They revise the opening answer, title, excerpt, metadata, first question heading and a narrowly supported inline citation. `updatedAt` records the edit. Existing body sections remain and require an editorial fact-check; a new reference does not establish every retained claim. The six facility guides address planning, entry points, procurement, construction handover, reporting and activity response. Internal links keep broad conversion intent on `/data-center-pest-control`.

The exact 36-entry route/keyword/source map is `agents/knowledge/editorial-batch-36.json`. Its score and competitor-originality fields deliberately remain null/false. Source limits and retrieval dates are in `agents/knowledge/editorial-sources.json`.

The follow-up review corrected retained initial-service promotion and monthly-payment disclosures, product-specific preparation/re-entry guidance, unsupported treatment timelines and Sentricon comparisons, and agreement-qualified termite repair wording. The six facility guides now have a clearly illustrated data-center image in their article, Open Graph/Twitter cards and schema. Their corporate byline is an Organization; named authors remain Person records. These targeted corrections do not constitute a source audit of every retained sentence.

## Agent changes

- NeuronNarrator chooses one editor for each normalized keyword, prioritizes planned keywords, prefers READY rows then newest update, and does not create queries.
- Existing editors at the protection score remain protected even when a manifest draft exists. An HTTP failure, malformed successful response, or unreadable score for a nonempty editor prevents replacement, including with FORCE. Only an explicit string content field can establish that an editor is empty.
- Every attempted import passes the shared compliance, source-allowlist and answer-structure gate, including hand drafts and FORCE. Compliance checks cover visible text and metadata, including encoded characters and inline markup. Unsupported named HTML references are rejected with an instruction to use literal text. This is a structural gate, not proof that the citation entails every claim.
- Source prompts state exactly what a reference supports and prohibit invented references or endorsements.
- Both `blog-from-drafts` and `blog-writer` retain approved external citations and apply the same gate after rewrites. The blog-writer prompt no longer calls a real-estate WDO report free.
- Candidate attempts default to three per narrator run; manual `max_writes` accepts 1–40. FORCE permits attempting protected editors within that limit and never bypasses quality checks. No cadence, billing or live settings changed.
- Summaries count imports, errors and deferred editors separately. An all-error run is recorded as error rather than ok.

The follow-up incorporates PR #285's topic-overwrite protections alongside these citation gates: generic pest/control terms cannot match an unrelated topic, the best specific match is preferred, a model-only duplicate cannot authorize an in-place upgrade, and the rewritten snippet must remain on the live title's topic. The offline regression includes the Sylacauga-to-emergency failure from #283. Do not merge the off-topic #283 rewrite.

### Exact-copy scoring remains separate

The 36-entry review map supplies keyword priority; it is not the hand-draft import manifest. None of these 36 keywords currently maps to `agents/neuronwriter-content/manifest.json`, so FILL can generate a new draft for a matching existing query instead of evaluating this review copy. The six legacy hand drafts in that manifest do not yet satisfy the new opening/citation gate and will be held. To score this batch, evaluate the exact reviewed/rendered HTML against an existing matching query and record its ID and before/after scores. Do not treat a FILL run as proof that this batch was scored or add review-only drafts to automatic imports without review.

## AI/search approach

Use clear answers, first-party evidence, relevant internal links, accurate structured data and indexing eligibility. Google says ordinary SEO fundamentals apply to AI Overviews and AI Mode; there is no special AI schema or AI text-file requirement: https://developers.google.com/search/docs/appearance/ai-features . These changes improve the content's usefulness and reviewability; they do not establish an AI ranking gain.

Keep public source citations separate from acquisition of third-party mentions. Linking to an EPA reference does not create an independent citation of EnviroCare. Verify actual local listings and professional evidence separately. Private account measurements and research remain outside this public branch.

## Verification and remaining gates

- Production build completed with the real font configuration.
- 36/36 batch posts pass structural/compliance/citation checks and metadata length limits.
- Initial PR #287 GitHub build and guard run: 25/25 fully passed, including the live BrightLocal listing check. The earlier local run passed 24/25 with that check skipped without its API key. Final follow-up commit checks are recorded on the PR.
- Fresh standalone TypeScript checks without generated `.next` types report 11 diagnostics in both the follow-up and a clean checkout of its parent; the outputs match exactly. The earlier built-output handoff reported 18 diagnostics. No new diagnostic was introduced in the comparable fresh check; the repository is not type-clean merely because its configured build succeeds.
- Mocked integration tests execute the real narrator to verify good-editor protection, hand/auto/FORCE no-write behavior, duplicate keyword handling, malformed HTTP-200 editor responses, invalid current-editor scores, and listed-score bypass prevention. They also exercise visible-text/metadata compliance and the real writer's topic matcher. No API credentials or network are used.
- Run the score check on rendered HTML using the existing matching NeuronWriter query; record the actual ID, date and before/after scores. No new query merely because a handoff lacks an ID.
- Complete a human review of retained claims, facility procedures, pricing/agreements and cited-source scope; run competitor originality checks on actual available competitor text; review artwork and previews before release.
- Publish only approved batches through human-reviewed PRs. This branch changes neither production nor publishing schedules.

## Full-archive audit follow-up — October 28, 2026

The 36-entry map is a review batch, not an audit of the entire archive. A follow-up checked all 65 main-branch post records and the 71 records in this draft branch. See `claude/BLOG-SEARCH-AUDIT-2026-10-28.md` for findings, implemented corrections and remaining decisions.

The follow-up removes the non-public tick/mosquito add-on amount from eight posts and the unverified standalone WDO amount from two posts. It expands the preparation guide with follow-up questions and service links, and rewrites the short sugar-ant guide without invented success rates, universal bait timelines or species identification from return speed. These corrections are additional to the 36-entry map; they do not turn it into a larger scored batch. The sugar-ant title/snippet changes correct unsupported June-specific framing; no archive-wide title shortening is applied.

`agents/knowledge/brand.md` no longer supplies contradictory per-treatment mosquito rates, public tick/flea prices, a stale WDO fee, an unqualified contract claim, a staffing promise or an unsupported exclusivity claim to the drafting agents. Current pricing/compliance source files govern.

The exact final commit must pass the pull-request build and guards and have its own preview verified. NeuronWriter scores and competitor originality remain pending; earlier build results do not prove those checks.
