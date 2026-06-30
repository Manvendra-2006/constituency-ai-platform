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

  const isAuthenticated = Boolean(accessToken && user);

  useEffect(() => {
    registerSessionExpiredHandler(() => {
      const redirectPath = getLoginPath(user?.isMp);
      clearAuthState();
      navigate(redirectPath);
    });
  }, [navigate, user?.isMp]);

  const clearAuthState = () => {
    setAccessTokenState(null);
    setUser(null);
    clearAccessToken();
  };

  const loginUser = async ({ email, password }) => {
    setRefreshMode('user');

    const response = await apiClient.post('/login', { email, password });
    const token = response.data?.accessToken;

    if (!token) {
      throw new Error('Login did not return an access token');
    }

    setClientAccessToken(token);
    setAccessTokenState(token);

    const profileResponse = await apiClient.get('/getMe');
    const profile = profileResponse.data?.userProfile;

    setUser({ ...profile, isMp: false });
    return profile;
  };

  const loginMp = async ({ email, password }) => {
    setRefreshMode('mp');

    const response = await apiClient.post('/loginmp', { email, password });
    const token = response.data?.accessToken;

    if (!token) {
      throw new Error('Login did not return an access token');
    }

    setClientAccessToken(token);
    setAccessTokenState(token);

    const profileResponse = await apiClient.get('/mpProfile');
    const profile = profileResponse.data?.userProfile;

    setUser({ ...profile, isMp: true });
    return profile;
  };

  const logout = async () => {
    try {
      const logoutEndpoint = user?.isMp ? '/logoutmp' : '/logout';
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
      loginUser,
      loginMp,
      logout,
      setAccessToken,
    }),
    [accessToken, user, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
