import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "userData";

const getWebStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage;
};

export const getAuthToken = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    return getWebStorage()?.getItem(AUTH_TOKEN_KEY) ?? null;
  }
  return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
};

export const getStoredUserData = async <T>(): Promise<T | null> => {
  const rawValue =
    Platform.OS === "web"
      ? getWebStorage()?.getItem(USER_DATA_KEY) ?? null
      : await SecureStore.getItemAsync(USER_DATA_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return null;
  }
};

export const saveAuthData = async (token: string, userData: unknown): Promise<void> => {
  const serializedUserData = JSON.stringify(userData);

  if (Platform.OS === "web") {
    const storage = getWebStorage();
    storage?.setItem(AUTH_TOKEN_KEY, token);
    storage?.setItem(USER_DATA_KEY, serializedUserData);
    return;
  }

  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_DATA_KEY, serializedUserData);
};

export const clearAuthData = async (): Promise<void> => {
  if (Platform.OS === "web") {
    const storage = getWebStorage();
    storage?.removeItem(AUTH_TOKEN_KEY);
    storage?.removeItem(USER_DATA_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_DATA_KEY);
};
