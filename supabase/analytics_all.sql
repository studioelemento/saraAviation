-- ============================================================
-- Run this ONCE in Supabase → SQL Editor → New query → Run
-- Sets up page views + unique visitors + fast count functions.
-- ============================================================

-- 1) Table
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx on public.page_views (path);

-- 2) Unique visitor column
alter table public.page_views
  add column if not exists visitor_id text;

create index if not exists page_views_visitor_id_idx
  on public.page_views (visitor_id);

-- 3) RLS — public site can insert; admin can read
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

-- 4) Fast count RPCs (used by admin dashboard)
create or replace function public.count_unique_visitors(since_ts timestamptz default null)
returns bigint
language sql
stable
security invoker
as $$
  select count(distinct visitor_id)::bigint
  from public.page_views
  where visitor_id is not null
    and (since_ts is null or created_at >= since_ts);
$$;

create or replace function public.count_page_views(since_ts timestamptz default null)
returns bigint
language sql
stable
security invoker
as $$
  select count(*)::bigint
  from public.page_views
  where (since_ts is null or created_at >= since_ts);
$$;

grant execute on function public.count_unique_visitors(timestamptz) to anon, authenticated;
grant execute on function public.count_page_views(timestamptz) to anon, authenticated;
