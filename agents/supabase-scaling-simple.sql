-- Run this first (no extensions needed).
-- agent_memory with pgvector is separate — see supabase-scaling-schema.sql.

CREATE TYPE IF NOT EXISTS task_status AS ENUM ('pending', 'claimed', 'done', 'failed');

CREATE TABLE IF NOT EXISTS agent_tasks (
  id            bigint generated always as identity primary key,
  agent_name    text not null,
  task_type     text not null,
  payload       jsonb not null default '{}',
  status        task_status not null default 'pending',
  priority      int not null default 5,
  created_by    text,
  created_at    timestamptz not null default now(),
  claimed_at    timestamptz,
  completed_at  timestamptz,
  error         text
);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON agent_tasks (status, priority, created_at);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent  ON agent_tasks (agent_name, status);

CREATE TABLE IF NOT EXISTS agent_costs (
  id            bigint generated always as identity primary key,
  agent_name    text not null,
  run_id        text,
  model         text not null,
  role          text not null default 'worker',
  input_tokens  int not null default 0,
  output_tokens int not null default 0,
  usd_cost      numeric(10,6) not null default 0,
  duration_ms   int,
  created_at    timestamptz not null default now()
);
CREATE INDEX IF NOT EXISTS idx_agent_costs_agent ON agent_costs (agent_name, created_at);
CREATE INDEX IF NOT EXISTS idx_agent_costs_date  ON agent_costs (created_at);

CREATE OR REPLACE VIEW agent_costs_daily AS
SELECT date_trunc('day', created_at) AS day, agent_name, model,
       SUM(input_tokens) AS input_tokens, SUM(output_tokens) AS output_tokens,
       SUM(usd_cost) AS usd_cost, COUNT(*) AS call_count
FROM agent_costs GROUP BY 1, 2, 3 ORDER BY 1 DESC, 4 DESC;

CREATE TABLE IF NOT EXISTS agent_artifacts (
  id            bigint generated always as identity primary key,
  agent_name    text not null,
  run_id        text,
  kind          text not null,
  filename      text not null,
  storage_path  text not null,
  url           text,
  metadata      jsonb not null default '{}',
  created_at    timestamptz not null default now()
);
CREATE INDEX IF NOT EXISTS idx_agent_artifacts_agent ON agent_artifacts (agent_name, created_at);
