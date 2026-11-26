import { setLocalNews } from '../lib/localNewsPublishing';
import { supabase } from '../lib/supabase';
import { isLocalAdminSession } from './adminAuth';

const localKey = 'sara_admin_content_drafts:';
export const usesContentWorkflow = (table) => table === 'courses' || table === 'news';

function readLocalDrafts(table) {
  return JSON.parse(localStorage.getItem(localKey + table) || '{}');
}

export async function loadDrafts(table) {
  if (isLocalAdminSession()) return readLocalDrafts(table);
  const { data, error } = await supabase.from('content_drafts').select('id,payload').eq('section', table);
  if (error?.code === 'PGRST205') throw new Error('Apply supabase/content_workflow.sql to enable drafts and publishing.');
  if (error) throw error;
  return Object.fromEntries(data.map(({ id, payload }) => [id, payload]));
}

export async function saveDraft(table, id, payload) {
  if (isLocalAdminSession()) {
    localStorage.setItem(localKey + table, JSON.stringify({ ...readLocalDrafts(table), [id]: payload }));
    return;
  }
  const { error } = await supabase.from('content_drafts').upsert({ section: table, id, payload });
  if (error) throw error;
}

export async function discardDraft(table, id) {
  if (isLocalAdminSession()) {
    const drafts = readLocalDrafts(table);
    delete drafts[id];
    localStorage.setItem(localKey + table, JSON.stringify(drafts));
    return;
  }
  const { error } = await supabase.from('content_drafts').delete().match({ section: table, id });
  if (error) throw error;
}

export async function publishContent(table, id, payload, publish) {
  if (table === 'news' && isLocalAdminSession()) {
    setLocalNews(id, { ...payload, id, published: publish });
    if (publish) await discardDraft(table, id);
    return;
  }
  const { error } = await supabase.rpc('publish_content', {
    p_section: table,
    p_id: id,
    p_payload: payload,
    p_publish: publish,
  });
  if (error) throw error;
}

export async function loadRevisions(table, id) {
  const { data, error } = await supabase.from('content_revisions')
    .select('revision_id,payload,action,changed_at')
    .match({ section: table, id })
    .order('revision_id', { ascending: false })
    .limit(30);
  if (error) throw error;
  return data;
}
