-- agents/sql/0005-fleet-top-form.sql
-- Sep 4 2026 (jsonb fix Sep 5). ALREADY RUN Sep 5 2026 for sections (a)(b)(c)(e) via Claude MCP —
-- idempotent, safe to re-run. Section (d) site-reviewer unpause is the only part still
-- pending: run this whole file once AFTER the code merges.
-- Run once in Supabase SQL editor (project dyoujmyleihcpqgeifre)
-- or via Claude Code's direct write access. Idempotent.
--
-- Makes two recurring failures structurally impossible:
--   (a) agent_costs.cost_usd = 0 while usd_cost holds the value (or vice versa)
--   (b) agent_runs rows with started_at NULL (invisible to started_at filters)
-- and unpauses site-reviewer now that the duplicate-findings fix has shipped.

-- (a) cost columns: backfill, then keep in sync forever
UPDATE agent_costs SET cost_usd = usd_cost WHERE (cost_usd IS NULL OR cost_usd = 0) AND usd_cost > 0;
UPDATE agent_costs SET usd_cost = cost_usd WHERE (usd_cost IS NULL OR usd_cost = 0) AND cost_usd > 0;
-- rows where both are 0/NULL: compute from tokens at the current rate card
UPDATE agent_costs SET cost_usd = ROUND((
    (COALESCE(input_tokens,0)::numeric / 1e6) * CASE
      WHEN model LIKE 'claude-opus%'   THEN 15.00
      WHEN model LIKE 'claude-sonnet%' THEN  3.00
      WHEN model LIKE 'claude-haiku%'  THEN  0.80
      ELSE 3.00 END
  + (COALESCE(output_tokens,0)::numeric / 1e6) * CASE
      WHEN model LIKE 'claude-opus%'   THEN 75.00
      WHEN model LIKE 'claude-sonnet%' THEN 15.00
      WHEN model LIKE 'claude-haiku%'  THEN  4.00
      ELSE 15.00 END
  )::numeric, 6)
WHERE COALESCE(cost_usd,0) = 0 AND COALESCE(usd_cost,0) = 0 AND (COALESCE(input_tokens,0) + COALESCE(output_tokens,0)) > 0;
UPDATE agent_costs SET usd_cost = cost_usd WHERE COALESCE(usd_cost,0) = 0 AND cost_usd > 0;

CREATE OR REPLACE FUNCTION agent_costs_sync_cost() RETURNS trigger AS $$
BEGIN
  IF COALESCE(NEW.cost_usd,0) = 0 AND COALESCE(NEW.usd_cost,0) > 0 THEN NEW.cost_usd := NEW.usd_cost; END IF;
  IF COALESCE(NEW.usd_cost,0) = 0 AND COALESCE(NEW.cost_usd,0) > 0 THEN NEW.usd_cost := NEW.cost_usd; END IF;
  RETURN NEW;
END $$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_agent_costs_sync_cost ON agent_costs;
CREATE TRIGGER trg_agent_costs_sync_cost BEFORE INSERT OR UPDATE ON agent_costs
  FOR EACH ROW EXECUTE FUNCTION agent_costs_sync_cost();

-- (b) run rows always dated
UPDATE agent_runs SET started_at = created_at WHERE started_at IS NULL AND created_at IS NOT NULL;
UPDATE agent_runs SET ended_at = COALESCE(ended_at, created_at) WHERE ended_at IS NULL AND status NOT IN ('running');
UPDATE agent_runs SET agent = agent_name WHERE agent IS NULL AND agent_name IS NOT NULL;

CREATE OR REPLACE FUNCTION agent_runs_stamp() RETURNS trigger AS $$
BEGIN
  NEW.created_at := COALESCE(NEW.created_at, now());
  NEW.started_at := COALESCE(NEW.started_at, NEW.created_at);
  NEW.agent      := COALESCE(NEW.agent, NEW.agent_name);
  NEW.agent_name := COALESCE(NEW.agent_name, NEW.agent);
  IF NEW.status IS DISTINCT FROM 'running' AND NEW.ended_at IS NULL THEN NEW.ended_at := now(); END IF;
  RETURN NEW;
END $$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trg_agent_runs_stamp ON agent_runs;
CREATE TRIGGER trg_agent_runs_stamp BEFORE INSERT ON agent_runs
  FOR EACH ROW EXECUTE FUNCTION agent_runs_stamp();

-- (c) close the three aeo-watch 'running' rows that crashed without finalizing
-- NOTE: agent_runs.summary is jsonb — cast the text (Sep 5 2026 fix; first run failed on this line).
UPDATE agent_runs SET status = 'failed', ended_at = now(),
  summary = to_jsonb('closed by 0005 migration: run never finalized (crash before endRun; failRun handler added Sep 4 2026)'::text)
WHERE status = 'running' AND COALESCE(started_at, created_at) < now() - interval '6 hours';

-- (d) site-reviewer: dedup fix shipped in agents/site-reviewer.mjs → unpause
UPDATE agent_registry SET status = 'active', updated_at = now(),
  muted_reason = 'Unpaused 2026-09-04: within-run dedup on label-stripped text; HIGH now files as warning.'
WHERE agent_name = 'site-reviewer';

-- (e) the false Alex City "0" citation score from 2026-09-03 must not stand as the prior
DELETE FROM agent_state WHERE key = 'brightlocal:score:Alex City' AND (value->>'score')::int = 0;
