import axios from "axios";
import { clearAuthData, getAuthToken } from "../services/authStorage";

const DEFAULT_API_BASE_URL = "https://tutoflex.naturalaloe.app";
const AUTH_DEBUG = __DEV__;

const resolveApiBaseUrl = (): string => {
  const configuredBaseUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  const rawBaseUrl =
    configuredBaseUrl && configuredBaseUrl.length > 0
      ? configuredBaseUrl
      : DEFAULT_API_BASE_URL;

  const normalizedBase = rawBaseUrl.replace(/\/+$/, "");
  return normalizedBase.endsWith("/v2") ? normalizedBase : `${normalizedBase}/v2`;
};

const axiosInstance = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 15000,
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();

      if (token) {
        const headers = axios.AxiosHeaders.from(config.headers);
        headers.set("Authorization", `Bearer ${token}`);
        config.headers = headers;
      }

      if (AUTH_DEBUG) {
        console.log("[api] request", {
          method: (config.method || "get").toUpperCase(),
          url: config.url,
          hasToken: Boolean(token),
        });
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
      if (AUTH_DEBUG) {
        console.log("[api] 401 response -> clearAuthData", {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
        });
      }
      await clearAuthData();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
