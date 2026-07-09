# PR review briefs — #39, #36, #14 (2026-07-09)

Task 5 of the maintenance sprint: review the three PRs flagged in the launch
handoff. All three were merged while this review was in flight (07-08 → 07-09),
so each brief records what was verified pre-merge and what follow-ups remain.

---

## PR #39 — docs(launch): agent handoff + automation audit — MERGED 07-08

**What it was:** the audit that generated this sprint. Handoff task queue +
full automation inventory from real GH Actions logs, plus one live fix
(disabled the CrewAI weekly cron that could never succeed — `envirocare-crew/`
isn't in the repo).

**Verdict:** sound. Its four red/amber findings became Tasks 1–4, all now
merged: #40 (review-responder fail-fast), #41 (watchdog heartbeats for all 13
automations + Vercel runtime errors), #43 (site-reviewer chunking — no more
300s deaths), #44 (neuronwriter-qa quota guard).

**Still open from the audit:**
1. **Run `agents/lib/schema.sql` in the Supabase SQL Editor** (~2 min, manual).
   Until then Morning Brief keeps failing on the missing `morning_brief` table,
   and the new watchdog will correctly flag `morning-brief` OVERDUE every run.
   This is the single highest-value remaining item.
2. `ingest-seo` still writes no run log — the one automation the new watchdog
   can't see. Needs the same `agents/lib/run-log.mjs` treatment #41 gave the
   other three silent scripts.

---

## PR #36 — NeuronWriter optimize drafts — MERGED 07-08

**What it was:** the weekly content-approval PR, but this cycle carried **no
content** — all 15 drafts errored with NeuronWriter 429s (monthly
keyword-analysis quota exhausted). The merge (+1/−1) only updated the
`_SUMMARY.md` run record to 2026-07-07.

**Verdict:** the approval gate itself worked as designed (`do-not-auto-merge`
label, human merge, nothing shipped to the live site). The failure mode behind
it — 15 pages each burning a quota attempt after the quota was already dead —
is what #44 fixed: first 429 halts the batch, exhaustion is remembered in
`agent_state` and auto-resets on the 1st of the month, money pages run first.

**Follow-up:** the content pipeline is stalled until the NeuronWriter quota
resets (2026-08-01 UTC) or the plan is upgraded. Expect the next few Monday
runs to log one clean "quota exhausted, skipped" line — that's the guard
working, not a new failure.

---

## PR #14 — location/SEO page audit script + dead-page findings — MERGED 07-09

**What it was:** stale since 06-23. An audit script (`npm run audit:locations`)
plus the finding that 12 stray root-level `page.tsx` files (madison,
huntsville, hoover, …) were dead code Next.js never serves.

**Verified before merge:**
- The 12 stray pages were **already deleted by PR #26**, which also added the
  `/madison` redirect — so two of #14's three "needs your call" items were
  done, and the PR had shrunk to just the tooling.
- The script merged onto main is byte-identical to the PR version, and its
  `../../components` resolution concern is moot now that the stray pages are
  gone. No conflicts with #26's deletions (the PR only added files).

**Verdict:** correct to merge — the audit script is real ongoing value
(83 routed pages, 0 metadata gaps at last run).

**Follow-up:** wire `npm run audit:locations -- --strict` into CI. It was held
back because main still had stray pages; main now has zero, so the gate can go
in green and will stop any local `drafts/` generator from ever writing dead
root pages again. Small change: one step in an existing workflow.

---

## Consolidated follow-up queue

| # | Item | Effort | Owner |
|---|------|--------|-------|
| 1 | Paste `agents/lib/schema.sql` into Supabase SQL Editor (unblocks Morning Brief, quiets watchdog OVERDUE) | 2 min | Phillip (needs Supabase login) |
| 2 | Add `audit:locations --strict` step to CI | small | agent-safe |
| 3 | Add run-logging to `ingest-seo` via `agents/lib/run-log.mjs` | small | agent-safe |
| 4 | NeuronWriter quota: wait for 08-01 reset or upgrade plan | decision | Phillip |
