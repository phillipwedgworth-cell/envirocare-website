-- ─── CLAUDE CODE: RUN THIS IN SUPABASE ───
-- Repo: phillipwedgworth-cell/envirocare-website (data layer)
-- Where: Supabase → SQL Editor → paste + run. Or psql against the project.
-- Purpose: Store GSC + Scorpion-era historical SEO data so the agents can
--          compare each fresh pull against history (trends), instead of
--          starting cold every run.
-- ──────────────────────────────────────────

-- Registry of every import, so agents know what snapshots exist and their range.
create table if not exists seo_snapshots (
  id            bigint generated always as identity primary key,
  label         text not null,                 -- e.g. 'gsc-16mo-2026-05'
  domain        text not null default 'envirocarellc.com',
  source        text not null default 'gsc',   -- 'gsc' | 'scorpion-ads' | 'ga4'
  date_start    date,
  date_end      date,
  row_count     int,
  loaded_at     timestamptz not null default now(),
  unique (label, source)
);

-- Daily organic performance over time (from Chart.csv — ~16 months of dailies).
create table if not exists gsc_daily (
  id            bigint generated always as identity primary key,
  date          date not null,
  clicks        int  not null default 0,
  impressions   int  not null default 0,
  ctr           numeric(6,4),                  -- store as fraction, e.g. 0.0123
  position      numeric(6,2),
  domain        text not null default 'envirocarellc.com',
  loaded_at     timestamptz not null default now(),
  unique (date, domain)                        -- idempotent re-imports
);

-- Query-level snapshot (from Queries.csv). snapshot_label ties rows to an import.
create table if not exists gsc_queries (
  id            bigint generated always as identity primary key,
  query         text not null,
  clicks        int  not null default 0,
  impressions   int  not null default 0,
  ctr           numeric(6,4),
  position      numeric(6,2),
  snapshot_label text not null,
  snapshot_date  date not null,
  loaded_at     timestamptz not null default now(),
  unique (query, snapshot_label)
);

-- Page-level snapshot (from Pages.csv).
create table if not exists gsc_pages (
  id            bigint generated always as identity primary key,
  page          text not null,
  clicks        int  not null default 0,
  impressions   int  not null default 0,
  ctr           numeric(6,4),
  position      numeric(6,2),
  snapshot_label text not null,
  snapshot_date  date not null,
  loaded_at     timestamptz not null default now(),
  unique (page, snapshot_label)
);

-- Device + country breakdowns (small, optional but cheap to keep).
create table if not exists gsc_dimensions (
  id            bigint generated always as identity primary key,
  dimension     text not null,                 -- 'device' | 'country'
  value         text not null,                 -- e.g. 'MOBILE', 'usa'
  clicks        int  not null default 0,
  impressions   int  not null default 0,
  ctr           numeric(6,4),
  position      numeric(6,2),
  snapshot_label text not null,
  loaded_at     timestamptz not null default now(),
  unique (dimension, value, snapshot_label)
);

-- Helpful indexes for the agents' trend queries.
create index if not exists idx_gsc_daily_date       on gsc_daily (date);
create index if not exists idx_gsc_queries_label     on gsc_queries (snapshot_label);
create index if not exists idx_gsc_queries_impr      on gsc_queries (impressions desc);
create index if not exists idx_gsc_pages_label       on gsc_pages (snapshot_label);
create index if not exists idx_gsc_pages_impr        on gsc_pages (impressions desc);

-- Convenience view: "high impressions, low clicks" opportunity list the agents read.
create or replace view gsc_opportunities as
select page, impressions, clicks, position, snapshot_label
from gsc_pages
where impressions > 5000 and clicks < 25
order by impressions desc;
