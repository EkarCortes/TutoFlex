import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'expo-router';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import useGetUserProfile from '../points/useGetUserProfile';
import useFontsLoader from '../useFontsLoader';

export default function useHomeScreen() {
  const { user, logout, getToken } = useAuth();
  const { profile } = useGetUserProfile();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const router = useRouter();
  useFontsLoader();

  // NUEVA
  const userName = user ? user.nombre.split(' ')[0] + ' ' + user.apellido : "Usuario";

  //VIEJA
  //const userName = user ? `${user.nombre.split(' ')[0]} ${user.apellido}` : "Usuario";
  
  // Verifica si el token ha expirado y configura el temporizador adecuadamente
  useEffect(() => {
    let tokenExpirationTimer: NodeJS.Timeout;
    let appStateSubscription: any;
    
    const checkTokenExpiration = async () => {
      try {
        const token = await getToken();
        
        if (!token) {
          console.log('No hay token disponible');
          return;
        }
        
        // Decodifica el token para obtener información de expiración
        let decodedToken: any;
        try {
          // Intenta el método de importación directa primero
          decodedToken = jwtDecode(token) as { exp: number };
        } catch (decodeError) {
          console.log('Método de importación directa falló, intentando con require');
          // Si falla, intenta con require y accede a default o la función directa
          const jwtModule = require('jwt-decode');
          decodedToken = (jwtModule.default || jwtModule)(token) as { exp: number };
        }
        
        if (!decodedToken || !decodedToken.exp) {
          console.error('Token no tiene fecha de expiración');
          return;
        }
        
        // Calcula cuánto tiempo queda hasta que expire (en segundos)
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = decodedToken.exp - currentTime;
        
        console.log(`Token expira en: ${timeUntilExpiry} segundos (${Math.floor(timeUntilExpiry/60)} minutos)`);
        
        // Limpia cualquier temporizador existente
        if (tokenExpirationTimer) {
          clearTimeout(tokenExpirationTimer);
        }
        
        // Si ya expiró, muestra el modal inmediatamente
        if (timeUntilExpiry <= 0) {
          console.log('Token ya expirado');
          setShowSessionExpired(true);
        } else {
          // Si aún es válido, configura el temporizador con el tiempo restante
          tokenExpirationTimer = setTimeout(() => {
            console.log('Token acaba de expirar');
            setShowSessionExpired(true);
          }, timeUntilExpiry * 1000);
        }
      } catch (error) {
        console.error('Error verificando expiración del token:', error);
      }
    };
    
    // Verifica cuando el componente se monta y cuando la app vuelve a estar activa
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('App volvió al primer plano, verificando token...');
        checkTokenExpiration();
      }
    };
    
    if (user) {
      // Verificación inicial
      checkTokenExpiration();
      
      // Configura el listener para cambios de estado de la app
      appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    }
    
    return () => {
      if (tokenExpirationTimer) clearTimeout(tokenExpirationTimer);
      if (appStateSubscription) appStateSubscription.remove();
    };
  }, [user]);

  const handleLogin = () => {
    setShowSessionExpired(false);
    logout();
    router.replace("/(auth)/");
  };

  return {
    user,
    profile,
    searchQuery,
    setSearchQuery,
    showSessionExpired,
    setShowSessionExpired,
    userName,
    handleLogin,
  };
}