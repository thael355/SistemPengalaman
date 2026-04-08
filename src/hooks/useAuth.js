import { useMemo } from 'react';

const TOKEN_KEY = 'auth_token';

export function useAuth() {
  const token = useMemo(() => localStorage.getItem(TOKEN_KEY), []);

  const saveToken = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  return {
    token,
    saveToken,
    clearToken,
  };
}
