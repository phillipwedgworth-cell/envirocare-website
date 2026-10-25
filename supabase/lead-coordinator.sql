-- EnviroCare Lead Coordinator — schema additions (2026-10-05)
-- Path: supabase/lead-coordinator.sql
--
-- NOT APPLIED AUTOMATICALLY. Run once in the Supabase SQL editor for project
-- dyoujmyleihcpqgeifre after reviewing. Additive only: every new column is
-- nullable or defaulted, nothing existing is renamed, dropped or rewritten, so
-- the live quote form (app/api/quote/route.ts) keeps working before and after.
--
-- Undo (drops only what this file adds):
--   drop table if exists public.lead_events;
--   alter table public.leads
--     drop column if exists source, drop column if exists external_id,
--     drop column if exists received_at, drop column if exists kind,
--     drop column if exists customer_type, drop column if exists status,
--     drop column if exists owner, drop column if exists owner_email,
--     drop column if exists callback_due, drop column if exists first_contact_at,
--     drop column if exists status_updated_at, drop column if exists fieldster_ref,
--     drop column if exists fieldster_verified_at, drop column if exists lost_reason,
--     drop column if exists outcome_revenue, drop column if exists duplicate_of,
--     drop column if exists summary, drop column if exists source_url,
--     drop column if exists office_id,
--     drop column if exists direction, drop column if exists alerts;

alter table public.leads
  add column if not exists source            text not null default 'web',   -- web | sameday | lsa | manual
  add column if not exists external_id       text,                          -- Sameday conversation id (dedupe key)
  add column if not exists received_at       timestamptz,                   -- when the inquiry arrived (email time for Sameday)
  add column if not exists office_id         text,                          -- OfficeId from data/zip-to-office.ts, or 'unrouted'
  add column if not exists kind              text,                          -- sales | service | billing | other
  add column if not exists customer_type     text,                          -- new | existing | unknown
  add column if not exists status            text not null default 'new',   -- see lib/leads/core.ts STATUSES
  add column if not exists owner             text,
  add column if not exists owner_email       text,
  add column if not exists callback_due      timestamptz,
  add column if not exists first_contact_at  timestamptz,
  add column if not exists status_updated_at timestamptz,
  add column if not exists fieldster_ref     text,                          -- appointment/job number typed by staff
  add column if not exists fieldster_verified_at timestamptz,               -- set only by the agent, after an API lookup
  add column if not exists lost_reason       text,
  add column if not exists outcome_revenue   numeric,
  add column if not exists duplicate_of      uuid,
  add column if not exists summary           text,
  add column if not exists source_url        text,                          -- e.g. the Sameday conversation link
  add column if not exists direction         text,                          -- inbound | outbound (Sameday campaign call)
  add column if not exists alerts            text[];                        -- do-not-contact, cancellation, price stated

-- One row per Sameday conversation, however many times the relay re-sends it.
create unique index if not exists leads_source_external_id_uidx
  on public.leads (source, external_id) where external_id is not null;

create index if not exists leads_open_idx
  on public.leads (status, callback_due) where status in ('new', 'contacted');

create index if not exists leads_phone_idx on public.leads (phone);

alter table public.leads drop constraint if exists leads_status_chk;
alter table public.leads add constraint leads_status_chk
  check (status in ('new','contacted','booked','resolved','lost','not_a_lead','duplicate'));

-- "Booked" is never a guess: the database itself refuses it without a reference.
alter table public.leads drop constraint if exists leads_booked_needs_ref_chk;
alter table public.leads add constraint leads_booked_needs_ref_chk
  check (status <> 'booked' or (fieldster_ref is not null and length(fieldster_ref) >= 3));

-- Every change, who made it, and when. Append-only audit trail.
create table if not exists public.lead_events (
  id          bigint generated always as identity primary key,
  lead_id     uuid not null references public.leads(id) on delete cascade,
  at          timestamptz not null default now(),
  actor       text not null,            -- staff name, or 'lead-coordinator' for the agent
  event       text not null,            -- created | status | note | verified | assigned
  from_status text,
  to_status   text,
  detail      jsonb
);
create index if not exists lead_events_lead_idx on public.lead_events (lead_id, at);

-- Same lockdown as leads: service-role only, nothing readable with the anon key.
alter table public.lead_events enable row level security;

-- Existing web leads: give them a received time and a status so the first
-- report starts from the truth (they are counted, not invented as "contacted").
update public.leads set received_at = created_at where received_at is null;
