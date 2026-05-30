-- Migration: add agent_state table
-- Run in Supabase dashboard → SQL Editor
-- https://supabase.com/dashboard/project/<project-ref>/sql
--
-- Used by agents/lib/kv.mjs for cross-run state (week-over-week deltas,
-- last-seen SoLV, last-seen citation score, etc.). Without this table,
-- every Monday run sees "no prior data" and deltas can't be computed.

create table if not exists agent_state (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

create index if not exists agent_state_updated_at_idx
  on agent_state (updated_at desc);

alter table agent_state enable row level security;
