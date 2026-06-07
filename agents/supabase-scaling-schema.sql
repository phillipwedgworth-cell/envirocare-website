-- ─── CLAUDE CODE: RUN THIS IN SUPABASE ───
-- Repo: phillipwedgworth-cell/envirocare-website
-- Where: Supabase → SQL Editor → paste + run
-- Purpose: Scaling layer — long-term agent memory, task queue, cost tracking,
--          artifact references. Run AFTER supabase-seo-history-schema.sql.
-- ──────────────────────────────────────────

-- pgvector: enables embedding storage (long-term agent memory)
-- If this line errors, enable the vector extension in Supabase:
--   Dashboard → Database → Extensions → search "vector" → enable
CREATE EXTENSION IF NOT EXISTS vector;

-- ── agent_memory ────────────────────────────────────────────────────────────
-- Long-term recall. Agents store embeddings of findings so next run they can
-- ask "have I seen this before?" instead of rediscovering the same issue.
-- Dimension 1536 = OpenAI text-embedding-3-small / ada-002 compatible.
CREATE TABLE IF NOT EXISTS agent_memory (
  id            bigint generated always as identity primary key,
  agent_name    text not null,
  memory_type   text not null default 'finding',  -- 'finding' | 'decision' | 'fact'
  content       text not null,                    -- human-readable summary
  embedding     vector(1536),                     -- semantic search vector
  metadata      jsonb not null default '{}',
  created_at    timestamptz not null default now(),
  expires_at    timestamptz                        -- null = never expires
);

CREATE INDEX IF NOT EXISTS idx_agent_memory_agent    ON agent_memory (agent_name);
CREATE INDEX IF NOT EXISTS idx_agent_memory_type     ON agent_memory (memory_type);
-- Cosine similarity index for semantic search (IVFFlat, tune lists= as data grows)
CREATE INDEX IF NOT EXISTS idx_agent_memory_embedding
  ON agent_memory USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);

-- ── agent_tasks ─────────────────────────────────────────────────────────────
-- Async task queue. Agents drop tasks here; orchestrator picks them up.
-- Lets you scale to dozens of agents without hardcoding run order.
CREATE TYPE IF NOT EXISTS task_status AS ENUM ('pending', 'claimed', 'done', 'failed');

CREATE TABLE IF NOT EXISTS agent_tasks (
  id            bigint generated always as identity primary key,
  agent_name    text not null,          -- which agent should pick this up
  task_type     text not null,          -- e.g. 'scrape_url', 'send_digest', 'run_scan'
  payload       jsonb not null default '{}',
  status        task_status not null default 'pending',
  priority      int not null default 5, -- 1 = highest
  created_by    text,                   -- agent that queued this task
  created_at    timestamptz not null default now(),
  claimed_at    timestamptz,
  completed_at  timestamptz,
  error         text                    -- populated on failure
);

CREATE INDEX IF NOT EXISTS idx_agent_tasks_status    ON agent_tasks (status, priority, created_at);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent     ON agent_tasks (agent_name, status);

-- ── agent_costs ─────────────────────────────────────────────────────────────
-- Every LLM call logs tokens + cost + agent. When your Anthropic bill jumps,
-- you know exactly which agent did it.
CREATE TABLE IF NOT EXISTS agent_costs (
  id            bigint generated always as identity primary key,
  agent_name    text not null,
  run_id        text,                   -- uuid or timestamp, groups calls in one run
  model         text not null,
  role          text not null default 'worker',  -- 'worker' | 'critic'
  input_tokens  int not null default 0,
  output_tokens int not null default 0,
  usd_cost      numeric(10,6) not null default 0,
  duration_ms   int,
  created_at    timestamptz not null default now()
);

CREATE INDEX IF NOT EXISTS idx_agent_costs_agent     ON agent_costs (agent_name, created_at);
CREATE INDEX IF NOT EXISTS idx_agent_costs_run       ON agent_costs (run_id);
CREATE INDEX IF NOT EXISTS idx_agent_costs_date      ON agent_costs (created_at);

-- Convenience view: daily cost by agent
CREATE OR REPLACE VIEW agent_costs_daily AS
SELECT
  date_trunc('day', created_at) AS day,
  agent_name,
  model,
  SUM(input_tokens)  AS input_tokens,
  SUM(output_tokens) AS output_tokens,
  SUM(usd_cost)      AS usd_cost,
  COUNT(*)           AS call_count
FROM agent_costs
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 4 DESC;

-- ── agent_artifacts ─────────────────────────────────────────────────────────
-- References to files stored in Supabase Storage bucket "agent-artifacts".
-- Screenshots, PDFs, scan exports — agents reference each other's outputs.
-- NOTE: Create the Storage bucket manually:
--   Supabase Dashboard → Storage → New bucket → name: "agent-artifacts" → private
CREATE TABLE IF NOT EXISTS agent_artifacts (
  id            bigint generated always as identity primary key,
  agent_name    text not null,
  run_id        text,
  kind          text not null,   -- 'screenshot' | 'pdf' | 'csv' | 'json' | 'html'
  filename      text not null,
  storage_path  text not null,   -- path inside agent-artifacts bucket
  url           text,            -- signed URL (optional cache, expires)
  metadata      jsonb not null default '{}',
  created_at    timestamptz not null default now()
);

CREATE INDEX IF NOT EXISTS idx_agent_artifacts_agent ON agent_artifacts (agent_name, created_at);
CREATE INDEX IF NOT EXISTS idx_agent_artifacts_kind  ON agent_artifacts (kind);
