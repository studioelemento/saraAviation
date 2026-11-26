-- Run once in Supabase SQL Editor after leads.sql
-- Creates content tables + public media storage for admin uploads.

-- ---------- NEWS ----------
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text default 'Industry',
  date_label text,
  excerpt text,
  image_url text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- COURSES ----------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  duration text,
  description text,
  eligibility jsonb not null default '[]'::jsonb,
  accreditation jsonb not null default '[]'::jsonb,
  what_you_can_learn jsonb not null default '[]'::jsonb,
  is_govt boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- GALLERY ----------
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- TEAM ----------
create table if not exists public.team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  experience text,
  bio text,
  image_url text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- JOBS ----------
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  experience text,
  location text,
  type text default 'Full-Time',
  responsibilities jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists news_sort_idx on public.news (sort_order, created_at desc);
create index if not exists courses_sort_idx on public.courses (sort_order, created_at desc);
create index if not exists gallery_sort_idx on public.gallery (sort_order, created_at desc);
create index if not exists team_sort_idx on public.team (sort_order, created_at desc);
create index if not exists jobs_sort_idx on public.jobs (sort_order, created_at desc);

-- RLS
alter table public.news enable row level security;
alter table public.courses enable row level security;
alter table public.gallery enable row level security;
alter table public.team enable row level security;
alter table public.jobs enable row level security;

-- Public and staff content policies are configured by staff_seo.sql.

-- Storage bucket for images
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

-- Media write permissions are configured by staff_seo.sql.
