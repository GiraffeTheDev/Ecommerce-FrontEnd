import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8002/",
});
instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  async function (error) {
    // Do something with response error
    const status = error?.response?.status;
    const originalRequest = error.config;
    switch (status) {
      // authentication (token related issues)
      case 401: {
        // try {
        //   const { refresh_token } = getToken();
        //   const response = await refreshAccessToken(refresh_token);
        //   const newAccessToken = response.data.accessToken;
        //   localStorage.setItem("access_token", newAccessToken);
        //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //   return instance(originalRequest);
        // } catch (refreshError) {
        //   console.error("Error refreshing token:", refreshError);
        //   // Đăng xuất người dùng nếu không thể làm mới token
        //   // logout();
        //   throw refreshError;
        // }
        return Promise.reject(error);
      }

      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(error);
      }

      // bad request
      case 400: {
        return Promise.reject(error);
      }

      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  }
);
export { instance };
