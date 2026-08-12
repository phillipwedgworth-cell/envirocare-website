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
-- APPLIED 2026-08-11 to dyoujmyleihcpqgeifre ("Phillips Agents"), on Phillip's
-- explicit go-ahead. Verified two ways:
--   1. information_schema now reports impact_score/effort_score as `numeric`
--   2. a probe row inserting 9.5 / 7.5 succeeded and read back exactly; deleted after
--
-- Kept in the repo as the record of what was run. Do not re-run — it is idempotent
-- in effect but there is no reason to touch production DDL twice.
--
-- Prior note, left for context: this sat unapplied from 2026-08-09 because it is
-- production DDL and was deliberately reserved for a human rather than executed by
-- an agent as a side effect. Every seo-monitor finding scored 9.5/8.5/7.5 was
-- rejected for those two days and is not recoverable — the write failed, so the
-- finding was never stored anywhere.

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
