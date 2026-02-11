import { BACKEND_URL } from '../config/apiConfig';

export async function login({ email, password }) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    return await res.json();
  } catch (e) {
    // fallback: return mock user for offline/dev
    return { user: { id: 'guest', name: 'Guest User', email }, token: null };
  }
}

export async function register({ name, email, password }) {
  const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return await res.json();
}

export default { login, register };
