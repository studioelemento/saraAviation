-- Run this once in Supabase: SQL Editor → New query → Run
-- Free plan is fine.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  subject text,
  message text,
  source text not null,
  course text,
  education text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_source_idx on public.leads (source);

alter table public.leads enable row level security;

-- Public site can insert leads (forms)
drop policy if exists "Anyone can insert leads" on public.leads;
create policy "Anyone can insert leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Admin reads/updates via anon key until real auth (password gate is frontend-only for now)
drop policy if exists "Anyone can read leads" on public.leads;
create policy "Anyone can read leads"
  on public.leads
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can update leads" on public.leads;
create policy "Anyone can update leads"
  on public.leads
  for update
  to anon, authenticated
  using (true)
  with check (true);
