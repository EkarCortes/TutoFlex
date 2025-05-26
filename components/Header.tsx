import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import StatusBarComponent from './StatusBarComponent';

interface HeaderProps {
  userName: string;
  userPoints: string;
  searchQuery: string;
  rolId: number;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userName, userPoints, searchQuery, setSearchQuery, rolId }) => {
  const navigation = useNavigation();

  // Definir qué roles pueden ver la barra de búsqueda
  const showSearchBar = [2].includes(rolId); // Solo para roles 1 (admin) y 2 (estudiante) 

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 5,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        backgroundColor: "#086491", 
      }}
    >
      <StatusBarComponent />

      <View className="flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-3xl text-white mb-1.5" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
            Hola, {userName}!
          </Text>
          {rolId === 2 && (
            <View className="flex-row items-center mt-1.5 mb-1">
              <MaterialIcons name="star-border" size={19} color="#FEB702" />
              <Text className="text-sm text-white ml-1" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                {userPoints} puntos
              </Text>
            </View>
          )}
         
        </View>
      </View>

      {showSearchBar && (
        <View className="flex-row bg-[#8ECBE6] items-center rounded-xl px-3 py-2 m-1.5">
          <MaterialIcons name="search" size={20} color="#2192BC" className="mr-2" />
          <TextInput
            className="flex-1 text-base bg-[#8ECBE6] text-gray-800"
            placeholder="Buscar cursos, tutores..."
            placeholderTextColor="#2C2C2D"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={() => {
              if (searchQuery.length > 0) {
                router.push({
                  pathname: '/(drawer)/filter',
                  params: { searchQuery },
                });
              }
            }}
            returnKeyType="search"
            style={{ fontFamily: 'SpaceGrotesk-Medium' }}
          />

          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")} className="p-1">
              <MaterialIcons name="close" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Header;