-- Run once in Supabase SQL Editor
-- Faster unique-user counts (avoids downloading every row to the browser).

create or replace function public.count_unique_visitors(since_ts timestamptz default null)
returns bigint
language sql
stable
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
as $$
  select count(*)::bigint
  from public.page_views
  where (since_ts is null or created_at >= since_ts);
$$;

revoke execute on function public.count_unique_visitors(timestamptz) from public, anon;
grant execute on function public.count_unique_visitors(timestamptz) to authenticated;
revoke execute on function public.count_page_views(timestamptz) from public, anon;
grant execute on function public.count_page_views(timestamptz) to authenticated;
