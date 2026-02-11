import React, { createContext, useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage';
import { setToken, getToken, deleteToken } from '../utils/secureStore';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null, token: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      const stored = await getItem('auth');
      const token = await getToken();
      if (stored && stored.isAuthenticated) {
        setAuth({ ...stored, token: token || null });
      }
      setLoading(false);
    };

    loadAuth();
  }, []);

  const login = async (userObj, token = null) => {
    const newAuth = { isAuthenticated: true, user: userObj, token };
    setAuth(newAuth);
    await setItem('auth', { isAuthenticated: true, user: userObj });
    if (token) await setToken(token);
  };

  const logout = async () => {
    const newAuth = { isAuthenticated: false, user: null, token: null };
    setAuth(newAuth);
    await setItem('auth', newAuth);
    await deleteToken();
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
