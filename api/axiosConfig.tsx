import axios from "axios";
import { clearAuthData, getAuthToken } from "../services/authStorage";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://tutoflex.naturalaloe.app/v2",
  timeout: 15000,
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();

      if (token) {
        if (config.headers && typeof config.headers.set === "function") {
          config.headers.set("Authorization", `Bearer ${token}`);
        } else {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }
    } catch {
      console.error("Error al obtener el token de sesión");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo global de errores
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      await clearAuthData();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
