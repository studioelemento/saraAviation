-- Run once in Supabase SQL Editor
-- Stores public website page views for the admin dashboard graph.

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx on public.page_views (path);

alter table public.page_views enable row level security;

drop policy if exists "Anyone can insert page views" on public.page_views;
create policy "Anyone can insert page views"
  on public.page_views
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anyone can read page views" on public.page_views;
create policy "Anyone can read page views"
  on public.page_views
  for select
  to anon, authenticated
  using (true);
