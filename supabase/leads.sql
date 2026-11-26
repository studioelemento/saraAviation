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
  with check (status = 'new');

-- Staff access is configured by staff_seo.sql.
