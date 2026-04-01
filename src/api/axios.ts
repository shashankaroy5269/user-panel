import axios from "axios";
import { Cookies } from "react-cookie";

const baseURL = "http://localhost:4000";
const cookie = new Cookies();

const AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});


AxiosInstance.interceptors.request.use(
  (config: any) => {
    let token = cookie.get("token");


    if (!token && typeof window !== "undefined") {
      const match = document.cookie.match(/(^| )token=([^;]+)/);
      if (match) token = match[2];
    }


    if (!token && typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers = config.headers || {};

      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["x-access-token"] = token;
      config.headers["Accept"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);




let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};




AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;


      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return AxiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {

        const res = await axios.post(
          `${baseURL}/api/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data.token;


        if (typeof window !== "undefined") {
          localStorage.setItem("token", newToken);
        }


        AxiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;

        processQueue(null, newToken);


        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return AxiosInstance(originalRequest);

      } catch (err) {
        processQueue(err, null);


        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;