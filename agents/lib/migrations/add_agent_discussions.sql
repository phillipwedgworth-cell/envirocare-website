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

-- Enable Row Level Security. No policies are defined: the agents
-- connect using the service_role key (SUPABASE_KEY in Vercel), which
-- bypasses RLS by design. This blocks the anon key (browser-exposed)
-- from reading or writing the table.
--
-- DO NOT add a permissive "FOR ALL USING (true)" policy here — that
-- would make the table world-writable from any browser if anon ever
-- gets used. If you genuinely need browser access later, write a
-- narrow policy scoped to specific operations and rows.
ALTER TABLE agent_discussions ENABLE ROW LEVEL SECURITY;
