-- ─────────────────────────────────────────────────────────────────────────────
-- EnviroCare SEO ingest tables
-- Matches: agents/ingest-gsc.mjs (gsc_daily, gsc_queries, gsc_pages, seo_snapshots)
--          agents/ingest-ga4.mjs (ga4_weekly — optional)
-- Idempotent + non-destructive: IF NOT EXISTS everywhere, no DROP. Safe to re-run.
-- Run in: Supabase project dyoujmyleihcpqgeifre → SQL Editor → New query → Run.
-- Verified column/onConflict match against ingest-gsc.mjs (2026-06-22).
-- ─────────────────────────────────────────────────────────────────────────────

-- 1) Daily GSC totals — code upserts onConflict (date, domain)
create table if not exists public.gsc_daily (
  id          bigserial primary key,
  date        date    not null,
  clicks      integer not null default 0,
  impressions integer not null default 0,
  ctr         numeric not null default 0,
  position    numeric not null default 0,
  domain      text    not null,
  created_at  timestamptz not null default now()
);
create unique index if not exists gsc_daily_date_domain_key on public.gsc_daily (date, domain);

-- 2) GSC queries per snapshot — onConflict (query, snapshot_label)
create table if not exists public.gsc_queries (
  id             bigserial primary key,
  query          text    not null,
  clicks         integer not null default 0,
  impressions    integer not null default 0,
  ctr            numeric not null default 0,
  position       numeric not null default 0,
  snapshot_label text    not null,
  snapshot_date  date,
  created_at     timestamptz not null default now()
);
create unique index if not exists gsc_queries_query_label_key on public.gsc_queries (query, snapshot_label);

-- 3) GSC pages per snapshot — onConflict (page, snapshot_label)
create table if not exists public.gsc_pages (
  id             bigserial primary key,
  page           text    not null,
  clicks         integer not null default 0,
  impressions    integer not null default 0,
  ctr            numeric not null default 0,
  position       numeric not null default 0,
  snapshot_label text    not null,
  snapshot_date  date,
  created_at     timestamptz not null default now()
);
create unique index if not exists gsc_pages_page_label_key on public.gsc_pages (page, snapshot_label);

-- 4) Snapshot registry — onConflict (label, source)
create table if not exists public.seo_snapshots (
  id         bigserial primary key,
  label      text    not null,
  domain     text,
  source     text    not null,
  date_start date,
  date_end   date,
  row_count  integer,
  created_at timestamptz not null default now()
);
create unique index if not exists seo_snapshots_label_source_key on public.seo_snapshots (label, source);

-- 5) GA4 weekly — OPTIONAL (only used if GA4_WRITE_SUPABASE=1; workflow doesn't set it).
--    Harmless to create now; future-proofs Supabase GA4 writes. onConflict (period_end, site)
create table if not exists public.ga4_weekly (
  id               bigserial primary key,
  period_end       date    not null,
  site             text    not null,
  sessions         integer not null default 0,
  users            integer not null default 0,
  engaged_sessions integer not null default 0,
  conversions      integer not null default 0,
  payload          jsonb,
  created_at       timestamptz not null default now()
);
create unique index if not exists ga4_weekly_period_site_key on public.ga4_weekly (period_end, site);
