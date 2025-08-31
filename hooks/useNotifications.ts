import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosConfig';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!Device.isDevice) {
    throw new Error('Must use physical device for push notifications');
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    throw new Error('Permission not granted to get push token for push notification!');
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  if (!projectId) {
    throw new Error('Project ID not found');
  }

  const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
  return tokenData.data;
}

const useNotificaciones = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notifications, setNotifications] = useState<Notifications.Notification[]>([]);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();


  /* ----- Enviar el token si y solo si ha cambiado ----- */
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        if (!token) return;
        setExpoPushToken(token);
  
        const lastToken = await AsyncStorage.getItem('expoPushToken');
        if (lastToken !== token) {
          try {
            await axiosInstance.post(
              '/notifications/register-token',
              {
                token,
                plataforma: Platform.OS,
              }
            );
            await AsyncStorage.setItem('expoPushToken', token);
          } catch (err) {
            console.warn('Error registrando el push token en el backend:', err);
          }
        }
      })
      .catch((error) => {
        console.warn('Error obteniendo expo push token:', error);
      });
  }, []);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((n) => {
      setNotifications((prev) => [n, ...prev]);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener((r) => {
      
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    expoPushToken,
    notifications,
  };
};

export default useNotificaciones;