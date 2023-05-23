import axios from 'axios';
import Cookies from 'js-cookie';

// const BASE_URL = process.env.NODE_ENV === 'development'
//   ? 'http://localhost:3001'
//   : 'http://example.com';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const composeToken = (token) => token
  ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  : [];

const apiCall = (url, method, body = {}, token = '') => axios({
  url: `${BASE_URL}${url}`,
  method,
  data: body,
  headers: {
    ...composeToken(token)
  },
});

// allows backend to set cookies values on client
axios.defaults.withCredentials = true;

// to get a new access token from server when it's expired
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (
      error.response.status === 403 &&
      originalConfig.url === '/refresh'
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 403 && !originalConfig._retry) {
      originalConfig._retry = true;
      const res = await apiCall('/refresh', 'get');
      // console.log(res.data.accessToken);
      Cookies.set('token', res?.data?.accessToken, {
        sameSite: 'none',
        secure: true
      });
      originalConfig.headers = {
        ...originalConfig.headers,
        Authorization: `Bearer ${res?.data?.accessToken}`
      };
      return axios(originalConfig);
    };
    return Promise.reject(error);
  }
);

export default apiCall;