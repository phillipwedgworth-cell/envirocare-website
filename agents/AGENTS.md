# EnviroCare Agents

AI agents that run on a daily schedule and email a digest to Phillip every weekday at 6 AM CT.

## Structure

```
agents/
  orchestrator.mjs        — runs all agents, sends email digest
  run.mjs                 — local CLI runner (node agents/run.mjs)
  seo-monitor.mjs         — Local Falcon rankings + SoLV brief
  brightlocal.mjs         — BrightLocal citation scores
  competitor-watcher.mjs  — competitor SoLV tracking + alerts
  site-auditor.mjs        — page speed, meta, schema, H1 checks
  content-advisor.mjs     — content gap recommendations
  design-advisor.mjs      — design improvement recommendations
  oura-health.mjs         — Oura Ring readiness/HRV/sleep brief
  supabase-inspector.mjs  — summarizes what's in Supabase tables
  cfo-agent.mjs           — QuickBooks financial snapshot
  lib/
    critic.mjs            — universal worker→critic→revise loop
    kv.mjs                — key-value state (Supabase or /tmp in dev)
    supabase.mjs          — Supabase client + logAgentRun/writeFinding/readFindings
    supabase-schema.sql   — full schema (run once to bootstrap)
    migrations/
      add_agent_findings.sql
      add_cfo_tables.sql
```

## How It Works

Each agent exports `run()`. The orchestrator calls them in sequence, collects outputs, and sends an HTML email digest via Resend.

Every agent uses the **critic loop** (`lib/critic.mjs`):
1. Worker (Haiku) produces a draft
2. Critic (Sonnet) reviews against a rubric — PASS or FAIL with specific issues
3. If FAIL: worker revises with feedback and critic reviews again
4. Max 3 loops — then escalates (returns best draft)

State is stored in Supabase (`agent_state` table). Findings go to `agent_findings`. SEO snapshots go to `envirocare_seo`.

## Running Locally

```bash
# From repo root
node agents/run.mjs
```

Loads `.env` from repo root automatically.

## Required Environment Variables

```
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
NOTIFY_EMAIL=phillipwedgworth@gmail.com
NOTIFY_FROM=agents@envirocarellc.com
LOCAL_FALCON_API_KEY=...
BRIGHTLOCAL_API_KEY=...
OURA_TOKEN=...
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-service-role-key
```

## Supabase Setup

Run `agents/lib/supabase-schema.sql` once in the Supabase SQL editor to create all tables.

## Adding an Agent

1. Create `agents/my-agent.mjs` with `export async function run() { ... }`
2. Import and add to the `AGENTS` array in `orchestrator.mjs`
3. Use `criticLoop` from `./lib/critic.mjs` for quality control
4. Use `stateGet`/`stateSet` from `./lib/kv.mjs` for persistence
5. Use `writeFinding` from `./lib/supabase.mjs` to log findings
