import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { listRows, mapNewsRow } from '../lib/contentApi';
import { localNewsPublishingEnabled, mergeLocalNews } from '../lib/localNewsPublishing';
import { newsArticles } from '../data/newsData';
import { getPageSeo, publicPaths, siteName } from '../data/pageSeo';

export const VIEW_RANGES = [
  { id: 'daily', label: 'Daily', days: 1 },
  { id: 'weekly', label: 'Weekly', days: 7 },
  { id: 'monthly', label: 'Monthly', days: 30 },
];

function startOfLocalDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDayLabel(date, rangeId) {
  if (rangeId === 'daily') {
    return date.toLocaleTimeString([], { hour: '2-digit', hour12: true });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function buildBuckets(rangeId) {
  const now = new Date();
  const buckets = [];

  if (rangeId === 'daily') {
    for (let i = 23; i >= 0; i -= 1) {
      const start = new Date(now);
      start.setMinutes(0, 0, 0);
      start.setHours(start.getHours() - i);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);
      buckets.push({
        key: start.toISOString(),
        label: formatDayLabel(start, rangeId),
        start,
        end,
        count: 0,
        visitors: new Set(),
      });
    }
    return buckets;
  }

  const days = rangeId === 'weekly' ? 7 : 30;
  for (let i = days - 1; i >= 0; i -= 1) {
    const start = startOfLocalDay(now);
    start.setDate(start.getDate() - i);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    buckets.push({
      key: start.toISOString().slice(0, 10),
      label: formatDayLabel(start, rangeId),
      start,
      end,
      count: 0,
      visitors: new Set(),
    });
  }
  return buckets;
}

function fillBuckets(buckets, rows) {
  for (const row of rows) {
    const created = new Date(row.created_at);
    const bucket = buckets.find((b) => created >= b.start && created < b.end);
    if (!bucket) continue;
    if (row.visitor_id) bucket.visitors.add(row.visitor_id);
  }

  return buckets.map((b) => ({
    key: b.key,
    label: b.label,
    start: b.start,
    end: b.end,
    count: b.visitors.size,
  }));
}

function emptyResult(error) {
  return {
    uniqueAllTime: 0,
    uniqueToday: 0,
    uniqueInRange: 0,
    pageViewsAllTime: 0,
    pageViewsInRange: 0,
    buckets: [],
    topPaths: [],
    error,
  };
}

async function rpcCount(fnName, sinceTs) {
  const { data, error } = await supabase.rpc(fnName, {
    since_ts: sinceTs ?? null,
  });
  if (error) throw error;
  return Number(data || 0);
}

/** Fallback when RPC functions are not installed yet */
async function countFromTable({ unique = false, sinceTs = null } = {}) {
  let query = supabase
    .from('page_views')
    .select(unique ? 'visitor_id' : 'id', { count: unique ? undefined : 'exact', head: !unique });

  if (unique) {
    query = supabase
      .from('page_views')
      .select('visitor_id')
      .not('visitor_id', 'is', null)
      .limit(10000);
    if (sinceTs) query = query.gte('created_at', sinceTs);
    const { data, error } = await query;
    if (error) throw error;
    return new Set((data || []).map((r) => r.visitor_id).filter(Boolean)).size;
  }

  if (sinceTs) query = query.gte('created_at', sinceTs);
  const { count, error } = await query;
  if (error) throw error;
  return count || 0;
}

async function safeCountUnique(sinceTs) {
  try {
    return await rpcCount('count_unique_visitors', sinceTs);
  } catch {
    return countFromTable({ unique: true, sinceTs });
  }
}

async function safeCountViews(sinceTs) {
  try {
    return await rpcCount('count_page_views', sinceTs);
  } catch {
    return countFromTable({ unique: false, sinceTs });
  }
}

async function fetchRangeViews(sinceIso) {
  const rows = [];
  const size = 500;
  const untilIso = new Date().toISOString();

  for (let offset = 0; ; offset += size) {
    const { data, error } = await supabase.from('page_views')
      .select('path, created_at, visitor_id')
      .gte('created_at', sinceIso)
      .lte('created_at', untilIso)
      .order('created_at', { ascending: true })
      .order('id', { ascending: true })
      .range(offset, offset + size - 1);
    if (error) throw error;
    rows.push(...data);
    if (data.length < size) return rows;
  }
}

async function loadPageTitles() {
  const titles = new Map(publicPaths.map((path) => [
    path, path === '/' ? 'Home' : getPageSeo(path).title.replace(' | ' + siteName, ''),
  ]));
  try {
    const { data, error } = await listRows('news', { publishedOnly: true });
    const local = localNewsPublishingEnabled();
    const posts = error || (local && !data.length) ? newsArticles : data.map(mapNewsRow);
    for (const post of local ? mergeLocalNews(posts, mapNewsRow) : posts) {
      titles.set('/news/' + post.id, post.title);
    }
  } catch {
    // Keep analytics available if the news catalog cannot be loaded.
  }
  return titles;
}

export function countPagePaths(rows, titles) {
  const paths = new Map(Array.from(titles, ([path, title]) => [path, { path, title, count: 0 }]));
  for (const row of rows) {
    if (!row.path) continue;
    const path = row.path.replace(/\/+$/, '') || '/';
    const previous = paths.get(path);
    if (previous) previous.count += 1;
  }
  return Array.from(paths.values()).sort((a, b) => b.count - a.count || a.path.localeCompare(b.path));
}

export async function fetchViewAnalytics(rangeId = 'weekly') {
  const emptyBuckets = buildBuckets(rangeId).map((b) => ({
    key: b.key,
    label: b.label,
    count: 0,
  }));

  if (!isSupabaseConfigured) {
    return { ...emptyResult(new Error('Supabase not configured')), buckets: emptyBuckets };
  }

  const range = VIEW_RANGES.find((r) => r.id === rangeId) || VIEW_RANGES[1];
  const since = new Date();
  if (rangeId === 'daily') {
    since.setHours(since.getHours() - 24);
  } else {
    since.setDate(since.getDate() - (range.days - 1));
    since.setHours(0, 0, 0, 0);
  }
  const todayStart = startOfLocalDay(new Date());
  const sinceIso = since.toISOString();
  const todayIso = todayStart.toISOString();

  try {
    const [uniqueAllTime, uniqueToday, uniqueInRange, pageViewsAllTime, pageViewsInRange, rangeRows, pageTitles] =
      await Promise.all([
        safeCountUnique(null),
        safeCountUnique(todayIso),
        safeCountUnique(sinceIso),
        safeCountViews(null),
        safeCountViews(sinceIso),
        fetchRangeViews(sinceIso),
        loadPageTitles(),
      ]);

    const buckets = fillBuckets(buildBuckets(rangeId), rangeRows);
    const topPaths = countPagePaths(rangeRows, pageTitles);

    return {
      uniqueAllTime,
      uniqueToday,
      uniqueInRange,
      pageViewsAllTime,
      pageViewsInRange,
      buckets,
      topPaths,
      error: null,
    };
  } catch (error) {
    console.error('[analyticsApi]', error);
    return { ...emptyResult(error), buckets: emptyBuckets };
  }
}
