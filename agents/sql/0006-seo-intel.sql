-- agents/sql/0006-seo-intel.sql — Sep 5 2026. Run once after the code merges. Idempotent.
CREATE TABLE IF NOT EXISTS lf_visibility (
  id              bigserial PRIMARY KEY,
  campaign_key    text NOT NULL,
  campaign_name   text,
  market          text NOT NULL,
  place_id        text,
  platform        text NOT NULL,            -- google | apple | chatgpt | gaio | aimode | gemini | grok | 'a+b' aggregate
  keyword         text NOT NULL,
  run_date        date NOT NULL,
  grid_baseline   text NOT NULL,            -- e.g. '9x9-20mi'. NEVER compare rows with different baselines.
  solv            numeric,                  -- Maps share of local voice (0-100)
  saiv            numeric,                  -- AI share of voice (0-100)
  arp             numeric,
  atrp            numeric,
  top_competitors jsonb,                    -- [{place_id,name,score}] top 5 for this scan
  report_key      text,                     -- transient provenance only; scan reports retire
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (campaign_key, platform, keyword, run_date)
);
CREATE INDEX IF NOT EXISTS lf_visibility_market_run ON lf_visibility (market, platform, run_date DESC);
ALTER TABLE lf_visibility ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS lf_visibility_service ON lf_visibility;
CREATE POLICY lf_visibility_service ON lf_visibility FOR ALL TO service_role USING (true) WITH CHECK (true);

INSERT INTO agent_registry (agent_name, description, status, expected_cadence_hours)
VALUES
  ('local-falcon-ingest', 'Reads every scheduled Local Falcon campaign report (Maps + AI) into lf_visibility with grid baseline and top-5 competitors. 0 scan credits.', 'active', 96),
  ('competitor-watcher',  'In-repo replacement for the laptop crew agent (dark since 2026-08-21). SoLV/SAIV gaps, drops, and competitor surges per market; one Sonnet digest per run.', 'active', 96),
  ('keyword-opportunity', 'Striking-distance GSC queries (pos 6-20) scored by impressions, mapped to target pages, one Sonnet plan per run. First reader of gsc_queries.', 'active', 96)
ON CONFLICT (agent_name) DO UPDATE SET description = EXCLUDED.description, status = 'active', expected_cadence_hours = EXCLUDED.expected_cadence_hours, updated_at = now();

-- Retire the Title-Case crew duplicate so the watchdog stops expecting it from the laptop.
UPDATE agent_registry SET status = 'paused', muted_reason = 'Replaced by in-repo competitor-watcher 2026-09-05', updated_at = now() WHERE agent_name = 'Competitor Watcher';

-- blog-writer (added 2026-09-05)
INSERT INTO agent_registry (agent_name, description, status, expected_cadence_hours)
VALUES ('blog-writer', 'Writes 2 articles/day from agents/knowledge/blog-backlog.json + keyword-opportunity findings; NeuronWriter-scored; compliance-gated; opens a PR for Phillip to merge.', 'active', 30)
ON CONFLICT (agent_name) DO UPDATE SET description = EXCLUDED.description, status = 'active', expected_cadence_hours = 30, updated_at = now();
INSERT INTO agent_registry (agent_name, description, status, expected_cadence_hours)
VALUES ('neuronwriter-pull', 'Pulls scored drafts out of NeuronWriter, scrubs compliance locks, loads City records, opens PR. Weekly + on demand.', 'active', 200)
ON CONFLICT (agent_name) DO UPDATE SET description = EXCLUDED.description, status = 'active', updated_at = now();
