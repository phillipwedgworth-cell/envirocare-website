-- EnviroCare social + local content queue.
-- Run once in the Supabase SQL editor. Drives agents/social-poster.mjs and the
-- Command Center "Social & Local" panel.

create table if not exists social_posts (
  id            text primary key,               -- stable id (e.g. calendar id + run date)
  location      text not null,                  -- huntsville | birmingham | lake_martin
  platform      text not null,                  -- google | facebook | instagram
  post_type     text,                           -- offer | whats_new | engagement | brand
  headline      text,
  body          text not null,
  cta           text,
  graphic_url   text,                            -- optional image URL (Canva export / /public asset)
  scheduled_for timestamptz not null,
  status        text not null default 'draft',  -- draft | approved | posted | failed | skipped
  external_id   text,                            -- id returned by Meta/Google after posting
  permalink     text,                            -- link to the live post
  engagement    jsonb default '{}'::jsonb,       -- likes/clicks/views pulled back later
  error         text,
  posted_at     timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists social_posts_due_idx
  on social_posts (status, scheduled_for);
create index if not exists social_posts_location_idx
  on social_posts (location, scheduled_for desc);
