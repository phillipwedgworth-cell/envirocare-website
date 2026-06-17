-- agents/lib/migrations/fix_agent_costs_duration_ms.sql
-- Run ONCE in the Supabase SQL editor (Dashboard → SQL Editor).
--
-- WHY
-- agents/lib/llm-with-logging.mjs inserts a `duration_ms` column, but the LIVE
-- agent_costs table predates it: it was created via `CREATE TABLE IF NOT EXISTS`
-- before duration_ms was added to the canonical schema. IF NOT EXISTS never
-- alters an existing table, so re-running the schema files silently no-ops and
-- the column was never backfilled. PostgREST then rejects every cost insert:
--   "Could not find the 'duration_ms' column of 'agent_costs' in the schema cache"
-- The agent run still succeeds; only cost logging fails — so the spend ledger
-- (the thing that catches the next Opus-style blowout) is dark.
--
-- DIRECTION: code is source of truth. duration_ms is real latency data, so we
-- ADD it to the table rather than dropping it from the insert.

ALTER TABLE agent_costs ADD COLUMN IF NOT EXISTS duration_ms integer;

-- Defensive: every other column the insert writes, in case the live table
-- drifted further than the single surfaced error. All no-ops if already present.
ALTER TABLE agent_costs ADD COLUMN IF NOT EXISTS run_id        text;
ALTER TABLE agent_costs ADD COLUMN IF NOT EXISTS role          text          DEFAULT 'worker';
ALTER TABLE agent_costs ADD COLUMN IF NOT EXISTS input_tokens  integer       DEFAULT 0;
ALTER TABLE agent_costs ADD COLUMN IF NOT EXISTS output_tokens integer       DEFAULT 0;
ALTER TABLE agent_costs ADD COLUMN IF NOT EXISTS usd_cost      numeric(10,6) DEFAULT 0;

-- Reload PostgREST's schema cache so the new column is visible immediately
-- (otherwise inserts keep failing for ~60s until PostgREST refreshes on its own).
NOTIFY pgrst, 'reload schema';

-- VERIFY after re-triggering /api/site-reviewer/run (a row should land per LLM call):
--   SELECT agent_name, model, role, input_tokens, output_tokens, usd_cost,
--          duration_ms, created_at
--   FROM agent_costs
--   ORDER BY created_at DESC
--   LIMIT 5;
