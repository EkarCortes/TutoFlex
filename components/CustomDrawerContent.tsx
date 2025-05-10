import { useAuth } from '@/app/contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LoadingScreen from '../components/LoadingScreen';
import '../global.css';
import useGetUserProfile from '../hooks/points/useGetUserProfile';

interface DrawerScreen {
  name: string;
  options: {
    drawerLabel: string;
    drawerIcon: ({ color, size }: { color: string; size: number }) => React.ReactNode;
  };
}

interface CustomDrawerContentProps {
  state?: any;
  navigation?: any;
  descriptors?: any;
  drawerScreens?: DrawerScreen[];
}

function CustomDrawerContent(props: CustomDrawerContentProps) {
    const { logout, user } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { profile } = useGetUserProfile();
    const userName = user ? `${user.nombre.split(' ')[0]} ${user.apellido.split(' ')[0]}` : "Usuario";
    const userPoints = profile?.total_puntos ?? "";

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const filteredDescriptors = props.drawerScreens 
      ? Object.values(props.descriptors).filter((descriptor: any) => 
          props.drawerScreens!.some(screen => screen.name === descriptor.route.name))
      : Object.values(props.descriptors);

    return (
        <View className="flex-1 bg-[#023046]">
            <View className="bg-[#086491] h-52 py-8">
                <View className="items-center">
                    <MaterialIcons
                        name="account-circle"
                        size={64}
                        color="white"
                        className="mt-5"
                    />

                    <Text className="text-white font-bold text-lg mt-2">{userName}</Text>
                    {user?.rol_id === 2 && (
                        <View className="flex-row items-center mt-1">
                            <MaterialIcons name="star-outline" size={16} color="#FEB702" className="ml-1" />
                            <Text className="text-gray-300 text-sm">{userPoints} puntos</Text>
                        </View>
                    )}
                </View>
            </View>

            <DrawerContentScrollView {...props} className="flex-1">
                <View className="flex-1">
                    {filteredDescriptors.map((descriptor: any) => (
                        <DrawerItem
                            key={descriptor.route.key}
                            label={descriptor.options.drawerLabel || descriptor.route.name}
                            icon={({ color, size, focused }) => (
                                <View style={{ marginRight: 25 }}>
                                    {descriptor.options.drawerIcon({ color, size })}
                                </View>
                            )}
                            onPress={() => {
                                props.navigation.navigate(descriptor.route.name);
                            }}
                            activeTintColor="#FFB703"
                            inactiveTintColor="white"
                            labelStyle={{
                                fontSize: 16,
                                fontWeight: '500',
                                marginLeft: -16, 
                            }}
                            style={{
                                marginVertical: 5,
                                marginHorizontal: -15,
                   
                            }}
                        />
                    ))}
                </View>
            </DrawerContentScrollView>

            <View className="bg-[#086491] border-none flex-row items-center">
                <TouchableOpacity
                    className='py-7 pl-5 flex-row items-center'
                    onPress={handleLogout}
                    disabled={isLoggingOut}
                >
                    {isLoggingOut ? (
                        <View className="flex-row items-center">
                            <LoadingScreen 
                                fullScreen={false} 
                                backgroundColor="transparent" 
                                indicatorSize="small" 
                                indicatorColor="white"
                                message=""
                            />
                            <Text className="text-white ml-3 font-medium">Cerrando sesión...</Text>
                        </View>
                    ) : (
                        <>
                            <MaterialIcons name="logout" size={24} color="white" />
                            <Text className="text-white ml-3 font-medium">Cerrar Sesión</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CustomDrawerContent;