import { env } from 'node:process';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Use POST to publish SEO settings.' });
  }

  const authorization = request.headers.authorization || '';
  if (!/^Bearer [^\s]+$/.test(authorization)) {
    return response.status(401).json({ error: 'Sign in to publish SEO settings.' });
  }

  const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, SEO_DEPLOY_HOOK_URL, SEO_FETCH_PUBLISHED } = env;
  if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY || !SEO_DEPLOY_HOOK_URL || SEO_FETCH_PUBLISHED !== 'true') {
    return response.status(503).json({ error: 'SEO deployment is not configured.' });
  }

  try {
    const permission = await fetch(new URL('/rest/v1/rpc/is_site_admin', VITE_SUPABASE_URL), {
      method: 'POST',
      headers: { apikey: VITE_SUPABASE_ANON_KEY, Authorization: authorization, 'Content-Type': 'application/json' },
      body: '{}',
      signal: AbortSignal.timeout(5000),
    });
    if (permission.status === 401 || permission.status === 403) {
      return response.status(403).json({ error: 'Staff access is required.' });
    }
    if (!permission.ok) throw new Error('Could not check staff access');
    if (await permission.json() !== true) {
      return response.status(403).json({ error: 'Staff access is required.' });
    }

    const deployment = await fetch(SEO_DEPLOY_HOOK_URL, {
      method: 'POST',
      redirect: 'error',
      signal: AbortSignal.timeout(5000),
    });
    if (!deployment.ok) throw new Error('Deploy hook rejected the request');

    return response.status(202).json({ accepted: true });
  } catch {
    return response.status(502).json({ error: 'Could not request a website build.' });
  }
}
