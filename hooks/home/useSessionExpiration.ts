import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import jwtDecode from 'jwt-decode';


//BORRAR SI NO SE USA, Y FUNICONA TODO BIEN EN USEHOMESCREEN, DONDE ESTA ESTA MISMA LOGICA
export default function useSessionExpiration(user: any, getToken: () => Promise<string | null>) {
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    let tokenExpirationTimer: NodeJS.Timeout;
    let appStateSubscription: any;

    const checkTokenExpiration = async () => {
      try {
        const token = await getToken();
        if (!token) {
         
          return;
        }
        let decodedToken: any;
        try {
          decodedToken = jwtDecode(token) as { exp: number };
        } catch (decodeError) {
          const jwtModule = require('jwt-decode');
          decodedToken = (jwtModule.default || jwtModule)(token) as { exp: number };
        }
        if (!decodedToken || !decodedToken.exp) {
          console.error('Token no tiene fecha de expiración');
          return;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = decodedToken.exp - currentTime;
        if (tokenExpirationTimer) clearTimeout(tokenExpirationTimer);
        if (timeUntilExpiry <= 0) {
          setShowSessionExpired(true);
        } else {
          tokenExpirationTimer = setTimeout(() => {
            setShowSessionExpired(true);
          }, timeUntilExpiry * 1000);
        }
      } catch (error) {
        console.error('Error verificando expiración del token:', error);
      }
    };

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        checkTokenExpiration();
      }
    };

    if (user) {
      checkTokenExpiration();
      appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    }

    return () => {
      if (tokenExpirationTimer) clearTimeout(tokenExpirationTimer);
      if (appStateSubscription) appStateSubscription.remove();
    };
  }, [user, getToken]);

  return { showSessionExpired, setShowSessionExpired };
}