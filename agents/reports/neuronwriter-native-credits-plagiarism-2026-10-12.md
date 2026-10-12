# NeuronWriter native AI and plagiarism work order — Oct 12, 2026

## Starting usage (user-supplied, not independently confirmed)
- Content Writer analyses: **57 / 75 used**, **18 left**.
- NeuronWriter-native AI credits: **0 / 45,000 used**.
- NeuronWriter plagiarism checks: **0 / 75 used**.
- Account project: `9d0bec3a70f4743c`.
- Production proxy health: `GET /api/nw` returned HTTP 200 with `keySet:true` on Oct 12; this **does not authenticate a native AI/plagiarism action or verify usage**.

## Why two counters have stayed at zero
`agents/neuronwriter-narrator.mjs` uses Anthropic's API to generate HTML. It then imports/scores that HTML with NeuronWriter's API. **It does not invoke native NeuronWriter AI Writing**, so NeuronWriter's *AI credits* may remain at zero even while drafts are being generated. No current repo workflow calls NeuronWriter's plagiarism checker.

NeuronWriter's public docs confirm that native AI credits are consumed by AI Templates, Content Designer, Neuro Assistant, Auto Insert Terms, and AI Optimisation; unused monthly credits **do not roll over**. Plagiarism is an editor action: open content editor → **Editor** (near Save) → **Check for Plagiarism**; reports live under Content Revision. Public NeuronWriter API docs list query/editor/import/evaluation methods, but no supported plagiarism-check API endpoint; do not invent one or scrape private API calls. 

Sources (verified Oct 12):
- https://neuronwriter.com/faqs/what-is-ai-credits-in-neuronwriter/
- https://neuronwriter.com/faqs/does-neuronwriter-have-a-plagiarism-checker-and-how-does-it-work/
- https://neuronwriter.com/faqs/neuronwriter-api-how-to-use/

## Operator procedure for Claude with the authenticated NeuronWriter UI
**Do not purchase extra credits or plans. Do not publish directly to the live website.**

1. Open the EXISTING EnviroCare project (do not recreate). Verify live credit counters and renewal date first. Save timestamped screenshots of all three quotas. Export/read existing queries; reuse existing editor/query IDs. The Oct 11 research index has 58 keyword rows, including multiple keywords mapped to the same existing site page. Compare them against the current project before making a new query.
2. Native **AI Writing**: start with *Huntsville*, *Birmingham*, *Termite/WDO*, *Alabaster*, *Lake Martin*, *Auburn/Opelika*. Prefer improving one existing canonical page at a time using **Neuro Assistant / AI Optimisation**, not unreviewed one-click bulk articles. Generate answer-first FAQ text, concrete local buyer questions, human-readable headlines and supporting sections. Target clear, useful content; a score of 68–80 is a quality-assurance signal, not a reason to stuff terms or claim more pages are needed. Check exact prompt/context and preview before applying any change. Preserve existing editor draft for rollback.
3. **Plagiarism**: after producing an editorially ready draft, open **Editor → Check for Plagiarism** and confirm. Prioritize AI-generated/rewritten text and the highest-value local pages. Save each report. For substantive suspicious matches, remove close unattributed paraphrases and check again if necessary; ordinary NAP/address/service/legal terms do not have to become unnatural to lower similarity. Never claim that an unrun checker verified originality.
4. **Content Writer analyses**: do not burn the remaining 18 on duplicates. Use them only for high-intent keywords with verified page ownership and no existing usable query, as documented in the Oct 11 research. Reserve capacity for emerging GSC opportunities.
5. Keep changes in **NeuronWriter drafts** until reviewed; create a separate, coherent **GitHub draft PR** per site page group with before/after HTML excerpts, keyword map, screenshots, source-citation integrity and compliance findings. Claude/Phillip handle merge and production push, not this automation.

## Required per-page QA checklist
- [ ] Real existing canonical URL and primary intent verified (no duplicate doorway page).
- [ ] Current copy and NeuronWriter editor backed up; baseline editor score recorded.
- [ ] Native AI assistant actually used; AI-credit decrement observed; screenshot/export retained privately.
- [ ] Final editor content scores as well or better without stuffing; copy is factual and not plagiarized.
- [ ] Plagiarism check actually completed; matched sources inspected; report saved.
- [ ] Compliance passes `data/compliance.ts`: accurate office NAP, exact termite repair coverage qualifier, no promise of immediate service, no fake reviews/staff/site images, no unsupported price or commercial service claim.
- [ ] Human-readable FAQ answers and relevant links included; FAQ schema only if valid under current search guidelines.
- [ ] GitHub PR draft created but not merged; no direct production publish.
- [ ] Credit balances and actions recorded in a **private account report**, not the public repo.

## Targeted sequence for October
1. `/huntsville` and `/birmingham` — existing real GSC impressions, weak click-through and ranking.
2. `/services/termite-control`, `/services/wdo-letters`, and the existing termite-bond article.
3. `/alabaster` and `/lake-martin-area`, keeping office and service-area facts accurate.
4. Existing Sentricon explainer (already improved in PR #244); only append clearly missing answers.
5. Seasonal autumn rodent/prevention subjects **only after a duplicate-content audit**.

## Execution/status caveat
This file is an **execution checklist for an operator in the logged-in editor**. The public GitHub and Vercel connections in Chat cannot operate NeuronWriter's authenticated editor AI/plagiarism controls. Neither credits nor plagiarism checks were consumed by creating this file. Confirm exact counters again when the browser actions finish.
