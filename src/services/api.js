import axios from 'axios';
import { deleteAuthenticated, deleteToken, getToken, setToken } from '@services/auth';
import { deleteUser } from '@/services/auth';

const api = axios.create({
  baseURL: 'https://localhost:7136/api',
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(getToken());
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err?.config;

    if (originalConfig?.url !== '/User/login' && err?.response) {
      // Access Token was expired
      if (err?.response?.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;

        const token = JSON.parse(getToken());

        try {
          const rs = await api.post('/User/refresh', {
            refreshToken: token.refreshToken,
            accessToken: token.accessToken,
          });

          setToken(rs.data);

          return api(originalConfig);
        } catch (_error) {
          await api.post('/User/logout', {
            refreshToken: token.refreshToken,
            accessToken: token.accessToken,
          });

          deleteToken();
          deleteUser();
          deleteAuthenticated();

          window.location.href = '/login';
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
