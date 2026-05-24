-- Migration: add CFO snapshot and brief tables
-- Run in Supabase SQL editor

create table if not exists cfo_snapshots (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  source text,
  period text,
  raw_json jsonb not null,
  normalized_json jsonb,
  note text
);

create index if not exists cfo_snapshots_created_at_idx
  on cfo_snapshots (created_at desc);

create table if not exists cfo_briefs (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  week_of date,
  claude_analysis text,
  gemini_analysis text,
  gpt_analysis text,
  synthesis text,
  flags jsonb,
  google_doc_url text,
  source text,
  snapshot_count int
);

create index if not exists cfo_briefs_created_at_idx
  on cfo_briefs (created_at desc);
