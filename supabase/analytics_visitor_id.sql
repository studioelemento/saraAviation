-- Run once in Supabase SQL Editor (after analytics.sql)
-- Adds visitor_id so we can count unique users, not just page hits.

alter table public.page_views
  add column if not exists visitor_id text;

create index if not exists page_views_visitor_id_idx
  on public.page_views (visitor_id);
