# Cited content batch and NeuronNarrator improvements — October 28, 2026

Review only. This branch builds on the three data-center guides in PR #286. It prepares **36 posts total: 30 targeted refreshes of existing URLs and six data-center guides**, of which three were already in #286. It does not create 36 new URLs or authorize a mass release.

## Content changes

The 30 refreshes preserve slugs, authors and original publication dates. They revise the opening answer, title, excerpt, metadata, first question heading and a narrowly supported inline citation. `updatedAt` records the edit. Existing body sections remain and require an editorial fact-check; a new reference does not establish every retained claim. The six facility guides address planning, entry points, procurement, construction handover, reporting and activity response. Internal links keep broad conversion intent on `/data-center-pest-control`.

The exact 36-entry route/keyword/source map is `agents/knowledge/editorial-batch-36.json`. Its score and competitor-originality fields deliberately remain null/false. Source limits and retrieval dates are in `agents/knowledge/editorial-sources.json`.

## Agent changes

- NeuronNarrator chooses one editor for each normalized keyword, prioritizes planned keywords, prefers READY rows then newest update, and does not create queries.
- Existing editors at the protection score remain protected even when a manifest draft exists. A failed editor read prevents replacement.
- Every attempted import passes the shared compliance, source-allowlist and answer-structure gate, including hand drafts and FORCE. This is a structural gate, not proof that the citation entails every claim.
- Source prompts state exactly what a reference supports and prohibit invented references or endorsements.
- Both `blog-from-drafts` and `blog-writer` retain approved external citations and apply the same gate after rewrites. The blog-writer prompt no longer calls a real-estate WDO report free.
- Candidate attempts default to three per narrator run; manual `max_writes` accepts 1–40. FORCE permits attempting protected editors within that limit and never bypasses quality checks. No cadence, billing or live settings changed.
- Summaries count imports, errors and deferred editors separately. An all-error run is recorded as error rather than ok.

PR #285 independently fixes the blog writer's topic-overwrite behavior. This branch does not replace that patch; resolve the small shared-file overlap by keeping both the topic-protection changes and these citation gates. Do not merge the off-topic #283 rewrite.

## AI/search approach

Use clear answers, first-party evidence, relevant internal links, accurate structured data and indexing eligibility. Google says ordinary SEO fundamentals apply to AI Overviews and AI Mode; there is no special AI schema or AI text-file requirement: https://developers.google.com/search/docs/appearance/ai-features . These changes improve the content's usefulness and reviewability; they do not establish an AI ranking gain.

Keep public source citations separate from acquisition of third-party mentions. Linking to an EPA reference does not create an independent citation of EnviroCare. Verify actual local listings and professional evidence separately. Private account measurements and research remain outside this public branch.

## Verification and remaining gates

- Production build completed with the real font configuration.
- 36/36 batch posts pass structural/compliance/citation checks and metadata length limits.
- `npm test`: 24/25 fully passed; BrightLocal listings skipped without the API key.
- Standalone TypeScript reports 18 diagnostics, identical to the unchanged parent. No new diagnostic was introduced; the repository is not type-clean merely because its configured build succeeds.
- Mocked integration tests execute the real narrator to verify good-editor protection, hand/auto/FORCE no-write behavior, duplicate keyword handling and failed-read protection. No API credentials or network are used.
- Run the score check on rendered HTML using the existing matching NeuronWriter query; record the actual ID, date and before/after scores. No new query merely because a handoff lacks an ID.
- Complete a human review of retained claims, facility procedures, pricing/agreements and cited-source scope; run competitor originality checks on actual available competitor text; review artwork and previews before release.
- Publish only approved batches through human-reviewed PRs. This branch changes neither production nor publishing schedules.
