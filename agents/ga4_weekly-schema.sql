-- Optional GA4 weekly table (only needed if you set GA4_WRITE_SUPABASE=1).
-- Run in Supabase → SQL Editor. The GSC tables already exist via
-- agents/supabase-seo-history-schema.sql; this just adds a GA4 mirror so GA4
-- trends could feed the agents later. Not required for the weekly report
-- (that reads monitoring/ga4-latest.json).

create table if not exists ga4_weekly (
  id               bigint generated always as identity primary key,
  period_end       date not null,
  site             text not null default 'envirocarellc.com',
  sessions         int  not null default 0,
  users            int  not null default 0,
  engaged_sessions int  not null default 0,
  conversions      int  not null default 0,
  payload          jsonb,                       -- full report snapshot
  loaded_at        timestamptz not null default now(),
  unique (period_end, site)                     -- idempotent re-runs
);
