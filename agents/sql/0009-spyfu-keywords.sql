-- 0009 — spyfu_keywords: SpyFu exports as fleet input (2026-10-11)
--
-- SpyFu lives in ChatGPT and the SpyFu web app; nothing in the fleet read it.
-- Its one thing Search Console here cannot give is the RANKING URL per keyword
-- (gsc_queries has no page column), i.e. which page Google picked. Loaded by
-- agents/spyfu-load.mjs from a CSV export; read by keyword-opportunity.
--
-- Additive only. Safe to re-run (IF NOT EXISTS). Undo: DROP TABLE spyfu_keywords;
create table if not exists public.spyfu_keywords (
  id                 bigserial primary key,
  keyword            text        not null,          -- lower-cased, trimmed
  rank               integer,                       -- SpyFu organic rank; null = not ranked
  rank_change        integer,
  ranking_url        text,                          -- page SpyFu saw ranking (Organic Keywords export only)
  search_volume      integer,
  keyword_difficulty integer,
  cpc                numeric,
  est_clicks         integer,
  export_kind        text        not null,          -- 'organic_keywords' | 'tracked_keywords'
  export_date        date        not null,          -- SpyFu export date, not load date
  source_file        text,
  loaded_at          timestamptz not null default now(),
  unique (keyword, export_kind, export_date)
);
create index if not exists spyfu_keywords_keyword_date on public.spyfu_keywords (keyword, export_date desc);

alter table public.spyfu_keywords enable row level security;
-- No policies: service-role only (the fleet), same as the other agent tables.

-- Registered PAUSED like captivated-send: it is manual-only, so the watchdog must
-- not expect a cadence. Its runs still land in agent_runs for the audit trail.
insert into public.agent_registry (agent_name, description, status, expected_cadence_hours, muted_reason)
values ('spyfu-load', 'Manual loader: SpyFu CSV export -> spyfu_keywords. Read by keyword-opportunity.', 'paused', null,
        'Manual only (run after each SpyFu export). Paused so the watchdog expects no schedule.')
on conflict (agent_name) do nothing;
