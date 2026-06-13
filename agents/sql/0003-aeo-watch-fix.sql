-- AEO-Watch schema fix (0003)
-- Project: dyoujmyleihcpqgeifre ("Phillips Agents")
-- Run in Supabase SQL Editor. Idempotent — safe to re-run, touches no data.
--
-- WHY: the base schema (agents/lib/schema.sql) named columns `agent_name` /
-- `run_date`, but the AEO-Watch client (agents/lib/supabase-client.mjs) writes
-- to `agent`, `started_at`, `ended_at`, `created_at`. 0002 added most of the
-- agent_findings columns but missed agent_runs.agent and the agent_discussions
-- identity/timestamp columns — which is why the first run failed at startRun().
-- This adds every column the client actually writes, and relaxes legacy
-- NOT NULL columns the client does not populate.

-- agent_runs: columns startRun() / endRun() / getLastRunAt() use
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS agent text;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS started_at timestamptz;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS ended_at timestamptz;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS summary jsonb;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS status text;

-- agent_discussions: columns recordPanel() writes
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS agent text;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS finding_id bigint;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS votes jsonb;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS tally jsonb;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS consensus text;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS split boolean;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS cost_usd numeric;

-- agent_findings: re-assert in case 0002 only partially applied
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS agent text;
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Relax legacy NOT NULL columns the AEO-Watch client never fills.
-- Guarded so this is a no-op if the table is already the newer shape.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='agent_runs' AND column_name='agent_name') THEN
    ALTER TABLE agent_runs ALTER COLUMN agent_name DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='agent_findings' AND column_name='agent_name') THEN
    ALTER TABLE agent_findings ALTER COLUMN agent_name DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='agent_findings' AND column_name='category') THEN
    ALTER TABLE agent_findings ALTER COLUMN category DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_name='agent_findings' AND column_name='finding') THEN
    ALTER TABLE agent_findings ALTER COLUMN finding DROP NOT NULL;
  END IF;
END $$;

-- Indexes (safe to re-run)
CREATE UNIQUE INDEX IF NOT EXISTS agent_findings_dedup_unique
  ON agent_findings (agent, dedup_key);
CREATE INDEX IF NOT EXISTS agent_findings_agent_created
  ON agent_findings (agent, created_at DESC);
CREATE INDEX IF NOT EXISTS agent_runs_agent_ended
  ON agent_runs (agent, ended_at DESC);
CREATE INDEX IF NOT EXISTS agent_discussions_finding
  ON agent_discussions (finding_id);
