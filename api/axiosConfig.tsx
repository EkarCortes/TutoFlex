import axios from "axios";
import { clearAuthData, getAuthToken } from "../services/authStorage";

const DEFAULT_API_BASE_URL = "https://tutoflex.naturalaloe.app";

const ROUTE_REWRITES: Record<string, string> = {
  // Contrato canónico recomendado en v2
  "/users/login": "/login",
  "/users/requestPasswordReset": "/request-password-reset",
  "/users/resetPassword": "/reset-password",
  "/users/getAllUsers": "/users",
  "/users/updateStudent": "/users/me/profile",
  "/users/updateProfesor": "/users/me/profile",
  "/notifications/register-token": "/notifications/tokens",

  // Compatibilidad para endpoints ya actualizados en app
  "/login": "/login",
  "/request-password-reset": "/request-password-reset",
  "/reset-password": "/reset-password",
};

const resolveApiBaseUrl = (): string => {
  const configuredBaseUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  const rawBaseUrl =
    configuredBaseUrl && configuredBaseUrl.length > 0
      ? configuredBaseUrl
      : DEFAULT_API_BASE_URL;

  const normalizedBase = rawBaseUrl.replace(/\/+$/, "");
  return normalizedBase.endsWith("/v2") ? normalizedBase : `${normalizedBase}/v2`;
};

const normalizePath = (url: string): string => {
  const [rawPath] = url.split("?");
  const trimmed = rawPath.trim();
  if (!trimmed) return "/";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
};

const buildUrl = (path: string, originalUrl: string): string => {
  const [, query] = originalUrl.split("?");
  return query ? `${path}?${query}` : path;
};

const isAbsoluteUrl = (url: string): boolean => /^https?:\/\//i.test(url);

const stripV2Prefix = (path: string): string => {
  if (path === "/v2") {
    return "/";
  }
  return path.replace(/^\/v2(?=\/|$)/, "");
};

const rewriteRequestUrl = (originalUrl: string): string => {
  if (isAbsoluteUrl(originalUrl)) {
    return originalUrl;
  }

  const normalizedPath = normalizePath(originalUrl);
  const pathWithoutV2 = stripV2Prefix(normalizedPath);
  const rewrittenPath = ROUTE_REWRITES[pathWithoutV2] || pathWithoutV2;
  return buildUrl(rewrittenPath, originalUrl);
};

const axiosInstance = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 15000,
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      if (typeof config.url === "string") {
        config.url = rewriteRequestUrl(config.url);
      }

      const token = await getAuthToken();

      if (token) {
        const headers = axios.AxiosHeaders.from(config.headers);
        headers.set("Authorization", `Bearer ${token}`);
        config.headers = headers;
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
