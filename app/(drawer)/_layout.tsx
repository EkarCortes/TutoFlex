import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import CustomDrawerContent from '../../components/CustomDrawerContent';
import { router } from 'expo-router';
import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';

interface ScreenConfig {
  name: string;
  roles: number[];
  showInDrawer: boolean;
  options: {
    drawerLabel: string;
    title: string;
    drawerIcon: ({ color, size }: { color: string; size: number }) => React.ReactNode;
    drawerItemStyle?: any;
  };
}

function CustomHeaderLeft() {
  const isDrawerOpen = useDrawerStatus() === 'open';
  const navigation = useNavigation();
  const isRootScreen = navigation.getState()?.index === 0;

  return !isDrawerOpen && !isRootScreen ? (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ marginLeft: 15 }}
    >
      <MaterialIcons name="arrow-back-ios-new" size={24} color="#fff" />
    </TouchableOpacity>
  ) : null;
}

function CustomHeaderRight() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ marginRight: 15 }}
    >
      <MaterialIcons name="menu" size={33} color="#fff" />
    </TouchableOpacity>
  );
}

export default function Layout() {
  const { user } = useAuth();
  const currentRoleId = user?.rol_id || 2;

  const allScreens: ScreenConfig[] = [
    {
      name: "index",
      roles: [1, 2, 3],
      showInDrawer: true,
      options: {
        drawerLabel: "Inicio",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      },
    },
    {
      name: "profesorProfile",
      roles: [3],
      showInDrawer: true,
      options: {
        drawerLabel: "Perfil",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="account-circle" color={color} size={size} />
        ),
      },
    },
    {
      name: "_userProfile",
      roles: [2],
      showInDrawer: true,
      options: {
        drawerLabel: "Perfil",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="account-circle" color={color} size={size} />
        ),
      },
    },
    {
      name: "payments",
      roles: [2],
      showInDrawer: true,
      options: {
        drawerLabel: "Pagos Pendientes",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="payment" color={color} size={size} />
        ),
      },
    },
    {
      name: "course",
      roles: [3],
      showInDrawer: true,
      options: {
        drawerLabel: "Agregar Curso",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="book" color={color} size={size} />
        ),
      },
    },
    {
      name: "profesorTutorials",
      roles: [ 3],
      showInDrawer: true,
      options: {
        drawerLabel: "Tutorias Pendientes",
        title: "",
        drawerItemStyle: { height: 0 },
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="assignment" color={color} size={size} />
        ),
      },
    },
    {
      name: "deductions",
      roles: [3],
      showInDrawer: true,
      options: {
        drawerLabel: "Deducciones",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="account-balance-wallet" color={color} size={size} />
        ),
      },
    },
    {
      name: "ranking",
      roles: [2, 3],
      showInDrawer: true,
      options: {
        drawerLabel: "Ranking de puntos",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="emoji-events" color={color} size={size} />
        ),
      },
    },
    {
      name: "manageCourses",
      roles: [1],
      showInDrawer: true,
      options: {
        drawerLabel: "Gestionar Cursos",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="book" color={color} size={size} />
        ),
      },
    },
    
    {
      name: "coupons",
      roles: [1,2],
      showInDrawer: true,
      options: {
        drawerLabel: "Lista de Cupones",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="confirmation-number" color={color} size={size} />
        ),
      },
    },
    {
      name: "receivedPayments",
      roles: [3],
      showInDrawer: true,
      options: {
        drawerLabel: "Pagos Recibidos",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="monetization-on" color={color} size={size} />
        ),
      },
    },
    {
      name: "qualifications",
      roles: [2],
      showInDrawer: true,
      options: {
        drawerLabel: "Reseñas",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="star" color={color} size={size} />
        ),
      },
    },
    {
      name: "points",
      roles: [2],
      showInDrawer: true,
      options: {
        drawerLabel: "Mis Puntos",
        title: "",
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="military-tech" color={color} size={size} />
        ),
      },
    },
    {
      name: "filter",
      roles: [2, 3],
      showInDrawer: false,
      options: {
        title: "",
        drawerItemStyle: { height: 0 },
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="filter" color={color} size={size} />
        ),
      },
    },
    {
      name: "tutorProfile",
      roles: [1, 2, 3],
      showInDrawer: false,
      options: {
        title: "",
        drawerItemStyle: { height: 0 },
        drawerIcon: ({ color, size }) => (
          <MaterialIcons name="monetization-on" color={color} size={size} />
        ),
      },
    },
   
  ];

  const drawerScreens = allScreens.filter(screen =>
    screen.roles.includes(currentRoleId) && screen.showInDrawer
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: '#086491',
            shadowColor: 'transparent',
            borderWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => <CustomHeaderLeft />,
          headerRight: () => <CustomHeaderRight />,
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerStyle: {
            backgroundColor: '#f5f5f5',
            width: 260,
          },
          drawerActiveBackgroundColor: '#2C81AD',
          drawerItemStyle: {
            borderRadius: 10,
            marginTop: 2,
          },
        }}
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            drawerScreens={drawerScreens}
          />
        )}
      >
        {allScreens
          .filter(screen => screen.roles.includes(currentRoleId))
          .map((screen) => (
            <Drawer.Screen
              key={screen.name}
              name={screen.name}
              options={screen.options}
            />
          ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}