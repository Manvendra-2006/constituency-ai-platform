import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, {
  clearAccessToken,
  registerSessionExpiredHandler,
  setAccessToken as setClientAccessToken,
  setRefreshMode,
} from '../api/axios.js';

export const AuthContext = createContext(null);

const getLoginPath = (isMp) => (isMp ? '/mp/login' : '/login');

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const isAuthenticated = Boolean(accessToken && user);

  useEffect(() => {
    registerSessionExpiredHandler(() => {
      if (!isAuthReady) {
        return;
      }

      const redirectPath = getLoginPath(user?.isMp);
      clearAuthState();
      navigate(redirectPath);
    });
  }, [navigate, user?.isMp, isAuthReady]);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const path = typeof window !== 'undefined' ? window.location.pathname : '';
        const roleHint = path.startsWith('/mp') ? 'mp' : 'user';
        const refreshEndpoint = roleHint === 'mp' ? '/auth/refreshmptoken' : '/auth/refreshtoken';
        const profileEndpoint = roleHint === 'mp' ? '/auth/mpProfile' : '/auth/getMe';

        setRefreshMode(roleHint);
        console.log('[Auth] restoring session with', refreshEndpoint);

        const refreshResponse = await apiClient.get(refreshEndpoint);
        const token = refreshResponse.data?.accessToken;

        if (!token) {
          throw new Error('Refresh did not return an access token');
        }

        setClientAccessToken(token);
        setAccessTokenState(token);

        const profileResponse = await apiClient.get(profileEndpoint);
        const profile = profileResponse.data?.userProfile || profileResponse.data?.user || null;

        if (!profile) {
          throw new Error('Profile could not be restored');
        }

        if (!isMounted) {
          return;
        }

        setUser({ ...profile, isMp: roleHint === 'mp' });
        console.log('[Auth] session restored successfully');
      } catch (error) {
        console.error('[Auth] session restore failed', error);
        if (isMounted) {
          clearAuthState();
        }
      } finally {
        if (isMounted) {
          setIsAuthReady(true);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearAuthState = () => {
    setAccessTokenState(null);
    setUser(null);
    clearAccessToken();
  };

  const loginUser = async ({ email, password }) => {
    setRefreshMode('user');

    const response = await apiClient.post('/auth/login', { email, password });
    const token = response.data?.accessToken;

    if (!token) {
      throw new Error('Login did not return an access token');
    }

    setClientAccessToken(token);
    setAccessTokenState(token);

    const profileResponse = await apiClient.get('/auth/getMe');
    const profile = profileResponse.data?.userProfile;

    setUser({ ...profile, isMp: false });
    return profile;
  };

  const loginMp = async ({ email, password }) => {
    setRefreshMode('mp');
    console.log('[Auth] Starting MP login request');

    const response = await apiClient.post('/auth/loginmp', { email, password });
    console.log('[Auth] MP login response received', response.data);

    const token = response.data?.accessToken;
    console.log('[Auth] MP login token present', Boolean(token));

    if (!token) {
      throw new Error('Login did not return an access token');
    }

    setClientAccessToken(token);
    setAccessTokenState(token);
    console.log('[Auth] MP access token stored in memory');

    const profileResponse = await apiClient.get('/auth/mpProfile');
    console.log('[Auth] MP profile response received', profileResponse.data);

    const profile = profileResponse.data?.userProfile;
    setUser({ ...profile, isMp: true });
    console.log('[Auth] MP auth state ready', { isMp: true, hasProfile: Boolean(profile) });
    return profile;
  };

  const logout = async () => {
    try {
      const logoutEndpoint = user?.isMp ? '/auth/logoutmp' : '/auth/logout';
      await apiClient.get(logoutEndpoint);
    } catch (err) {
      // Ignore logout errors, but clear local auth state anyway.
    }

    clearAuthState();
    navigate(getLoginPath(user?.isMp));
  };

  const setAccessToken = (token) => {
    setClientAccessToken(token);
    setAccessTokenState(token);
  };

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated,
      isAuthReady,
      loginUser,
      loginMp,
      logout,
      setAccessToken,
    }),
    [accessToken, user, isAuthenticated, isAuthReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
