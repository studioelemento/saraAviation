import { supabase, isSupabaseConfigured } from './supabase';

/** Same Google Apps Script URL the site already uses */
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwGGJFr9kFVDeBH-RqXpelU25h1mvMREW4hqBdBh2JNp5w9B2vbmL1L3vICILIFBs2G/exec';

/**
 * Map the existing form payload into a Supabase leads row.
 * Keeps Google Sheets fields as they are today.
 */
function toSupabaseRow(sheetsBody, sourceKey) {
  const first = sheetsBody.firstName || '';
  const last = sheetsBody.lastName || '';
  const combinedName = [first, last].filter(Boolean).join(' ').trim();

  return {
    name: sheetsBody.name || combinedName || null,
    email: sheetsBody.email || null,
    phone: sheetsBody.phone || null,
    subject: sheetsBody.subject || sheetsBody.interest || sheetsBody.course || null,
    message: sheetsBody.message || null,
    source: sourceKey,
    course: sheetsBody.course || null,
    education: sheetsBody.education || null,
    status: 'new',
  };
}

async function saveToGoogleSheets(sheetsBody) {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(sheetsBody),
  });
  return true;
}

async function saveToSupabase(sheetsBody, sourceKey) {
  if (!isSupabaseConfigured) {
    console.warn(
      '[submitLead] Supabase not configured — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local'
    );
    return { ok: false, skipped: true };
  }

  const row = toSupabaseRow(sheetsBody, sourceKey);
  const { error } = await supabase.from('leads').insert(row);

  if (error) {
    console.error('[submitLead] Supabase insert failed:', error);
    return { ok: false, error };
  }

  return { ok: true };
}

/**
 * Always tries BOTH destinations:
 * 1) Google Sheets (existing workflow)
 * 2) Supabase leads table (admin dashboard /admin/leads)
 *
 * One failing does not block the other.
 *
 * @param {object} sheetsBody - exact JSON the form used to send to Google Script
 * @param {'contact'|'enrollment'|'career'|'coming_soon'} sourceKey
 */
export async function submitLead(sheetsBody, sourceKey) {
  const [sheetsResult, supabaseResult] = await Promise.allSettled([
    saveToGoogleSheets(sheetsBody),
    saveToSupabase(sheetsBody, sourceKey),
  ]);

  const sheetsSent = sheetsResult.status === 'fulfilled';
  if (!sheetsSent) {
    console.error('[submitLead] Google Sheets failed:', sheetsResult.reason);
  }

  const supabaseValue =
    supabaseResult.status === 'fulfilled' ? supabaseResult.value : { ok: false, error: supabaseResult.reason };
  const supabaseOk = Boolean(supabaseValue?.ok);

  // Forms still show success if Sheets worked (current site behavior).
  // Admin only gets the lead when Supabase keys + leads table are set up.
  return {
    sheetsSent,
    supabaseOk,
    supabaseSkipped: Boolean(supabaseValue?.skipped),
    supabaseError: supabaseValue?.error || null,
  };
}
