-- ─── CLAUDE CODE: DEPLOY THIS FILE ───
-- Repo: phillipwedgworth-cell/envirocare-website (PUBLIC)
-- Path: agents/sql/0007-executor.sql
-- Commit: feat(agents): executor — ship approved approval_queue rows to GBP via OneUp
-- Push: main (via branch + PR)
-- ─────────────────────────────────────
--
-- Run this ONCE in the Supabase SQL editor (project dyoujmyleihcpqgeifre), in a
-- NEW query tab ("+ New query" — never overwrite an existing saved tab).
--
-- ⚠ PASTE CHECK: this editor drops the first few characters on paste. Before
-- pressing Run, confirm line 1 reads exactly
--   "-- ─── CLAUDE CODE: DEPLOY THIS FILE ───"
-- and that the first statement starts with the full word "INSERT".
--
-- Idempotent. Safe to re-run. Destroys nothing. Ships nothing — this file only
-- registers the agent; publishing still requires a workflow_dispatch with
-- mode=ship.

-- ── 1. Register the executor ─────────────────────────────────────────────
-- agents/lib/agent-gate.mjs treats agent_registry.status as a real kill switch
-- and warns loudly for any agent missing from this table. The watchdog reads
-- expected_cadence_hours to decide when an agent is OVERDUE, so an unregistered
-- executor would be invisible to it — which for the agent that publishes to
-- Google Business Profiles is the worst possible thing to be.
--
-- Registered ACTIVE at 24h to match .github/workflows/executor.yml (daily
-- 13:30 UTC). Note what "active" does and does not mean here: the scheduled run
-- is a DRY RUN. It reads the queue, re-checks every row against
-- compliance_prohibitions and service_canon, files a finding for each row that
-- fails, and publishes nothing. Only a manual workflow_dispatch with
-- mode=ship publishes, and even then it is capped at 3 posts per run and one
-- per office.
--
-- TO STOP IT: UPDATE agent_registry SET status='paused' WHERE agent_name='executor';
-- That is honoured now — see the agent-gate header for why that sentence used
-- to be false.
INSERT INTO agent_registry (agent_name, description, status, expected_cadence_hours)
VALUES (
  'executor',
  'Ships approved approval_queue rows (action_type=post_publish / proposed_type=gbp_post) to Google Business Profile via OneUp. Re-checks every row against compliance_prohibitions + service_canon at ship time and never trusts compliance_clean. DRY RUN on schedule; publishing needs workflow_dispatch mode=ship. Cap 3/run, one per office, 30-day dedup.',
  'active',
  24
)
ON CONFLICT (agent_name) DO UPDATE
  SET description            = EXCLUDED.description,
      status                 = 'active',
      expected_cadence_hours = EXCLUDED.expected_cadence_hours,
      updated_at             = now();

-- ── 2. Let the queue record 'shipped' and 'failed' ───────────────────────
-- approval_queue.status is free text today (values in use: pending, approved,
-- skip, fix). The executor adds 'shipped' and 'failed'. Nothing to migrate —
-- this block exists only so the vocabulary is written down in one place:
--
--   pending  → awaiting Phillip
--   approved → Phillip said yes; the executor has not looked at it yet
--   fix      → approved, but it FAILS today's compliance/canon rules. The exact
--              phrase is in decision_note. Needs a rewrite, not a re-approval.
--   shipped  → handed to OneUp; decision_note carries the OneUp id, the listing
--              and the scheduled time. The social_posts row is 'exec-<queue id>'.
--   failed   → the publish attempt errored; decision_note carries the error.
--              Safe to retry: the executor re-checks social_posts before every
--              publish, so a retry cannot double-post.
--   skip     → not shippable by this agent (ads/web rows with action_type NULL,
--              or a duplicate inside the 30-day window).

-- ── 3. Verify ────────────────────────────────────────────────────────────
SELECT agent_name, status, expected_cadence_hours, description
  FROM agent_registry
 WHERE agent_name = 'executor';
