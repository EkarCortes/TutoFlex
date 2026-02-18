import { useState } from 'react';
import { login as apiLogin } from '../services/AuthService';
import { clearAuthData, saveAuthData } from '../services/authStorage';

type LoginResult = {
  success: boolean;
  userData?: unknown;
  error?: string;
};

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useLogin = (): UseLoginReturn => {
  const AUTH_DEBUG = __DEV__;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    if (!email || !password) {
      const message = 'Por favor ingresa email y contraseña';
      setError(message);
      return { success: false, error: message };
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await apiLogin(email, password);

      if (!response.success) {
        const message = response.message || 'Error desconocido al iniciar sesión';
        setError(message);
        return { success: false, error: message };
      }

      if (!response.token || !response.data) {
        const message = 'Respuesta de login inválida: token o usuario faltante';
        setError(message);
        return { success: false, error: message };
      }

      // Guardar datos de autenticación
      await saveAuthData(response.token, response.data);

      if (AUTH_DEBUG) {
        console.log('[auth] login ok', {
          hasToken: Boolean(response.token),
          tokenLength: response.token.length,
          userId: (response.data as any)?.id,
          roleId: (response.data as any)?.rol_id,
        });
      }

      return { success: true, userData: response.data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      if (AUTH_DEBUG) {
        console.log('[auth] login error', errorMessage);
      }
      return { success: false, error: errorMessage };
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
