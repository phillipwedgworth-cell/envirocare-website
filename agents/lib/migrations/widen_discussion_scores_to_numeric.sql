-- Widen agent_discussions score columns from integer to numeric.
--
-- WHY: agents/seo-monitor.mjs writes half-point scores (9.5, 8.5, 7.5). Both
-- columns are `integer`, so every writeDiscussion call from that agent failed:
--
--     [seo-monitor] writeDiscussion: invalid input syntax for type integer: "9.5"
--
-- Observed 3 times on 2026-08-06 via Vercel runtime errors. The half-point
-- granularity is deliberate -- the scoring scale intends it -- so the COLUMN is
-- wrong, not the value. Rounding at the call site would silently discard the
-- precision the scale was designed around.
--
-- SAFETY: integer -> numeric is a widening conversion. Every existing value is
-- preserved exactly; no rows are rewritten lossily and nothing needs backfilling.
-- Postgres can do this without a table rewrite in recent versions, but on a table
-- this small it does not matter either way.
--
-- NOT YET APPLIED as of 2026-08-09. This is production DDL on the live project
-- (dyoujmyleihcpqgeifre, "Phillips Agents"), so it is left for a human to run
-- deliberately rather than executed by an agent as a side effect.
--
-- To apply:
--   Supabase dashboard -> SQL Editor -> paste -> Run
--   or: mcp apply_migration(project_id="dyoujmyleihcpqgeifre", name="widen_discussion_scores_to_numeric")

alter table public.agent_discussions
  alter column impact_score type numeric using impact_score::numeric;

alter table public.agent_discussions
  alter column effort_score type numeric using effort_score::numeric;

-- Verify:
--   select column_name, data_type
--   from information_schema.columns
--   where table_schema='public' and table_name='agent_discussions'
--     and column_name in ('impact_score','effort_score');
--   -- expect: numeric, numeric
