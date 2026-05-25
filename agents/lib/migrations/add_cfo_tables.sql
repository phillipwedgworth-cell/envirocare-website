-- Migration: add CFO snapshot + brief tables
-- Run in Supabase dashboard → SQL Editor
-- https://supabase.com/dashboard/project/<project-ref>/sql

create table if not exists cfo_snapshots (
  id           bigint generated always as identity primary key,
  snapshot_date timestamptz not null default now(),
  metrics      jsonb not null,
  note         text,
  created_at   timestamptz not null default now()
);

create index if not exists cfo_snapshots_date_idx
  on cfo_snapshots (snapshot_date desc);

create table if not exists cfo_briefs (
  id           bigint generated always as identity primary key,
  agent_name   text not null default 'CFO Agent',
  brief        text not null,
  details      jsonb,
  run_date     timestamptz not null default now()
);

create index if not exists cfo_briefs_run_date_idx
  on cfo_briefs (run_date desc);

alter table cfo_snapshots enable row level security;
alter table cfo_briefs enable row level security;
