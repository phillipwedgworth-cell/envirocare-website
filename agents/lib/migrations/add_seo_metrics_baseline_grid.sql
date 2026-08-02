-- EnviroCare — seo_metrics: record the Local Falcon grid epoch on every row
-- Run once in Supabase dashboard → SQL Editor.
--
-- WHY: agents/seo-snapshot.mjs (v3 fix, 2026-07-23) now writes `baseline` and
-- `grid` with each keyword row so a consumer can tell which grid geometry a
-- reading came from. SoLV is the share of grid points where the business shows
-- in the local pack, so widening the grid drops SoLV without any ranking change
-- (Birmingham read 53.86% on v2 5x5@15mi and 2.71% on v3 9x9@20mi — same
-- business, different denominator). Without these columns a week-over-week join
-- silently compares across the break and reports a collapse that never happened.
--
-- These columns are REQUIRED by the current seo-snapshot.mjs: PostgREST rejects
-- an insert naming unknown columns (PGRST204) and the agent throws on upsert
-- error, so the snapshot fails outright until this migration is applied.

alter table seo_metrics add column if not exists baseline text;
alter table seo_metrics add column if not exists grid     text;

comment on column seo_metrics.baseline is
  'Grid epoch, e.g. ''v3''. Bump when campaign geometry changes; never compare SoLV across baselines.';
comment on column seo_metrics.grid is
  'Local Falcon grid dimensions for the run, e.g. ''9x9''.';

-- Existing rows predate the v3 campaigns and came from the v2 5x5 @ 15mi grid.
update seo_metrics set baseline = 'v2', grid = '5x5' where baseline is null;

create index if not exists seo_metrics_baseline_idx on seo_metrics (baseline, run_date desc);
