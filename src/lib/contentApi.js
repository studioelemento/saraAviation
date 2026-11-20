import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Generic table helpers used by admin + public pages.
 * Public pages should pass { publishedOnly: true }.
 */

/** Smaller payloads for public pages (faster on free-tier). */
const PUBLIC_SELECT = {
  news: 'id, category, title, date_label, image_url, excerpt, sort_order, created_at',
  courses:
    'id, title, image_url, duration, eligibility, accreditation, description, what_you_can_learn, is_govt, sort_order, created_at',
  gallery: 'id, title, image_url, sort_order, created_at',
  team: 'id, name, role, experience, image_url, bio, sort_order, created_at',
  jobs: 'id, title, experience, location, type, responsibilities, skills, sort_order, created_at',
};

export async function listRows(table, { publishedOnly = false } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new Error('Supabase not configured') };
  }

  const columns = publishedOnly && PUBLIC_SELECT[table] ? PUBLIC_SELECT[table] : '*';
  let query = supabase
    .from(table)
    .select(columns)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (publishedOnly) {
    query = query.eq('published', true);
  }

  const { data, error } = await query;
  if (error) console.error(`[contentApi] list ${table}:`, error);
  return { data: data || [], error };
}

export async function createRow(table, row) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await supabase.from(table).insert(row).select().single();
  if (error) console.error(`[contentApi] create ${table}:`, error);
  return { data, error };
}

export async function updateRow(table, id, row) {
  if (!isSupabaseConfigured) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await supabase.from(table).update(row).eq('id', id).select().single();
  if (error) console.error(`[contentApi] update ${table}:`, error);
  return { data, error };
}

export async function deleteRow(table, id) {
  if (!isSupabaseConfigured) return { error: new Error('Supabase not configured') };
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) console.error(`[contentApi] delete ${table}:`, error);
  return { error };
}

/** Map DB news → shape used by NewsPage / LatestNews */
export function mapNewsRow(row) {
  return {
    id: row.id,
    category: row.category || 'Industry',
    title: row.title,
    date: row.date_label || '',
    image: row.image_url || '',
    excerpt: row.excerpt || '',
  };
}

/** Map DB course → shape used by CoursesPage */
export function mapCourseRow(row) {
  return {
    id: row.id,
    title: row.title,
    image: row.image_url || '',
    duration: row.duration || '',
    eligibility: Array.isArray(row.eligibility) ? row.eligibility : [],
    accreditation: Array.isArray(row.accreditation) ? row.accreditation : [],
    description: row.description || '',
    whatYouCanLearn: Array.isArray(row.what_you_can_learn) ? row.what_you_can_learn : [],
    isGovt: Boolean(row.is_govt),
  };
}

export function mapGalleryRow(row) {
  return {
    id: row.id,
    title: row.title,
    url: row.image_url,
  };
}

export function mapTeamRow(row) {
  return {
    id: row.id,
    name: row.name,
    role: row.role || '',
    experience: row.experience || '',
    image: row.image_url || '',
    bio: row.bio || '',
  };
}

export function mapJobRow(row) {
  return {
    id: row.id,
    title: row.title,
    experience: row.experience || '',
    location: row.location || '',
    type: row.type || 'Full-Time',
    responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
    skills: Array.isArray(row.skills) ? row.skills : [],
  };
}
