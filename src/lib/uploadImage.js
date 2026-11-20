import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Upload an image file to the public `media` bucket.
 * @param {File} file
 * @param {string} folder e.g. news | gallery | team | courses
 * @returns {Promise<string>} public URL
 */
export async function uploadImage(file, folder = 'misc') {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured');
  }

  if (!file) {
    throw new Error('No file selected');
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    console.error('[uploadImage]', error);
    throw error;
  }

  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}
