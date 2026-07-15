-- EnviroCare — durable store for website quote-form leads.
-- Run once in the Supabase SQL editor (SQL Editor -> New query -> paste -> Run).
-- Path in repo: supabase/leads.sql
--
-- Why this exists: app/api/quote/route.ts previously emailed leads and nothing else.
-- A failed Resend send destroyed the lead with no record. This table is the copy
-- that survives an email outage.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- who
  first_name    text not null default '',
  last_name     text not null default '',
  phone         text not null,
  email         text not null default '',
  address       text,
  zip           text not null,

  -- what
  service_type  text,
  notes         text,

  -- routing (computed by the API from zip -> office)
  office        text,
  office_phone  text,

  -- delivery telemetry: did the notification actually go out?
  --   pending | sent | failed
  email_status  text not null default 'pending',
  email_error   text,

  -- Fieldster push status, for when the API is finally wired up
  --   skipped | pushed | failed
  fieldster_status text not null default 'skipped',
  fieldster_id     text,

  -- raw payload, so a field-name change upstream can never lose data
  raw           jsonb
);

-- The query that matters: which leads did the email pipe drop?
create index if not exists leads_email_status_idx
  on public.leads (email_status, created_at desc);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

-- Lock it down. The API writes with the service-role key, which bypasses RLS.
-- Enabling RLS with no permissive policy means the anon key can neither read
-- nor write this table -- customer PII is not publicly readable.
alter table public.leads enable row level security;

-- Sanity check after running:
--   select count(*) from public.leads;            -- expect 0
--   insert into public.leads (phone, zip) values ('205-555-0100', '35007');
--   select * from public.leads;                   -- expect 1 row
--   delete from public.leads where phone = '205-555-0100';
