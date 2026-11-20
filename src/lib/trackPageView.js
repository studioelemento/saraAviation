import { supabase, isSupabaseConfigured } from './supabase';

const VISITOR_KEY = 'sara_visitor_id';

function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return `anon-${Date.now()}`;
  }
}

/**
 * Record one public page view with a stable visitor id.
 * Unique users are counted by visitor_id (1 browser = 1 user).
 * Admin routes are skipped.
 */
export function trackPageView(pathname) {
  if (!isSupabaseConfigured) return;
  if (!pathname || pathname.startsWith('/admin')) return;

  const visitorId = getVisitorId();

  // Avoid Strict Mode double-insert for the same path within 1.5s
  const key = `sara_last_view_${pathname}`;
  const now = Date.now();
  try {
    const last = Number(sessionStorage.getItem(key) || 0);
    if (now - last < 1500) return;
    sessionStorage.setItem(key, String(now));
  } catch {
    // ignore
  }

  supabase
    .from('page_views')
    .insert({ path: pathname, visitor_id: visitorId })
    .then(({ error }) => {
      if (error) console.warn('[trackPageView]', error.message);
    });
}
