import axios from 'axios';

// Create a shared Axios instance for all API requests.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let inMemoryAccessToken = null;
let activeRefreshPromise = null;
let refreshMode = 'user';
let sessionExpiredHandler = null;

export const setAccessToken = (token) => {
  inMemoryAccessToken = token;
};

export const clearAccessToken = () => {
  inMemoryAccessToken = null;
};

export const setRefreshMode = (mode) => {
  refreshMode = mode === 'mp' ? 'mp' : 'user';
};

export const registerSessionExpiredHandler = (handler) => {
  sessionExpiredHandler = handler;
};

const refreshEndpoints = {
  user: '/auth/refreshtoken',
  mp: '/auth/refreshmptoken',
};

const requestRefreshToken = async () => {
  const endpoint = refreshMode === 'mp' ? refreshEndpoints.mp : refreshEndpoints.user;

  try {
    return await apiClient.get(endpoint);
  } catch (error) {
    if (error.response?.status === 401) {
      throw error;
    }
    throw error;
  }
};

apiClient.interceptors.request.use(
  (config) => {
    if (inMemoryAccessToken) {
      config.headers.Authorization = `Bearer ${inMemoryAccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const requestUrl = originalRequest.url || '';
    const authEndpoints = ['/auth/login', '/auth/register', '/auth/loginmp', '/auth/registermp'];
    const isAuthEndpoint = authEndpoints.some(
      (endpoint) => requestUrl === endpoint || requestUrl.endsWith(endpoint),
    );

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (requestUrl.includes('/auth/refreshtoken') || requestUrl.includes('/auth/refreshmptoken')) {
      clearAccessToken();
      if (typeof sessionExpiredHandler === 'function') {
        sessionExpiredHandler();
      }
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!activeRefreshPromise) {
      activeRefreshPromise = requestRefreshToken()
        .then((response) => {
          const newToken = response.data?.accessToken;
          if (!newToken) {
            throw new Error('Refresh response is missing accessToken');
          }
          setAccessToken(newToken);
          return newToken;
        })
        .catch((refreshError) => {
          if (refreshError.response?.status === 401) {
            clearAccessToken();
            if (typeof sessionExpiredHandler === 'function') {
              sessionExpiredHandler();
            }
          }
          throw refreshError;
        })
        .finally(() => {
          activeRefreshPromise = null;
        });
    }

    try {
      const newToken = await activeRefreshPromise;
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
