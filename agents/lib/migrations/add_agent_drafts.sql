-- agents/lib/migrations/add_agent_drafts.sql
-- Run this in Supabase SQL editor to create the ad draft workflow table.

create table if not exists agent_drafts (
  id text primary key,
  agent_name text not null,
  title text not null,
  body text not null,
  cta text not null,
  landing_url text not null,
  status text not null default 'pending-review',
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_agent_drafts_status on agent_drafts(status);
