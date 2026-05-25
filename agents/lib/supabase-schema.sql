-- EnviroCare agents — Supabase schema
-- Run this once in Supabase dashboard → SQL Editor
-- https://supabase.com/dashboard/project/<project-ref>/sql

-- ── 1. Agent state (key-value store for agent memory) ─────────────────────────
create table if not exists agent_state (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

-- ── 2. Agent run log ──────────────────────────────────────────────────────────
create table if not exists agent_runs (
  id          bigint generated always as identity primary key,
  agent_name  text not null,
  status      text not null,          -- 'ok' | 'error' | 'escalated'
  output      text,
  created_at  timestamptz not null default now()
);
create index if not exists agent_runs_name_idx on agent_runs (agent_name, created_at desc);

-- ── 3. EnviroCare SEO snapshots (Local Falcon data) ──────────────────────────
create table if not exists envirocare_seo (
  id             bigint generated always as identity primary key,
  location       text not null,        -- 'Alabaster' | 'Alex City' | 'Huntsville'
  keyword        text,
  solv           numeric(5,2),         -- Share of Local Voice %
  arp            numeric(6,2),         -- Average Rank Position
  review_count   integer,
  snapshot_date  date not null default current_date
);
create index if not exists envirocare_seo_loc_date_idx on envirocare_seo (location, snapshot_date desc);

-- ── 4. Agent findings (site-auditor, competitor-watcher, content/design advisors) ─
create table if not exists agent_findings (
  id          bigint generated always as identity primary key,
  agent_name  text not null,
  category    text not null,   -- 'seo' | 'performance' | 'design' | 'content' | 'competitor'
  severity    text not null default 'info',  -- 'info' | 'warning' | 'critical'
  page_url    text,
  finding     text not null,
  details     jsonb,
  run_date    timestamptz not null default now()
);
create index if not exists agent_findings_agent_date_idx on agent_findings (agent_name, run_date desc);
create index if not exists agent_findings_category_idx on agent_findings (category, run_date desc);

-- ── 5. Morning brief archive ──────────────────────────────────────────────────
create table if not exists morning_brief (
  id          bigint generated always as identity primary key,
  brief_date  date not null unique,
  content     text not null,
  sent_at     timestamptz not null default now()
);

-- ── 6. CFO snapshots + briefs ─────────────────────────────────────────────────
create table if not exists cfo_snapshots (
  id            bigint generated always as identity primary key,
  snapshot_date timestamptz not null default now(),
  metrics       jsonb not null,
  note          text,
  created_at    timestamptz not null default now()
);
create index if not exists cfo_snapshots_date_idx on cfo_snapshots (snapshot_date desc);

create table if not exists cfo_briefs (
  id          bigint generated always as identity primary key,
  agent_name  text not null default 'CFO Agent',
  brief       text not null,
  details     jsonb,
  run_date    timestamptz not null default now()
);
create index if not exists cfo_briefs_run_date_idx on cfo_briefs (run_date desc);

-- ── RLS: allow service role full access (anon blocked) ───────────────────────
alter table agent_state    enable row level security;
alter table agent_runs     enable row level security;
alter table envirocare_seo enable row level security;
alter table agent_findings enable row level security;
alter table morning_brief  enable row level security;
alter table cfo_snapshots  enable row level security;
alter table cfo_briefs     enable row level security;
