import { BACKEND_URL } from '../config/apiConfig';

export async function getProfile(userId, token = null) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${BACKEND_URL}/api/profile/${userId}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function updateProfile(userId, data, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BACKEND_URL}/api/profile/${userId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  return await res.json();
}

export default { getProfile, updateProfile };
