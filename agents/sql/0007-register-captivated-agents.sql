-- agents/sql/0007-register-captivated-agents.sql
-- 2026-09-10. Run once in the Supabase SQL editor (project dyoujmyleihcpqgeifre).
-- Idempotent — safe to re-run.
--
-- TWO THINGS, BOTH SMALL, BOTH OUTSTANDING.
--
-- (A) 0005 section (d) never ran. The earlier execution of 0005 died on the
--     agent_runs.summary jsonb cast in section (c) — fixed on main since — and
--     (d) sits after it, so site-reviewer is STILL 'paused' carrying the Aug 24
--     muted_reason. The duplicate-findings fix it was waiting for shipped in
--     #133 on Sep 5. Sections (a)(b)(c)(e) are already applied and are not
--     repeated here.
--
-- (B) Three Captivated agents are not in agent_registry at all. They report
--     "not in agent_registry — gate open, REGISTER IT" on every run.
--
--     Registering them is NOT about the watchdog: agents/watchdog.mjs carries
--     its own hardcoded agent list, so adding rows here creates no new alarms.
--     It is about agents/lib/agent-gate.mjs, which reads status as a real kill
--     switch — any non-'active' value stops the agent before it does anything.
--     Unknown agents currently run with the gate OPEN, which is the wrong
--     default for a thing that can text customers.
--
--     So this gives you an off-switch. To stop any of them:
--         UPDATE agent_registry SET status = 'paused' WHERE agent_name = '...';

-- ── (A) unpause site-reviewer ───────────────────────────────────────────────
UPDATE agent_registry
   SET status = 'active',
       updated_at = now(),
       muted_reason = 'Unpaused 2026-09-04: within-run dedup on label-stripped text; HIGH now files as warning.'
 WHERE agent_name = 'site-reviewer';

-- ── (B) register the Captivated agents ──────────────────────────────────────
-- expected_cadence_hours is documentation here, not enforcement — the watchdog
-- does not read this table. captivated-send has no cadence because it is
-- manual-only: it never runs on a schedule, and it sends nothing without BOTH
-- --send and CAPTIVATED_ALLOW_SENDS=1.
INSERT INTO agent_registry (agent_name, description, expected_cadence_hours, status, muted_reason)
VALUES
  ('captivated-suppress-sync',
   'Syncs Fieldster do-not-call notes into the SMS/email suppression lists and collections_do_not_contact. Read-only against Fieldster; additive. Runs weekdays 11:30 UTC via .github/workflows/collections-suppression.yml.',
   24, 'active', NULL),

  ('captivated-audit',
   'Read-only diagnostic: is the Captivated review engine actually sending? Reports outbound volume, most recent send, template compliance. Sends nothing. Currently returns UNKNOWN because Captivated /conversations is not a list endpoint (400) and /templates 500s on their side.',
   168, 'active', NULL),

  ('captivated-send',
   'Review-request sender. MANUAL ONLY — dry run by default, and sends nothing without both --send and CAPTIVATED_ALLOW_SENDS=1. Set status to paused here to disable it outright.',
   NULL, 'active', NULL)
ON CONFLICT (agent_name) DO UPDATE
   SET description = EXCLUDED.description,
       expected_cadence_hours = EXCLUDED.expected_cadence_hours,
       updated_at = now();

-- ── verify ──────────────────────────────────────────────────────────────────
-- Expect site-reviewer 'active', and three captivated-* rows.
SELECT agent_name, status, expected_cadence_hours
  FROM agent_registry
 WHERE agent_name = 'site-reviewer'
    OR agent_name LIKE 'captivated-%'
 ORDER BY agent_name;
