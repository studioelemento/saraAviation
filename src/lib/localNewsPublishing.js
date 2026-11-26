export function localNewsPublishingEnabled() {
  return import.meta.env.DEV
    && Boolean(import.meta.env.VITE_LOCAL_ADMIN_PASSWORD)
    && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
}

const key = 'sara_local_published_news';

export function readLocalNews() {
  if (!localNewsPublishingEnabled()) return {};
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

export function setLocalNews(id, row) {
  localStorage.setItem(key, JSON.stringify({ ...readLocalNews(), [id]: row }));
}

export function mergeLocalNews(items, mapRow, includeUnpublished = false) {
  const local = readLocalNews();
  return [
    ...Object.values(local).filter((item) => item && (includeUnpublished || item.published)).map(mapRow),
    ...items.filter((item) => !Object.hasOwn(local, item.id)),
  ];
}
