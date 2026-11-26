import { supabase } from '../lib/supabase';

export async function requestSeoDeployment() {
  const { data, error } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (error || !token) throw new Error('Sign in again to request a deployment.');
  const response = await fetch('/api/publish-seo', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.error || 'The deployment endpoint is unavailable.');
  }
}
