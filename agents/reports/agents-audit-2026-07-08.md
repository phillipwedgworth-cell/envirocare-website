# EnviroCare Agents Audit — 2026-07-08

Full sweep of every automation: what exists, what runs when, what's broken (from
actual run history), and prioritized fixes. Sources: `.github/workflows/`,
`vercel.json` crons, `agents/`, GitHub Actions run logs, open PRs.

---

## 🔴 BROKEN — found in run history, needs fixing

### 1. Morning Brief fails EVERY day (3/3 recent runs)
- **Error (from run 28880381280):** `morning_brief upsert failed: 404 …
  Could not find the table 'public.morning_brief' in the schema cache`
- **Root cause:** the table's SQL **already exists** at `agents/lib/schema.sql:49`
  — it was simply **never run against Supabase**.
- **✅ THE FIX (2 minutes, human):** open Supabase → SQL Editor → paste the
  contents of `agents/lib/schema.sql` → Run. It's `create table if not exists`,
  so it's safe to run even if some tables exist. Next 13:30 UTC run should go green.

### 2. CrewAI Analysis can never succeed — schedule disabled (this PR)
- **Error:** working directory `envirocare-crew/` — *No such file or directory*.
  The folder was never committed to the repo.
- **Fix applied in this PR:** weekly cron commented out in
  `.github/workflows/run-crew.yml` (manual trigger kept). Re-enable only after
  committing the `envirocare-crew/` directory.

### 3. Watchdog is blind to exactly these failures
- `agents/watchdog.mjs` only reads the Supabase `agent_runs` ledger. Morning
  Brief dies **before** it ever writes there, so the watchdog reported ✅ success
  daily while the brief failed daily.
- **Recommended fix:** (a) every agent should `logAgentRun('failed', …)` in a
  try/catch before exiting, and/or (b) watchdog should also query the GitHub
  Actions API for red scheduled runs. Also add `morning-brief`, `daily-rollup`,
  `aeo-watch`, `seo-watch`, `social-poster` to watchdog's `EXPECTED` list once
  they log — today it only watches 5 of ~13 scheduled automations.

### 4. Housekeeping debt
- **npm audit:** 2 moderate vulnerabilities (`npm audit` for detail; review before `fix --force`).
- **`agents/AGENTS.md` is badly stale** — documents 6 agents that don't exist
  (competitor-watcher, site-auditor, content-advisor, design-advisor,
  oura-health, supabase-inspector) and misses ~15 that do. Needs a regen.
- **~20 stale remote branches** (old claude/* work). Prune after checking nothing unmerged matters.
- **PR #14 (June 23) still open:** found **12 dead root pages** + built an audit
  script (`npm run audit:locations`). Decide: merge the script, delete the 12
  dead pages, wire `--strict` into CI.
- Actions deprecation warnings: `actions/cache@v4`, `setup-python@v5` on Node 20 — low priority.

---

## 👀 WAITING ON YOUR REVIEW RIGHT NOW

| What | Where | Why it matters |
|---|---|---|
| **PR #36 — NeuronWriter optimize drafts** | github.com/…/pull/36 | The narrator/optimizer rewrote every page scoring <70. **Nothing ships until you merge.** This is the "approve neuron narrator" queue. Labeled `content-review`. |
| PR #39 — launch handoff (+ this audit) | github.com/…/pull/39 | The next-agent task queue + this report. |
| PR #14 — dead pages audit | github.com/…/pull/14 | 12 dead root pages; stale since June. Merge or close. |

---

## 📋 FULL INVENTORY — every automation, when it runs, what it does

### GitHub Actions (scheduled)
| Workflow | Schedule (UTC) | Runs | Status (last runs) |
|---|---|---|---|
| Neuron Narrator | daily 13:00 (score) + Mon 14:00 (fill) | `neuronwriter-narrator.mjs` — auto-writes/scores SEO drafts, emails ready-to-ship queue | ✅ green |
| NeuronWriter QA | Mon 13:00 | `neuronwriter-qa.mjs` — scores all pages | ✅ green |
| NeuronWriter Optimize | Tue 13:00 | `neuronwriter-optimize.mjs` — rewrites <70 pages → **opens PR #36-style review PR** | ✅ green |
| Morning Brief | daily 13:30 | `morning-brief.mjs` — daily digest → Supabase + email | 🔴 **failing daily** (fix above) |
| Daily Rollup | daily 13:00 | `daily-rollup.mjs` — rolls up agent findings | ✅ green |
| AEO-Watch | daily 12:00 | `aeo-watch.mjs` — AI-answer-engine visibility | ✅ green |
| SEO Watch | Mon 13:00 | `seo-watch.mjs` | ✅ green |
| SEO Monitor (Local Falcon) | Mon 14:00 | `seo-snapshot.mjs` — SoLV grid snapshots | ✅ green |
| Ingest SEO (GSC+GA4) | Mon 11:20 | `ingest-gsc.mjs` + `ingest-ga4.mjs` → commits `monitoring/` snapshot | ✅ green |
| Social Poster + Suggester | daily 15:00 | `social-poster.mjs` (+ Mon suggestions) | ✅ green |
| Agent Watchdog | daily 14:00 | `watchdog.mjs` — checks `agent_runs` freshness, budget, Anthropic cap, Vercel deploys | ✅ runs, but see blind spot above |
| CrewAI Analysis | ~~Mon 12:00~~ **disabled** | Python crew (folder missing) | 🔴 was failing; schedule now off |
| Claude Code | on @claude mention | interactive | n/a |

### Vercel crons (serverless, from vercel.json)
| Path | Schedule (UTC) | What |
|---|---|---|
| `/api/orchestrator/run` | daily 09:00 | Runs the whole registry (brightlocal, review-responder, seo-monitor, nw-qa, cfo-agent, site-reviewer, proposer) → Sonnet synthesis → email digest |
| `/api/brightlocal/run` | 4×/day | Citation scores |
| `/api/site-reviewer/run` | 4×/day | Visual/perf/SEO multi-model panel |
| `/api/seo-monitor/run` | Mon 14:00 | Local Falcon |
| `/api/watchdog/run` | every 6h (:30) | Watchdog (serverless twin) |

### Support/manual scripts (no schedule)
`ingest-gads-campaigns.mjs` (Google Ads CSV → Supabase), `seed-ad-drafts.mjs`
(paused ad drafts), `sync_contacts.py` (Fieldster, read-only default),
`source-of-truth-auditor.mjs` (compliance scan), `rescore-*`, `*-380.mjs`
(Playwright screenshots/measure), `run.mjs` (local runner).

---

## 🔗 WHERE TO REVIEW EVERYTHING (bookmark these)

| What | Link |
|---|---|
| **Content approval (narrator/optimizer)** | Open PRs labeled `content-review` → currently **PR #36**; drafts also in NeuronWriter → app.neuronwriter.com project `9d0bec3a70f4743c` |
| **All-agents dashboard** | `envirocarellc.com/command-center?key=…` (COMMAND_CENTER_KEY) |
| Agent chatter (findings/discussions JSON) | `/api/agents/discussions` |
| Agent env health | `/api/agents/health` · CFO: `/api/cfo/verify` · NeuronWriter: `/api/nw` |
| Automation run history | github.com/phillipwedgworth-cell/envirocare-website/actions |
| Ad-draft approval UI | `/ads/<draft-id>` |
| Daily digest email | Resend → NOTIFY_EMAIL (orchestrator 09:00 UTC; narrator queue email) |

---

## 🚀 PRIORITIZED IMPROVEMENTS (best practices)

1. **Run `agents/lib/schema.sql` in Supabase** → un-breaks Morning Brief today. (2 min)
2. **Merge or close PR #36** — content is queued behind you; make Tuesday PRs auto-assign you as reviewer so they don't sit.
3. **Close the watchdog blind spot** — agents log failures to `agent_runs`;
   watchdog checks GH Actions too; expand `EXPECTED` to all 13 schedules. One
   failure-notification email beats checking dashboards.
4. **Consolidate the double-stack gradually** — automations are split across
   GH Actions AND Vercel crons (two places to watch). Long-term: one scheduler
   (GH Actions), Vercel only for request-serving.
5. **Deal with PR #14** — delete the 12 dead root pages, add `audit:locations
   --strict` to CI so dead pages can't come back.
6. **Regenerate `agents/AGENTS.md`** from the real inventory (this table is a start).
7. **npm audit** — review the 2 moderates.
8. **Prune stale branches** (~20) after a quick unmerged-work check.
9. **Add a CI compliance gate** — run `source-of-truth-auditor.mjs` on PRs so
   banned copy can't merge (currently only manual).

## LSA note (you said you did LSA stuff)
No LSA changes appear in the repo or any PR — your LSA work was presumably in
the Google account itself (applying for Google Guaranteed etc.), which is
invisible to the repo and exactly the human-only part of
`agents/lsa-setup-runbook.md`. Next repo-side step remains drafting
`agents/lsa-profiles.json` (Phase A of the runbook).
