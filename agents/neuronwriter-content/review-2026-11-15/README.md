# Twenty existing-article drafts for Claude review

Prepared November 15, 2026, from repository main commit
`8dc8ab3c697085459b5b9bf24396f1df888f9609`.

This batch supplies **20 complete HTML draft candidates for existing URLs**,
with direct answers, distinct property-specific question tables, contextual
references, metadata proposals, existing image assignments and internal links.
It does not create 20 new public pages. The live website data is unchanged.

## Review and run

Run from the repository root with Node 24:

```bash
node agents/neuronwriter-content/review-2026-11-15/run-batch.mjs --mode plan
node agents/neuronwriter-content/review-2026-11-15/test-run-batch.mjs
```

Plan mode is local and makes no account requests. For a signed-in environment
where the existing `NEURONWRITER_API_KEY` is already configured:

```bash
node agents/neuronwriter-content/review-2026-11-15/run-batch.mjs --mode score
node agents/neuronwriter-content/review-2026-11-15/run-batch.mjs --mode import
```

Do not paste credentials into chat, source files, arguments or PR comments.
No credential files are loaded by this runner. If API access is unavailable on
the actual current plan, use the existing analysis UI after sign-in; do not
upgrade or bypass the restriction. The official API documentation currently
describes Gold-or-higher access. The historical account label is not a fresh
entitlement check.

The runner is limited to this project's exact 20 recorded query IDs. It
revalidates the live READY inventory, language, search engine, keyword and
duplicate/hold tags. It reads the latest editor including autosaves, evaluates
current and proposed content before any write, preserves equal or stronger
editors, and holds candidates below the existing 65 coverage floor. The floor
is a workflow guard, not publication approval or factual validation.

For a qualifying import it rechecks for concurrent edits, saves a private local
backup, sends one import and verifies content/title/description on readback.
An uncertain write stops without retry. The result may be fewer than 20 imports;
kept, held, blocked and unconfirmed rows must never be counted as imported.

Private backups/results are written under `audit-results/neuron-review-20/`.
**Do not commit, upload or post these backups:** they contain existing private
editor revisions. No model calls, new analyses, emails, database writes,
schedules, website edits or production publication are performed by the runner.

## What needs Claude's review

Each candidate replaces its opening answer and adds a distinct decision table,
source reference and service CTA. The existing body and original author/date
are otherwise retained, apart from the recorded timing-article correction.
This is targeted revision work, **not full factual or originality clearance of
all inherited paragraphs**. Do not imply Kevin has reviewed the new prose.

Check each HTML file beside the current source/editor. Avoid duplicate
questions, thin repetition and unsupported claims. The manifest's new metadata
is a proposal; the canonical URL, public article title and original publication
date remain unchanged. No current NeuronWriter score is claimed. Recorded
scores are historical November 4 observations, not today's measurements.

The existing source registry controls references. The green-cap article also
retains the separately checked EPA historical award reference; that supports
the original award only, not current safety claims or company endorsement.
The fire-ant article retains historical extension references. See batch.json
for the individual source retrieval limits. Do not treat a source URL as proof
of every nearby inherited sentence.

## Images and AI readability

Each row identifies an existing public image via `data/blog-visuals.ts` or the
article's commissioned hero. File presence was checked; preserve useful
existing art and do not claim it documents an actual job. Reuse the article's
hero in the final site rather than duplicating it inside the body. The review
index displays these existing images with the draft. No new image credits are
spent by this batch.

Plain answers, question headings, accessible table headers, meaningful internal
links and sources help readers interpret the page. They do not guarantee AI
citations. Google's FAQ rich-result feature was retired in 2026; do not promise
that adding FAQPage markup will produce a rich result. Keep accurate existing
Article/Breadcrumb markup when the reviewed content is eventually integrated.

## Account closeout

No authenticated NeuronWriter import or scoring run was completed during
preparation. No content was imported, scored or saved in its editors, and no
monthly quota or current plan was verified.
All 20 files are staged for review and the runner is available to use after
access is restored. Do not call this an already-completed account push.

The old global Narrator command can choose unrelated editors and can send
notifications. Use this exact batch runner for this task. This review directory
is excluded from the existing automatic FILL push trigger. Do not move these
files into the active manifest or merge a release as part of reviewing them.

Useful product documentation:
https://neuronwriter.com/faqs/neuronwriter-api-how-to-use/
