import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarComponent from './StatusBarComponent';

//DA ERROR PORQUE LOS DATOS NO ESTAN DEFINIDOS
interface HeaderProps {
  userName: string;
  userPoints: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userName, userPoints, searchQuery, setSearchQuery }) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#086491", "#086491"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      //NO ENCONTRE UNA FORMA DE PONER BORDE ABAJO CON NATIVEWIND
      style={{ padding: 20, paddingTop: 5, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
    >
      <StatusBarComponent></StatusBarComponent>
  
      <View className="flex-row justify-between items-center mb-2 ">
      <View>
        <Text className="text-3xl  text-white mb-1.5" style={{ fontFamily: "SpaceGrotesk-Bold" }}>Hola, {userName}!</Text>
        <View className="flex-row items-center mt-1.5 mb-1">
        </View>
      </View>
      </View>
      

        {/* ELIMINAR EL TEXTO INGRESADO CON LA X DE CLOSE */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")} className="p-1">
            <MaterialIcons name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
    
    </LinearGradient>
  );
};

export default Header;