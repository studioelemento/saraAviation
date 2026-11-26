export const siteName = 'Sara Aviation Institute';
export const defaultSiteUrl = 'https://saraaviation.in';
export const defaultShareImage = '/assets/logo/Sara%20Aviation%20Logo%20Blue%20Orange.png';

const pages = [
  ['/', 'Aviation Training in Bengaluru', 'Explore aviation training, career pathways and admissions at Sara Aviation Institute in Bengaluru.'],
  ['/ctl', 'CTL Program', 'Explore the CTL program, its foundation session, career pathways and training phases.'],
  ['/about', 'About Us', 'Learn about Sara Aviation Institute and its approach to preparing students for aviation careers.'],
  ['/courses', 'Aviation Courses', 'Explore Sara Aviation courses, including eligibility, duration and what you can learn in each program.'],
  ['/news', 'Aviation News and Institute Updates', 'Read aviation industry news and the latest updates from Sara Aviation Institute.'],
  ['/gallery', 'Campus and Student Gallery', 'See photos of the campus, student activities and training at Sara Aviation Institute.'],
  ['/student-hub', 'Student Hub', 'Explore the student hub at Sara Aviation Institute.'],
  ['/team', 'Meet Our Team', 'Meet the instructors and team at Sara Aviation Institute.'],
  ['/careers', 'Jobs at Sara Aviation', 'Browse open roles, job requirements and application information at Sara Aviation Institute.'],
  ['/contact', 'Contact and Admissions Inquiries', 'Contact Sara Aviation Institute in Bengaluru for admissions and course inquiries.'],
  ['/placement', 'Placement and Career Support', 'Learn about placement support and airline partners at Sara Aviation Institute.'],
  ['/privacy-policy', 'Privacy Policy', 'Read the Sara Aviation Institute privacy policy.'],
];

export const publicPaths = pages.map(([path]) => path);
const pageByPath = new Map(pages.map(([path, title, description]) => [path, { title, description }]));

export function resolveShareImage(value, siteUrl) {
  const relative = value?.startsWith('/');
  if (!relative && !value?.startsWith('https://')) return undefined;
  try {
    const url = new URL(value, siteUrl);
    if (url.username || url.password) return undefined;
    if (relative && url.origin !== new URL(siteUrl).origin) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

export function getPageSeo(pathname, siteUrl = defaultSiteUrl, overrides = {}) {
  const path = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const article = /^\/news\/[a-z0-9-]+$/.test(path) && Object.hasOwn(overrides, path);
  const page = pageByPath.get(path) || (article ? pageByPath.get('/news') : undefined);
  const admin = path === '/admin' || path.startsWith('/admin/');
  const settings = page ? overrides[path] : undefined;
  const title = page?.title ?? (admin ? 'Admin' : 'Page Not Found');

  return {
    title: settings?.title?.trim() || `${title} | ${siteName}`,
    description: settings?.description?.trim() || page?.description,
    canonical: page ? new URL(path, siteUrl).href : undefined,
    image: page ? (resolveShareImage(settings?.image_url?.trim(), siteUrl) || new URL(defaultShareImage, siteUrl).href) : undefined,
    robots: page ? undefined : 'noindex',
    type: article ? 'article' : 'website',
  };
}

export function getNewsSeoOverride(post, siteUrl = defaultSiteUrl) {
  return {
    title: post.seo_title?.trim() || (post.title?.trim() ? post.title.trim() + ' | ' + siteName : ''),
    description: post.seo_description?.trim() || post.excerpt?.trim().slice(0, 320) || '',
    image_url: resolveShareImage(post.seo_image_url?.trim(), siteUrl)
      || resolveShareImage(post.image_url?.trim(), siteUrl),
  };
}
