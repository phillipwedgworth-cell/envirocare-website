-- Drop and recreate gads_campaigns with correct columns
DROP TABLE IF EXISTS gads_campaigns;

CREATE TABLE gads_campaigns (
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

CREATE INDEX idx_gads_campaigns_label  ON gads_campaigns (snapshot_label);
CREATE INDEX idx_gads_campaigns_clicks ON gads_campaigns (clicks desc);
