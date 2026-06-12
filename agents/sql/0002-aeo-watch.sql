-- AEO-Watch schema additions
-- Project: dyoujmyleihcpqgeifre ("Phillips Agents")
-- Run in Supabase SQL Editor (paste-truncation safe — short statements)
--
-- These additions extend the EXISTING agent_findings and agent_discussions
-- tables. No new tables. Safe to re-run (uses IF NOT EXISTS everywhere).

-- agent_findings: extra columns AEO-Watch writes
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS dedup_key text;
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS url text;
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS summary text;
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS tags text[];
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS panel_verdict text;
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS panel_split boolean;
ALTER TABLE agent_findings ADD COLUMN IF NOT EXISTS panel_payload jsonb;

-- Unique constraint for safe dedup
CREATE UNIQUE INDEX IF NOT EXISTS agent_findings_dedup_unique
  ON agent_findings (agent, dedup_key);

-- Lookup index for the agent + recency query
CREATE INDEX IF NOT EXISTS agent_findings_agent_created
  ON agent_findings (agent, created_at DESC);

-- agent_discussions: panel vote storage
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS finding_id bigint;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS votes jsonb;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS tally jsonb;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS consensus text;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS split boolean;
ALTER TABLE agent_discussions ADD COLUMN IF NOT EXISTS cost_usd numeric;

CREATE INDEX IF NOT EXISTS agent_discussions_finding
  ON agent_discussions (finding_id);

-- agent_runs: ensure summary column exists for run metadata
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS summary jsonb;
