-- 0010-content-refresh-ledger.sql — memory for the content-refresh agent.
--
-- One row per page per attempt. This is what stops the fleet doing the same work
-- twice: before touching a page the agent reads the newest row for that route and
-- skips it inside the cool-down (28 days by default), skips pages already in the
-- NeuronWriter 70-80 band, and never re-proposes copy that was rejected for the
-- same reason. Lessons (what lifted a score, what got rejected) also go to
-- agent_memory via agents/lib/memory.mjs so the next draft prompt can use them.
--
-- Additive and idempotent. RLS on with no policies = service-role only, the same
-- pattern as agent_runs / agent_costs.

create table if not exists public.content_refresh_ledger (
  id              bigint generated always as identity primary key,
  route           text        not null,
  keyword         text,
  query_id        text,
  status          text        not null check (status in ('in-band','proposed','published','rejected','error','measured')),
  score_before    integer,
  score_after     integer,
  words_added     integer,
  competitor_overlap numeric,
  site_overlap    numeric,
  competitors_checked integer,
  image_src       text,
  reason          text,
  pr_url          text,
  run_id          text,
  source          text        not null default 'content-refresh-agent',
  created_at      timestamptz not null default now()
);

create index if not exists content_refresh_ledger_route_created
  on public.content_refresh_ledger (route, created_at desc);

alter table public.content_refresh_ledger enable row level security;

comment on table public.content_refresh_ledger is
  'content-refresh agent memory: one row per page per attempt (scores, originality, outcome). Read before every run so pages are not reworked inside the cool-down.';
