-- ═══════════════════════════════════════════════════════════════
-- Approval Queue — the single source of truth for "Needs Your Approval"
-- Replaces the stale Notion mirror + Desktop APPROVAL-QUEUE.md.
-- Run once in the Supabase SQL editor (project dyoujmyleihcpqgeifre).
-- ═══════════════════════════════════════════════════════════════

create table if not exists approval_queue (
  id            bigint generated always as identity primary key,
  agent         text not null,                    -- producer: review-responder | proposer | ads-monitor | ...
  kind          text not null default 'action',   -- review-reply | blog | ads | social | pr | other
  title         text not null,                    -- short headline on the card
  summary       text,                             -- the proposed content / longer description
  payload       jsonb default '{}'::jsonb,         -- structured data the executor needs (pr number, url, target)
  link          text,                             -- optional preview URL
  priority      int  default 0,                   -- higher shows first
  status        text not null default 'pending',  -- pending | approved | fix | skipped | shipped | failed
  decision_note text,                             -- feedback captured when "Fix it"
  error         text,                             -- executor error message when 'failed'
  decided_at    timestamptz,                      -- when Phillip tapped a button
  shipped_at    timestamptz,                      -- when the executor completed it
  created_at    timestamptz default now()
);

-- Fast lookup for the console (pending/failed first) and the executor (approved).
create index if not exists idx_approval_queue_status
  on approval_queue (status, priority desc, created_at);

-- Refresh PostgREST's schema cache so the API sees the new table immediately.
notify pgrst, 'reload schema';
