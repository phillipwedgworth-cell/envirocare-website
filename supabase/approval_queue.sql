-- ═══════════════════════════════════════════════════════════════
-- Approval Queue — single source of truth for /approve.
-- Run once in the Supabase SQL editor (project dyoujmyleihcpqgeifre).
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.approval_queue (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  title             text not null,                       -- short label you read first
  category          text not null
                      check (category in ('comms','web','ads','post','ops')),
  preview           text,                                -- the actual copy that ships
  preview_url       text,                                -- branch preview link (web pages)
  risk              text not null default 'green'
                      check (risk in ('green','yellow','red')),
  compliance_clean  boolean not null default false,
  compliance_notes  text,                                -- flags: rodent/wildlife/discount/etc.
  action_type       text,                                -- 'github_merge' | 'ads_launch' | 'post_publish' | 'review_reply' | ...
  action_ref        text,                                -- branch name / campaign id / review id
  action_payload    jsonb,                               -- anything the executor needs
  status            text not null default 'pending'
                      check (status in ('pending','approved','fix','skip','shipped','failed')),
  decided_at        timestamptz,
  decision_note     text,                                -- your "fix it" instructions, if any
  source            text                                 -- which agent produced it
);

create index if not exists approval_queue_status_idx
  on public.approval_queue (status, created_at desc);

-- keep updated_at fresh on every write
create or replace function public.touch_approval_queue()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_touch_approval_queue on public.approval_queue;
create trigger trg_touch_approval_queue
  before update on public.approval_queue
  for each row execute function public.touch_approval_queue();

notify pgrst, 'reload schema';
