import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { uploadImage } from '../lib/uploadImage';
import { listRows } from '../lib/contentApi';
import { newsArticles } from '../data/newsData';
import { coursesData } from '../data/coursesData';
import { fallbackGalleryImages } from '../data/galleryData';
import { fallbackTeamMembers } from '../data/teamData';
import { fallbackJobOpenings } from '../data/jobsData';

function slug(text) {
  return String(text || 'item')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

/**
 * Fetch a local/remote image and upload it to Supabase Storage.
 * Falls back to the original URL if upload fails.
 */
async function ensureStoredImage(imageUrl, folder, fileBase) {
  if (!imageUrl) return null;

  if (String(imageUrl).includes('/storage/v1/object/public/')) {
    return imageUrl;
  }

  try {
    const absolute =
      String(imageUrl).startsWith('http') || String(imageUrl).startsWith('blob:') || String(imageUrl).startsWith('data:')
        ? imageUrl
        : new URL(imageUrl, window.location.origin).href;

    const response = await fetch(absolute);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const blob = await response.blob();
    const ext = (blob.type && blob.type.split('/')[1]) || 'jpg';
    const file = new File([blob], `${slug(fileBase)}.${ext}`, { type: blob.type || 'image/jpeg' });
    return await uploadImage(file, folder);
  } catch (error) {
    console.warn('[seed] image upload failed, keeping original URL', imageUrl, error);
    return imageUrl;
  }
}

async function tableCount(table) {
  const { data, error } = await listRows(table);
  if (error) throw error;
  return data.length;
}

async function seedTable(table, buildRows, { force }) {
  const count = await tableCount(table);
  if (count > 0 && !force) {
    return { table, skipped: true, reason: `already has ${count} row(s)`, inserted: 0 };
  }

  if (count > 0 && force) {
    const { error } = await supabase.from(table).delete().not('id', 'is', null);
    if (error) throw error;
  }

  const rows = await buildRows();
  if (!rows.length) {
    return { table, skipped: true, reason: 'no source rows', inserted: 0 };
  }

  const { error } = await supabase.from(table).insert(rows);
  if (error) throw error;

  return { table, skipped: false, inserted: rows.length };
}

/**
 * Import current hardcoded website content into Supabase.
 * Safe by default: skips tables that already have rows.
 */
export async function seedHardcodedContent({ force = false, onProgress } = {}) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Check .env.local keys.');
  }

  const report = (message) => {
    if (onProgress) onProgress(message);
  };

  const results = [];

  report('Importing news…');
  results.push(
    await seedTable(
      'news',
      async () => {
        const rows = [];
        for (let i = 0; i < newsArticles.length; i += 1) {
          const item = newsArticles[i];
          const image_url = await ensureStoredImage(item.image, 'news', item.title);
          rows.push({
            title: item.title,
            category: item.category || 'Industry',
            date_label: item.date || '',
            excerpt: item.excerpt || '',
            image_url,
            published: true,
            sort_order: i,
          });
        }
        return rows;
      },
      { force }
    )
  );

  report('Importing courses…');
  results.push(
    await seedTable(
      'courses',
      async () => {
        const rows = [];
        for (let i = 0; i < coursesData.length; i += 1) {
          const item = coursesData[i];
          const image_url = await ensureStoredImage(item.image, 'courses', item.title);
          rows.push({
            title: item.title,
            image_url,
            duration: item.duration || '',
            description: item.description || '',
            eligibility: item.eligibility || [],
            accreditation: item.accreditation || [],
            what_you_can_learn: item.whatYouCanLearn || [],
            is_govt: Boolean(item.isGovt),
            published: true,
            sort_order: i,
          });
        }
        return rows;
      },
      { force }
    )
  );

  report('Importing gallery…');
  results.push(
    await seedTable(
      'gallery',
      async () => {
        const rows = [];
        for (let i = 0; i < fallbackGalleryImages.length; i += 1) {
          const item = fallbackGalleryImages[i];
          const image_url = await ensureStoredImage(item.url, 'gallery', item.title);
          rows.push({
            title: item.title,
            image_url,
            published: true,
            sort_order: i,
          });
        }
        return rows;
      },
      { force }
    )
  );

  report('Importing team…');
  results.push(
    await seedTable(
      'team',
      async () => {
        const rows = [];
        for (let i = 0; i < fallbackTeamMembers.length; i += 1) {
          const item = fallbackTeamMembers[i];
          const image_url = await ensureStoredImage(item.image, 'team', item.name);
          rows.push({
            name: item.name,
            role: item.role || '',
            experience: item.experience || '',
            bio: item.bio || '',
            image_url,
            published: true,
            sort_order: i,
          });
        }
        return rows;
      },
      { force }
    )
  );

  report('Importing jobs…');
  results.push(
    await seedTable(
      'jobs',
      async () =>
        fallbackJobOpenings.map((item, i) => ({
          title: item.title,
          experience: item.experience || '',
          location: item.location || '',
          type: item.type || 'Full-Time',
          responsibilities: item.responsibilities || [],
          skills: item.skills || [],
          published: true,
          sort_order: i,
        })),
      { force }
    )
  );

  report('Done');
  return results;
}
