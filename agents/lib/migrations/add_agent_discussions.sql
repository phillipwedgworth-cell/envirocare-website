-- agents/lib/migrations/add_agent_discussions.sql
-- Run this once against your Supabase project to create the cross-agent discussion table.

CREATE TABLE IF NOT EXISTS agent_discussions (
  id                   uuid            default gen_random_uuid() primary key,
  agent_name           text            not null,
  references_agent     text,           -- which agent this message is responding to
  references_finding_id uuid,          -- specific finding_id from agent_findings (optional)
  message              text            not null,
  impact_score         int,            -- 1-10: how much revenue/ranking impact if we act
  effort_score         int,            -- 1-10: how hard to implement (lower = easier)
  created_at           timestamptz     default now()
);

-- Index for efficient querying by recency and agent
CREATE INDEX IF NOT EXISTS agent_discussions_agent_name_idx ON agent_discussions (agent_name);
CREATE INDEX IF NOT EXISTS agent_discussions_created_at_idx ON agent_discussions (created_at DESC);

-- Enable Row Level Security (disable anon read if you want to lock down)
ALTER TABLE agent_discussions ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (used by agents via SUPABASE_KEY)
CREATE POLICY IF NOT EXISTS "service_full_access" ON agent_discussions
  FOR ALL USING (true) WITH CHECK (true);
