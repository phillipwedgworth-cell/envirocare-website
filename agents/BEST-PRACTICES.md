# AGENTIC DEVELOPMENT BEST PRACTICES — BY SPECIALTY
**For the EnviroCare agent fleet · Jul 4, 2026 · from my knowledge through early 2026 — worth a web-search refresh quarterly, this field moves fast**

The core finding across the industry (Anthropic's "Building Effective Agents" work, and what's held up in production since): the teams that win use **simple, composable single-purpose agents with explicit checkpoints** — not one giant autonomous agent. Your fleet already has the right shape (small .mjs scripts, one job each, cron-scheduled). What follows is how each *specialty* of agent should differ, because a finance agent and a content agent fail in opposite ways.

## Universal rules (every agent, every specialty)

The pattern that survives production is **retrieve → act → distill**. At start, read your own prior findings ("what did I learn last run"). Act. At end, write one distilled paragraph of new learning — not a raw log dump, a *conclusion*. An agent that only writes memory relearns everything; an agent that only reads goes stale. Second: every agent no-ops safely when credentials are missing (your fleet already does this — keep it). Third: idempotency — running twice must not double-post, double-charge, or double-email; check "did I already do this" before every side effect. Fourth: agents log to one ledger (your `agent_runs`) and one watchdog reads it — never let each agent invent its own alerting.

## Finance / CFO agents (digest, pastdue)

Highest-stakes specialty, so the rules are strictest. **Read-only by default** — a finance agent that can move money or suspend accounts is a different risk class than one that reports; keep enforcement (actual suspension) human-executed from the worklist. **Never trust one source**: every number the agent asserts should be reconcilable against a second system (Fieldster AR vs QBO AR — your monthly-close tie-out). **Deterministic math, LLM narration**: compute totals in code, never let a model do arithmetic on money; the model's job is only explaining the numbers. **Fail loud**: a finance agent that silently returns zeros is worse than one that crashes — your digest's "⚠️ no agreement matched keywords" fallback flag is the right instinct, extend it everywhere. And human sign-off gates (your RED system) on anything customer-facing or dollar-moving — this matches the industry's "human-in-the-loop for irreversible actions" consensus exactly.

## Content agents (nw-optimize drafts, blog, city pages)

Opposite failure mode: not wrong numbers but *drift* — off-brand voice, compliance violations, factual creep. Best practice is **generator/critic separation**: the model that writes must not be the model that approves (your new content-reviewer panel is the textbook version — three independent critics, disagreement surfaced as the signal). **Compliance rules live in the critic's prompt, not the generator's** — generators under pressure to produce will rationalize around constraints; critics with nothing to produce enforce them. **Never auto-publish**: draft → panel review → human merge, always. And measure content agents on *outcome* metrics (GSC impressions recovered, conversions per page) not output volume — an agent rewarded for word count produces slop.

## Review/judge agents (content-reviewer, llm-panel)

LLM-as-judge has known biases you must design around: models favor their own outputs (so never let Claude judge Claude-written drafts alone — the 3-model panel fixes this), favor longer answers, and drift toward "approve" over many runs. Countermeasures: **structured verdicts** (JSON, forced choice — approve/revise/flag — never free-form "looks good"), **confidence scores** so you can ignore low-confidence votes, and **track panel accuracy over time**: when the panel said approve and you later had to fix something, log it — that's your judge-quality metric. Disagreement between judges is the product, not noise: unanimous = fast-track, split = your attention. Route splits to the top of the Approval Hub.

## Ops/monitoring agents (watchdog, seo-snapshot)

The specialty rule here is **the monitor must not monitor itself** — your watchdog self-fail loop bug (fixed in the Jun commit) is the canonical failure; the fix you shipped (always log ok on completion, problems ride in the payload, skip own ledger row) is the standard pattern. Second: **dual-trigger everything critical** — your Vercel-cron + GitHub-Actions fallback for the SEO snapshot is exactly right; single-scheduler agents die silently when the scheduler's env breaks. Third: monitoring agents should report *deltas*, not states ("SoLV down 4 vs last week" beats "SoLV is 31") — which requires the memory-read pattern above; this is where your relearning concern bites hardest today.

## Outreach agents (social-poster, future dunning sender)

Anything that talks to customers gets three gates: **approval queue** (only status=approved publishes — you have this), **rate limits and quiet hours** hardcoded (no dunning texts at 11pm; cap sends/day so a bug can't spam 400 customers), and **suppression lists** honored before every send (opt-outs, active-dispute accounts). Log every message sent with content + timestamp — for texting especially, TCPA compliance in the US effectively requires it. The dunning agent, when we build it, additionally never *composes* messages at send time — it fills your signed-off templates with amounts/dates only, so wording can't drift from what you approved.

## Memory & knowledge growth (the Supabase question)

Your storage (`agent_runs`, `agent_memory`) is the right substrate; the missing piece is the read path. Practical architecture that works at your scale: keep **episodic memory** (per-run findings, what happened) separate from **semantic memory** (durable conclusions: "Huntsville leads convert 2x on termite content"). Runs write episodic; a weekly distiller promotes patterns into semantic; agents read *semantic* at startup (small, curated, high-value) and only their own recent episodic. Don't reach for vector databases yet — at your volume, a `learnings` table with an agent-name column and a 20-row read at startup beats embeddings on cost and debuggability. Prune: memory that's never contradicted or confirmed in 90 days gets archived, or the read grows until it's noise.

## The verification checklist (run this against the fleet)

For each agent ask five questions: Does it read prior findings before acting? Does it write a distilled learning after? Is every side effect idempotent and gated? Does the watchdog see it? Is it measured on an outcome, not activity? Any "no" is the retrofit list. My read from the repo commits: watchdog and seo-snapshot pass most; social-poster passes gating; nearly everything fails the *read-before-act* question — that's the single highest-leverage fix, roughly one Claude Code session across the fleet. **[Corrected 2026-07-28 after a per-agent survey: brightlocal, orchestrator, proposer, seo-monitor, seo-watch, site-reviewer, neuronwriter-qa and neuronwriter-optimize all already read prior state; the real gaps were morning-brief (fixed — reads yesterday's brief, PR #72) and review-responder (fixed — dedup ledger, PR #71). Read-before-act retrofit is DONE.]**

---

## Checklist run — 2026-08-10 (measured, not estimated)

`npm run audit:fleet` (`scripts/audit-agent-fleet.mjs`) applies the five questions above to
every `agents/*.mjs`, excluding 10 one-shot utilities. **26 scheduled agents.**

| Question | Pass | Gap |
|---|---|---|
| Q1 read-before-act | 11 | 15 |
| Q2 writes a distilled learning | 14 | 12 |
| Q3 side effects gated / idempotent | 21 | 5 |
| **Q4 visible to the watchdog** | **14** | **12** |
| Q5 measured on an outcome | 17 | 9 |

**No ungated customer-facing side effect exists.** The two agents the first pass flagged were
both false alarms on inspection: `content-reviewer` only calls LLM APIs, and
`ai-citation-probe`'s email is env-gated and goes to `NOTIFY_EMAIL` internally.
`social-poster` gates correctly on `.eq("status","approved")`.

### The real gap is Q4, and it is structural

**12 of 26 agents never call `logAgentRun`**, so the one-ledger/one-watchdog rule this file
sets out is only true for half the fleet:

> aeo-watch · ai-citation-probe · ai-opportunities-intake · cfo-agent · daily-rollup ·
> ingest-ga4 · ingest-gads-campaigns · ingest-gsc · morning-brief · neuronwriter-narrator ·
> seo-snapshot · source-of-truth-auditor

The same 12 also fail Q2. That is not a coincidence — they are the agents that were written to
*produce an artifact* (a file, a table row, an email) rather than to participate in the fleet's
memory. **A silent failure in any of them looks identical to success**, which is exactly how the
review responder went two weeks without drafting anything.

### Correction to the note below

Line 36 states *"Read-before-act retrofit is DONE."* Measured: **15 of 26 still do not read
prior state.** The Jul-28 survey was right about the agents it named — `morning-brief` does read
yesterday's brief, via a raw REST call rather than the kv helper — but the retrofit was never
fleet-wide. Two of my own first-pass numbers were also wrong for the same reason: matching
`stateGet(` missed the REST form, and matching `=== "approved"` missed the Supabase filter.
**The heuristics are documented in the script; widen them rather than trusting a stale count.**

