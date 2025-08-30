import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const axiosInstance = axios.create({
  baseURL: "http://tutoflex-backend-takjn9-7c9a69-52-191-252-195.traefik.me",
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      let token;
      if (Platform.OS === "web") {
        token = localStorage.getItem("auth_token");
      } else {
        token = await SecureStore.getItemAsync("auth_token");
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error al obtener el token:", error);
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
  (error) => {
    console.error("Error en la respuesta:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;