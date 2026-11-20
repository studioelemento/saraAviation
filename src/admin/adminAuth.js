const SESSION_KEY = 'sara_admin';

/** @returns {boolean} */
export function isAdminLoggedIn() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Compare password to VITE_ADMIN_PASSWORD and set session flag.
 * @param {string} password
 * @returns {boolean} true if login succeeded
 */
export function loginAdmin(password) {
  const expected = import.meta.env.VITE_ADMIN_PASSWORD;

  if (!expected) {
    console.error('[adminAuth] VITE_ADMIN_PASSWORD is missing from .env.local');
    return false;
  }

  if (password !== expected) {
    return false;
  }

  try {
    sessionStorage.setItem(SESSION_KEY, '1');
    return true;
  } catch (error) {
    console.error('[adminAuth] Could not write sessionStorage', error);
    return false;
  }
}

export function logoutAdmin() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('[adminAuth] Could not clear sessionStorage', error);
  }
}
