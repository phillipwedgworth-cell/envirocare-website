-- ─── CLAUDE CODE: RUN THIS IN SUPABASE ───
-- Repo: phillipwedgworth-cell/envirocare-website (data layer)
-- Where: Supabase → SQL Editor → paste + run.
-- Purpose: Store Google Ads campaign-level data (Scorpion era + beyond)
--          so agents can compare paid vs organic performance over time.
-- ──────────────────────────────────────────

create table if not exists gads_campaigns (
  id              bigint generated always as identity primary key,
  campaign        text not null,
  network         text,
  status          text,
  campaign_type   text,
  budget          numeric(10,2),
  clicks          int  not null default 0,
  impressions     int  not null default 0,
  interactions    int  not null default 0,
  cost            numeric(10,2),
  avg_cpc         numeric(10,4),
  conversions     numeric(8,2),
  conv_rate       numeric(6,4),
  cost_per_conv   numeric(10,2),
  bid_strategy    text,
  snapshot_label  text not null,
  snapshot_date   date not null,
  date_start      date,
  date_end        date,
  loaded_at       timestamptz not null default now(),
  unique (campaign, network, snapshot_label)
);

create index if not exists idx_gads_campaigns_label on gads_campaigns (snapshot_label);
create index if not exists idx_gads_campaigns_clicks on gads_campaigns (clicks desc);
