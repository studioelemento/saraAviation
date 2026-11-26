begin;

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.site_admins enable row level security;
revoke all on public.site_admins from public, anon, authenticated;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.site_admins where user_id = auth.uid()
  );
$$;
revoke all on function public.is_site_admin() from public, anon;
grant execute on function public.is_site_admin() to authenticated;

create table if not exists public.page_seo (
  path text primary key check (path in (
    '/', '/ctl', '/about', '/courses', '/news', '/gallery', '/student-hub',
    '/team', '/careers', '/contact', '/placement', '/privacy-policy'
  )),
  title text not null default '' check (char_length(title) <= 120),
  description text not null default '' check (char_length(description) <= 320),
  image_url text not null default '' check (char_length(image_url) <= 2048)
);
alter table public.page_seo enable row level security;
revoke all on public.page_seo from public, anon, authenticated;
grant select on public.page_seo to anon, authenticated;
grant insert, update on public.page_seo to authenticated;

drop policy if exists "Read published SEO" on public.page_seo;
create policy "Read published SEO" on public.page_seo for select to anon, authenticated using (true);
drop policy if exists "Staff insert SEO" on public.page_seo;
create policy "Staff insert SEO" on public.page_seo for insert to authenticated
  with check ((select public.is_site_admin()));
drop policy if exists "Staff update SEO" on public.page_seo;
create policy "Staff update SEO" on public.page_seo for update to authenticated
  using ((select public.is_site_admin())) with check ((select public.is_site_admin()));

do $$
declare
  table_name text;
begin
  foreach table_name in array array['news','courses','gallery','team','jobs'] loop
    execute format('drop policy if exists %I on public.%I', 'Public read ' || table_name, table_name);
    execute format('drop policy if exists %I on public.%I', 'Anon manage ' || table_name, table_name);
    execute format('drop policy if exists "Staff manage content" on public.%I', table_name);
    execute format('drop policy if exists "Read published content" on public.%I', table_name);
    execute format('create policy "Read published content" on public.%I for select to anon, authenticated using (published)', table_name);
    execute format('create policy "Staff manage content" on public.%I for all to authenticated using ((select public.is_site_admin())) with check ((select public.is_site_admin()))', table_name);
  end loop;
end;
$$;

drop policy if exists "Anyone can read leads" on public.leads;
drop policy if exists "Anyone can update leads" on public.leads;
drop policy if exists "Anyone can insert leads" on public.leads;
drop policy if exists "Public submit leads" on public.leads;
drop policy if exists "Staff read leads" on public.leads;
drop policy if exists "Staff update leads" on public.leads;
create policy "Public submit leads" on public.leads for insert to anon, authenticated with check (status = 'new');
create policy "Staff read leads" on public.leads for select to authenticated using ((select public.is_site_admin()));
create policy "Staff update leads" on public.leads for update to authenticated
  using ((select public.is_site_admin())) with check ((select public.is_site_admin()));

drop policy if exists "Anon upload media" on storage.objects;
drop policy if exists "Anon update media" on storage.objects;
drop policy if exists "Anon delete media" on storage.objects;
drop policy if exists "Staff manage media" on storage.objects;
create policy "Staff manage media" on storage.objects for all to authenticated
  using (bucket_id = 'media' and (select public.is_site_admin()))
  with check (bucket_id = 'media' and (select public.is_site_admin()));

drop policy if exists "Anyone can read page views" on public.page_views;
drop policy if exists "Staff read page views" on public.page_views;
create policy "Staff read page views" on public.page_views for select to authenticated
  using ((select public.is_site_admin()));
revoke execute on function public.count_unique_visitors(timestamptz) from public, anon;
revoke execute on function public.count_page_views(timestamptz) from public, anon;

commit;
