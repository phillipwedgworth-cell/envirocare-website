-- Migration: add agent_findings table
-- Run in Supabase dashboard → SQL Editor
-- https://supabase.com/dashboard/project/<project-ref>/sql

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

create index if not exists agent_findings_agent_date_idx
  on agent_findings (agent_name, run_date desc);

create index if not exists agent_findings_category_idx
  on agent_findings (category, run_date desc);

alter table agent_findings enable row level security;
