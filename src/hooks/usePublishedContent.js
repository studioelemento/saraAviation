import { useEffect, useState } from 'react';
import { localNewsPublishingEnabled, mergeLocalNews } from '../lib/localNewsPublishing';
import { useContentPreview } from '../lib/contentPreview';
import { listRows, mapCourseRow, mapGalleryRow, mapJobRow, mapNewsRow, mapTeamRow } from '../lib/contentApi';

const memoryCache = new Map();
const LS_PREFIX = 'sara_cms_v1:';
const CACHE_MS = 10 * 60_000; // refresh after 10 min; still show stale instantly

const MAPPERS = {
  news: mapNewsRow,
  courses: mapCourseRow,
  gallery: mapGalleryRow,
  team: mapTeamRow,
  jobs: mapJobRow,
};

const PUBLIC_TABLES = Object.keys(MAPPERS);

function cacheKey(table) {
  return `published:${table}`;
}

function readMemory(table) {
  const hit = memoryCache.get(cacheKey(table));
  if (!hit) return null;
  return hit.items;
}

function writeMemory(table, items, at = Date.now()) {
  memoryCache.set(cacheKey(table), { at, items });
}

function readLocal(table) {
  try {
    const raw = localStorage.getItem(LS_PREFIX + table);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeLocal(table, items) {
  try {
    localStorage.setItem(
      LS_PREFIX + table,
      JSON.stringify({ at: Date.now(), items })
    );
  } catch {
    // quota / private mode — ignore
  }
}

function getInstantItems(table, fallback) {
  const mem = readMemory(table);
  if (mem) return mem;
  const local = readLocal(table);
  if (local) {
    writeMemory(table, local.items, local.at);
    return local.items;
  }
  return fallback;
}

function isFresh(table) {
  const mem = memoryCache.get(cacheKey(table));
  if (mem && Date.now() - mem.at < CACHE_MS) return true;
  const local = readLocal(table);
  if (local && Date.now() - local.at < CACHE_MS) return true;
  return false;
}

async function fetchAndCache(table, mapRow) {
  const { data, error } = await listRows(table, { publishedOnly: true });
  if (error) return { items: null, error };
  const mapped = data.map(mapRow);
  writeMemory(table, mapped);
  writeLocal(table, mapped);
  return { items: mapped, error: null };
}

/**
 * Prefetch all public CMS tables so Courses / News / Gallery / Team / Jobs
 * open instantly after the first visit.
 */
export function prefetchPublishedContent() {
  return Promise.all(
    PUBLIC_TABLES.map(async (table) => {
      if (isFresh(table)) return;
      const mapRow = MAPPERS[table];
      await fetchAndCache(table, mapRow);
    })
  );
}

/** Clear CMS caches after admin edits (optional). */
export function invalidatePublishedContent(table) {
  if (table) {
    memoryCache.delete(cacheKey(table));
    try {
      localStorage.removeItem(LS_PREFIX + table);
    } catch {
      /* ignore */
    }
    return;
  }
  memoryCache.clear();
  PUBLIC_TABLES.forEach((t) => {
    try {
      localStorage.removeItem(LS_PREFIX + t);
    } catch {
      /* ignore */
    }
  });
}

/**
 * Load published rows from Supabase.
 * Shows fallback / cached data immediately, then refreshes quietly.
 */
export function usePublishedContent(table, mapRow, fallback = []) {
  const [items, setItems] = useState(() => getInstantItems(table, fallback));
  const [loading, setLoading] = useState(() => {
    const instant = getInstantItems(table, fallback);
    return !(instant && instant.length);
  });
  const [fromCms, setFromCms] = useState(() => Boolean(readMemory(table) || readLocal(table)));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const instant = getInstantItems(table, fallback);
      const hasVisibleData = Boolean(instant?.length);

      // Never blank the page when we already have something to show
      if (!hasVisibleData) setLoading(true);
      else setLoading(false);

      // Skip network if memory/local cache is still fresh
      if (isFresh(table)) {
        setItems(instant);
        setFromCms(true);
        setLoading(false);
        return;
      }

      const { items: mapped, error } = await fetchAndCache(table, mapRow);
      if (cancelled) return;

      if (!error && mapped) {
        setItems(mapped);
        setFromCms(true);
      } else if (!instant?.length) {
        setItems(fallback);
        setFromCms(false);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const preview = useContentPreview(table);
  const publishedItems = table === 'news' && localNewsPublishingEnabled()
    ? mergeLocalNews(items.length ? items : fallback, mapRow)
    : items;
  const visibleItems = preview
    ? [mapRow(preview), ...publishedItems.filter((item) => item.id !== preview.id)]
    : publishedItems;
  return { items: visibleItems, loading, fromCms };
}
