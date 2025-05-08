import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { login as apiLogin } from '../services/AuthService';

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para guardar datos de autenticación
  const saveAuthData = async (token: string, userData: any) => {
    if (Platform.OS === 'web') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      await SecureStore.setItemAsync('auth_token', token);
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
    }
  };

  // Función para limpiar datos de autenticación
  const clearAuthData = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userData');
    } else {
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('userData');
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      setError('Por favor ingresa email y contraseña');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await apiLogin(email, password);
      
      if (!response.success) {
        setError(response.message || 'Error desconocido al iniciar sesión');
        return false;
      }
      
      // Guardar datos de autenticación
      await saveAuthData(response.token, response.data);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Limpiar datos de autenticación
      await clearAuthData();
    } catch (err) {
      console.error('Error durante el cierre de sesión:', err);
    }
  };

  return {
    login,
    logout,
    loading,
    error
  };
};

export default useLogin;