import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://3.85.35.111:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const esLogin = err.config?.url?.includes("/auth/login");
    if (err.response?.status === 401 && !esLogin) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;