-- ─── CLAUDE CODE: DEPLOY THIS FILE ───
-- Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
-- Path: agents/sql/0004-suppression-and-registry.sql
-- Commit: chore(db): seed finding suppression + register missing agents
-- Push: main
-- ─────────────────────────────────────
--
-- Run this ONCE in the Supabase SQL editor, in a NEW query tab
-- ("+ New query" — never overwrite an existing saved tab).
--
-- ⚠ PASTE CHECK: this editor drops the first few characters on paste.
-- Before pressing Run, confirm line 1 below reads exactly
--   "-- ─── CLAUDE CODE: DEPLOY THIS FILE ───"
-- and that the first statement starts with the full word "INSERT".
--
-- Idempotent. Safe to re-run. Destroys nothing.

-- ── 1. Suppress the DEAD ZONE noise ──────────────────────────────────────
-- seo-monitor re-filed the same 14 critical findings 100-120 times each
-- between 2026-07-20 and 2026-08-24. Huntsville sitting at 0% SoLV is known
-- standing state, not a daily discovery, and it drowned real findings in the
-- morning brief. The blended per-location SoLV finding still fires, so a
-- genuine move still surfaces.
--
-- Reversing this is one UPDATE: set active = false on the row.

-- finding_suppression_rules has a unique index on id only -- no constraint on
-- (agent_name, pattern) -- so ON CONFLICT DO NOTHING would never fire and a
-- second run would just duplicate these rows. Verified against the live schema
-- 2026-08-24. WHERE NOT EXISTS is what actually makes this re-runnable.
INSERT INTO finding_suppression_rules (agent_name, category, pattern, reason, active)
SELECT v.agent_name, v.category, v.pattern, v.reason, v.active
  FROM (VALUES
    ('seo-monitor', 'seo', 'DEAD ZONE — Huntsville',
     'Known standing state. Huntsville is a review-volume problem (9 reviews vs 289+ competitors), not a daily finding. Blended SoLV finding still reports.', true),
    ('seo-monitor', 'seo', 'DEAD ZONE — Alabaster',
     'Known standing state since 2026-07-20. Re-filed 87-120x. Blended SoLV finding still reports.', true)
  ) AS v(agent_name, category, pattern, reason, active)
 WHERE NOT EXISTS (
   SELECT 1 FROM finding_suppression_rules r
    WHERE r.agent_name IS NOT DISTINCT FROM v.agent_name
      AND r.pattern = v.pattern
 );

-- ── 2. Make the registry match reality ───────────────────────────────────
-- agents/lib/agent-gate.mjs now treats agent_registry.status as a real kill
-- switch, so any agent missing from this table logs a warning and runs
-- ungated. These five run daily in Actions but were never registered.

INSERT INTO agent_registry (agent_name, description, status, expected_cadence_hours)
VALUES
  ('seo-snapshot',   'Local Falcon campaign reports -> seo_metrics. 0 scan credits.', 'active', 168),
  ('content-reviewer','Reviews NeuronWriter drafts for compliance before queueing.',   'active', 24),
  ('ai-citation-probe','Monthly AI-visibility citation probe.',                        'active', 720),
  ('neuronwriter-optimize','Generates optimized drafts, Tuesdays.',                    'active', 168),
  ('oneup-push',     'Pushes approved posts to OneUp. NO WORKFLOW YET — see note.',    'paused', 24)
ON CONFLICT (agent_name) DO UPDATE
  SET description = EXCLUDED.description,
      updated_at  = now();

-- ── 3. Confirm the two that should stay stopped ──────────────────────────
-- Both were already 'paused' and both kept running because nothing enforced
-- the column. Re-asserted here so the intent is recorded next to the fix.

UPDATE agent_registry
   SET status = 'paused',
       muted_reason = 'Retired 2026-08-06. Kept running until the gate landed 2026-08-24.',
       updated_at = now()
 WHERE agent_name = 'social-poster';

UPDATE agent_registry
   SET status = 'paused',
       muted_reason = 'Paused pending duplicate-findings fix (every rec filed twice as IMMEDIATE + HIGH on 2026-08-24).',
       updated_at = now()
 WHERE agent_name = 'site-reviewer';

-- ── 4. Verify ────────────────────────────────────────────────────────────
SELECT agent_name, status, muted_reason
  FROM agent_registry
 WHERE agent_name IN ('social-poster','site-reviewer','seo-snapshot','oneup-push')
 ORDER BY agent_name;

SELECT agent_name, pattern, active FROM finding_suppression_rules ORDER BY id;
