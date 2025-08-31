import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import useLogin from '../../hooks/useLogin';
import LoadingScreen from '../../components/LoadingScreen';

type User = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol_id: number;
  universidad_id: number;
  carrera_id: number;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>; 
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false); // Nuevo estado para transiciones
  const { login: hookLogin, logout: hookLogout, loading: authLoading, error: authError } = useLogin();

  // Función para obtener datos del usuario almacenados
  const getUserData = async () => {
    try {
      if (Platform.OS === 'web') {
        const userData = localStorage.getItem('userData');

        return userData ? JSON.parse(userData) : null;
      } else {
        const userData = await SecureStore.getItemAsync('userData');
        return userData ? JSON.parse(userData) : null;
      }
    } catch (error) {
      
      return null;
    }
  };

  // Función para obtener el token almacenado
  const getToken = async () => {
    try {
      return await SecureStore.getItemAsync('auth_token');
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  };

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        let token, userData;

        if (Platform.OS === 'web') {
          token = localStorage.getItem('auth_token');
          userData = await getUserData();
        } else {
          token = await SecureStore.getItemAsync('auth_token');
          userData = await getUserData();
        }
        if (token && userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        // Retrasamos ligeramente la eliminación del estado de carga para evitar parpadeos
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsTransitioning(true); // Activamos el estado de transición
      

      const success = await hookLogin(email, password);
      
      if (success) {
        // Actualizar datos del usuario después de login exitoso
        const userData = await getUserData();
        if (userData) {
          setUser(userData);
          // Reducimos el retraso significativamente
          setTimeout(() => {
            setIsAuthenticated(true);
            setIsTransitioning(false);
          }, 300); // Reducido de 2500ms a 300ms
        } else {
          setIsTransitioning(false);
          throw new Error('No se pudo obtener información del usuario');
        }
      } else {
        setIsTransitioning(false);
        throw new Error(authError || 'Error al iniciar sesión');
      }
    } catch (error) {
      setIsTransitioning(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsTransitioning(true); // Activamos el estado de transición para logout también
      await hookLogout();
      
      // Pequeño retraso para evitar parpadeos
      setTimeout(() => {
        setUser(null);
        setIsAuthenticated(false);
        setIsTransitioning(false);
      }, 500);
    } catch (error) {
      setIsTransitioning(false);
      throw error;
    }
  };

  // Mostramos spinner en cualquier estado de carga
  if (loading || authLoading || isTransitioning) {
    // Mostrar mensaje contextual según el estado
    const loadingMessage = isTransitioning 
      ? (isAuthenticated ? "Cerrando sesión..." : "Iniciando sesión...") 
      : "Cargando...";
      
    return <LoadingScreen message={loadingMessage} />;
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      login, 
      logout, 
      getToken, // Añadido getToken al contexto
      loading: loading || authLoading || isTransitioning 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthProvider;