import axios from 'axios';

// Create a shared Axios instance for auth requests.
const apiClient = axios.create({
  baseURL: 'http://localhost:6700/api/auth',
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
  user: '/refreshtoken',
  mp: '/refreshmptoken',
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

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (requestUrl.includes('/refreshtoken') || requestUrl.includes('/refreshmptoken')) {
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
          if (refreshError.response?.status === 401 && typeof sessionExpiredHandler === 'function') {
            sessionExpiredHandler();
          }
          throw refreshError;
        })
        .finally(() => {
          activeRefreshPromise = null;
        });
    }

    try {
      const newToken = await activeRefreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
