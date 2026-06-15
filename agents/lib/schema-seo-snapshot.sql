-- EnviroCare — SEO ranking snapshots + weekly digests
-- Run once in Supabase dashboard → SQL Editor.
-- Feeds: app/api/seo-monitor/run (writes) + command-center "Ranking Snapshots" / "Weekly Digests" (reads).

-- ── seo_metrics: one row per (campaign, keyword, run) from Local Falcon ───────
create table if not exists seo_metrics (
  id           bigint generated always as identity primary key,
  location     text not null,          -- 'Huntsville' | 'Birmingham/Alabaster' | 'Lake Martin/Alex City'
  keyword      text not null,
  campaign_key text not null,          -- Local Falcon campaign report_key
  arp          numeric(6,2),           -- Average Rank Position
  atrp         numeric(6,2),           -- Average Total Rank Position
  solv         numeric(5,2),           -- Share of Local Voice %
  run_date     date not null,          -- Local Falcon campaign run date
  source       text not null default 'local_falcon',
  captured_at  timestamptz not null default now(),
  unique (campaign_key, keyword, run_date)   -- upsert key: reruns dedupe
);
create index if not exists seo_metrics_rundate_idx on seo_metrics (run_date desc, location);

-- ── seo_digests: each weekly plain-English digest, kept for history ───────────
create table if not exists seo_digests (
  id           bigint generated always as identity primary key,
  run_date     date not null,
  summary_text text not null,
  rows_json    jsonb,
  created_at   timestamptz not null default now()
);
create index if not exists seo_digests_rundate_idx on seo_digests (run_date desc, created_at desc);

-- ── RLS: service role full access, anon blocked (matches the other agent tables)
alter table seo_metrics enable row level security;
alter table seo_digests enable row level security;
