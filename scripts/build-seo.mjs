import { loadEnv } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { defaultSiteUrl, getPageSeo, publicPaths, getNewsSeoOverride, siteName } from '../src/data/pageSeo.js';

const env = loadEnv('production', process.cwd(), 'VITE_');
const siteUrl = new URL(env.VITE_SITE_URL || defaultSiteUrl).origin;
const dist = 'dist';
const overrides = {};
const articlePaths = [];

if (process.env.SEO_FETCH_PUBLISHED === 'true') {
  const [pages, posts] = await Promise.all([
    fetchRows('page_seo', { select: 'path,title,description,image_url' }),
    fetchRows('news', { select: '*', published: 'eq.true', order: 'id.asc' }),
  ]);
  for (const { path, ...fields } of pages) overrides[path] = fields;
  for (const post of posts) {
    if (!/^[a-z0-9-]+$/.test(post.id)) continue;
    const path = '/news/' + post.id;
    articlePaths.push(path);
    overrides[path] = getNewsSeoOverride(post, siteUrl);
  }
}

async function fetchRows(table, filters) {
  const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = env;
  if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
    throw new Error('Supabase URL and public key are required to build published SEO.');
  }
  const url = new URL('/rest/v1/' + table, VITE_SUPABASE_URL);
  url.search = new URLSearchParams(filters).toString();
  const rows = [];
  const limit = 100;
  for (let offset = 0; ; offset += limit) {
    url.searchParams.set('offset', String(offset));
    url.searchParams.set('limit', String(limit));
    const response = await fetch(url, {
      headers: { apikey: VITE_SUPABASE_ANON_KEY },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Could not load ' + table + ' for SEO (HTTP ' + response.status + ').');
    const batch = await response.json();
    rows.push(...batch);
    if (batch.length < limit) return rows;
  }
}
const template = await readFile(join(dist, 'index.html'), 'utf8');
const marker = /<title>[^<]*<\/title>/;

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function render(path) {
  const { title, description, canonical, image, robots, type } = getPageSeo(path, siteUrl, overrides);
  const tags = [`<title>${escapeHtml(title)}</title>`];
  if (robots) tags.push(`<meta name="robots" content="${robots}">`);
  if (canonical) {
    tags.push(
      `<meta name="description" content="${escapeHtml(description)}">`,
      `<link rel="canonical" href="${escapeHtml(canonical)}">`,
      '<meta property="og:type" content="' + type + '">',
      `<meta property="og:site_name" content="${escapeHtml(siteName)}">`,
      `<meta property="og:title" content="${escapeHtml(title)}">`,
      `<meta property="og:description" content="${escapeHtml(description)}">`,
      `<meta property="og:url" content="${escapeHtml(canonical)}">`,
      `<meta property="og:image" content="${escapeHtml(image)}">`,
      '<meta name="twitter:card" content="summary">',
    );
  }
  return template.replace(marker, () => tags.join('\n    '));
}

const indexablePaths = [...publicPaths, ...articlePaths];
await Promise.all(indexablePaths.map(async (path) => {
  const directory = join(dist, path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), render(path));
}));

const sitemap = indexablePaths.map((path) =>
  `  <url><loc>${escapeHtml(new URL(path, siteUrl).href)}</loc></url>`,
).join('\n');

await Promise.all([
  writeFile(join(dist, 'page-seo.json'), JSON.stringify(overrides)),
  writeFile(join(dist, 'news-fallback.html'), render('/news/unavailable')),
  writeFile(join(dist, '404.html'), render('/404')),
  writeFile(join(dist, 'admin.html'), render('/admin')),
  writeFile(join(dist, 'robots.txt'), `User-agent: *\nSitemap: ${siteUrl}/sitemap.xml\n`),
  writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`),
]);
