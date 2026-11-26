begin;

alter table public.news
  add column if not exists seo_title text not null default '' check (char_length(seo_title) <= 120),
  add column if not exists seo_description text not null default '' check (char_length(seo_description) <= 320),
  add column if not exists seo_image_url text not null default '' check (char_length(seo_image_url) <= 2048);

create table if not exists public.content_drafts (
  section text not null check (section in ('courses', 'news')),
  id uuid not null,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'),
  primary key (section, id)
);

create table if not exists public.content_revisions (
  revision_id bigint generated always as identity primary key,
  section text not null check (section in ('courses', 'news')),
  id uuid not null,
  payload jsonb not null,
  action text not null check (action in ('published', 'unpublished')),
  changed_at timestamptz not null default now()
);
create index if not exists content_revisions_item_idx
  on public.content_revisions (section, id, revision_id desc);

alter table public.content_drafts enable row level security;
alter table public.content_revisions enable row level security;
revoke all on public.content_drafts, public.content_revisions from public, anon, authenticated;
grant select, insert, update, delete on public.content_drafts to authenticated;
grant select, insert on public.content_revisions to authenticated;
grant usage on sequence public.content_revisions_revision_id_seq to authenticated;

drop policy if exists "Staff manage drafts" on public.content_drafts;
create policy "Staff manage drafts" on public.content_drafts for all to authenticated
  using ((select public.is_site_admin())) with check ((select public.is_site_admin()));

drop policy if exists "Staff read revisions" on public.content_revisions;
create policy "Staff read revisions" on public.content_revisions for select to authenticated
  using ((select public.is_site_admin()));
drop policy if exists "Staff record revisions" on public.content_revisions;
create policy "Staff record revisions" on public.content_revisions for insert to authenticated
  with check ((select public.is_site_admin()));

create or replace function public.publish_content(
  p_section text, p_id uuid, p_payload jsonb, p_publish boolean
) returns void
language plpgsql security invoker set search_path = ''
as $$
declare
  previous jsonb;
  current_revision jsonb;
  course public.courses;
  article public.news;
begin
  if not public.is_site_admin() then
    raise exception 'Staff access is required' using errcode = '42501';
  end if;
  if p_section is null or p_section not in ('courses', 'news') or p_id is null or p_publish is null then
    raise exception 'Invalid content item';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_section || ':' || p_id::text, 0));
  if p_section = 'courses' then
    select to_jsonb(c) into previous from public.courses c where c.id = p_id for update;
    if p_publish then
      course := jsonb_populate_record(null::public.courses, p_payload);
      if nullif(btrim(course.title), '') is null then raise exception 'A title is required'; end if;
      insert into public.courses as c (
        id, title, image_url, duration, description, eligibility, accreditation, what_you_can_learn, is_govt, published, sort_order
      ) values (
        p_id, course.title, course.image_url, course.duration, course.description, coalesce(course.eligibility, '[]'),
        coalesce(course.accreditation, '[]'), coalesce(course.what_you_can_learn, '[]'),
        coalesce(course.is_govt, false), true, coalesce(course.sort_order, 0)
      ) on conflict (id) do update set
        title = excluded.title, image_url = excluded.image_url, duration = excluded.duration,
        description = excluded.description, eligibility = excluded.eligibility, accreditation = excluded.accreditation,
        what_you_can_learn = excluded.what_you_can_learn, is_govt = excluded.is_govt, published = true,
        sort_order = excluded.sort_order
      returning to_jsonb(c) into current_revision;
    else
      update public.courses c set published = false where c.id = p_id and c.published
        returning to_jsonb(c) into current_revision;
    end if;
  else
    select to_jsonb(n) into previous from public.news n where n.id = p_id for update;
    if p_publish then
      article := jsonb_populate_record(null::public.news, p_payload);
      if nullif(btrim(article.title), '') is null or nullif(btrim(article.excerpt), '') is null then
        raise exception 'A title and article excerpt are required';
      end if;
      insert into public.news as n (id, title, category, date_label, excerpt, image_url, seo_title, seo_description, seo_image_url, published, sort_order)
      values (p_id, article.title, article.category, article.date_label, article.excerpt, article.image_url, coalesce(article.seo_title, ''), coalesce(article.seo_description, ''), coalesce(article.seo_image_url, ''), true, coalesce(article.sort_order, 0))
      on conflict (id) do update set title = excluded.title, category = excluded.category, date_label = excluded.date_label,
        excerpt = excluded.excerpt, image_url = excluded.image_url, seo_title = excluded.seo_title,
        seo_description = excluded.seo_description, seo_image_url = excluded.seo_image_url, published = true, sort_order = excluded.sort_order
      returning to_jsonb(n) into current_revision;
    else
      update public.news n set published = false where n.id = p_id and n.published
        returning to_jsonb(n) into current_revision;
    end if;
  end if;

  if current_revision is null then raise exception 'This item is no longer published'; end if;
  if previous->>'published' = 'true' and not exists (
    select 1 from public.content_revisions r where r.section = p_section and r.id = p_id
  ) then
    insert into public.content_revisions (section, id, payload, action)
      values (p_section, p_id, previous, 'published');
  end if;

  insert into public.content_revisions (section, id, payload, action)
    values (p_section, p_id, current_revision, case when p_publish then 'published' else 'unpublished' end);
  if p_publish then
    delete from public.content_drafts where section = p_section and id = p_id;
  end if;
end;
$$;

revoke all on function public.publish_content(text, uuid, jsonb, boolean) from public, anon;
grant execute on function public.publish_content(text, uuid, jsonb, boolean) to authenticated;
notify pgrst, 'reload schema';
commit;
