import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const LEAD_SOURCES = [
  { value: 'all', label: 'All sources' },
  { value: 'contact', label: 'Contact' },
  { value: 'enrollment', label: 'Enrollment' },
  { value: 'career', label: 'Career' },
  { value: 'coming_soon', label: 'Coming soon' },
];

export const LEAD_STATUSES = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
];

export function sourceLabel(source) {
  return LEAD_SOURCES.find((s) => s.value === source)?.label || source || '—';
}

/**
 * @param {{ source?: string, status?: string, search?: string }} filters
 */
export async function fetchLeads(filters = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new Error('Supabase is not configured') };
  }

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.source && filters.source !== 'all') {
    query = query.eq('source', filters.source);
  }

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[leadsApi] fetchLeads failed:', error);
    return { data: [], error };
  }

  const search = (filters.search || '').trim().toLowerCase();
  const filtered = search
    ? (data || []).filter((lead) => {
        const haystack = [lead.name, lead.email, lead.phone, lead.subject, lead.message]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(search);
      })
    : data || [];

  return { data: filtered, error: null };
}

export async function updateLeadStatus(id, status) {
  if (!isSupabaseConfigured) {
    return { error: new Error('Supabase is not configured') };
  }

  const { error } = await supabase.from('leads').update({ status }).eq('id', id);

  if (error) {
    console.error('[leadsApi] updateLeadStatus failed:', error);
  }

  return { error };
}

export async function fetchLeadStats() {
  if (!isSupabaseConfigured) {
    return {
      total: 0,
      newCount: 0,
      bySource: {},
      latest: [],
      error: new Error('Supabase is not configured'),
    };
  }

  const [totalRes, newRes, latestRes, sourceRes] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase
      .from('leads')
      .select('id, name, email, phone, source, status, subject, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('leads').select('source').limit(2000),
  ]);

  const error = totalRes.error || newRes.error || latestRes.error || sourceRes.error;
  if (error) {
    console.error('[leadsApi] fetchLeadStats failed:', error);
    return { total: 0, newCount: 0, bySource: {}, latest: [], error };
  }

  const bySource = {};
  for (const row of sourceRes.data || []) {
    bySource[row.source] = (bySource[row.source] || 0) + 1;
  }

  return {
    total: totalRes.count || 0,
    newCount: newRes.count || 0,
    bySource,
    latest: latestRes.data || [],
    error: null,
  };
}
