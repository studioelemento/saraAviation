import { supabase } from '../lib/supabase';

const localSessionKey = 'sara_local_admin';

function localTestPassword() {
  if (!import.meta.env.DEV || !['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
    return undefined;
  }
  return import.meta.env.VITE_LOCAL_ADMIN_PASSWORD || undefined;
}

export function isLocalAdminSession() {
  return Boolean(localTestPassword() && sessionStorage.getItem(localSessionKey) === '1');
}

export async function checkStaffAccess() {
  if (isLocalAdminSession()) return true;
  if (!supabase) return false;
  const { data } = await supabase.rpc('is_site_admin');
  return data === true;
}

export async function loginAdmin(password) {
  const testPassword = localTestPassword();
  if (testPassword && password === testPassword) {
    sessionStorage.setItem(localSessionKey, '1');
    return;
  }
  if (!supabase) throw new Error('Supabase sign-in is not configured.');
  const email = import.meta.env.VITE_ADMIN_EMAIL?.trim();
  if (!email) throw new Error(testPassword ? 'Incorrect password. Try again.' : 'The admin account email has not been configured.');

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error?.code === 'invalid_credentials') throw new Error('Incorrect password. Try again.');
  if (error) throw error;

  if (!(await checkStaffAccess())) {
    await logoutAdmin();
    throw new Error('This account does not have staff access.');
  }
}

export async function logoutAdmin() {
  if (isLocalAdminSession()) {
    sessionStorage.removeItem(localSessionKey);
    return;
  }
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) throw error;
}
