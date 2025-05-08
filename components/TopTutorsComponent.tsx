import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import useTopTutors from '../hooks/tutorProfileHome/useTopTutors';

const TopTutorsComponent = () => {
  const { tutors, loading, error } = useTopTutors(5);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <ActivityIndicator size="large" color="#086491" />
        <Text className="mt-2 text-gray-600">Cargando tutores...</Text>
      </View>
    );
  }

  if (error || tutors.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-gray-700">No se encontraron tutores destacados</Text>
      </View>
    );
  }

  const formatName = (nombre, apellido) => {
    // If last name is longer than 8 characters, use just the initial
    const formattedLastName = apellido.length > 8
      ? `${apellido.charAt(0)}.`
      : apellido;

    return `${nombre} ${formattedLastName}`;
  };

  const handleTutorPress = (tutor) => {
    console.log(`Navigating to tutor profile with ID: ${tutor.profesor_id}`);
    router.push({
      pathname: '/(drawer)/tutorProfile',
      params: { tutorId: tutor.profesor_id.toString() }
    });
  };

  return (
    <View className="w-full">
      <Text className="text-xl font-bold pl-5 mb-2 text-[#023047]" style={{ fontFamily: 'SpaceGrotesk-Medium' }}>
        Tutores Destacados
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
        {tutors.map((tutor) => (
          <TouchableOpacity
            key={tutor.profesor_id}
            className="mr-2 ml-5 mb-5"
            onPress={() => handleTutorPress(tutor)}
          >
            <View className="items-center mt-1">
              <View className="w-24 h-24 rounded-full overflow-hidden -mb-12 z-10">
                <Image
                  source={{ uri: tutor.foto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                  className="w-full h-full"
                />
              </View>
              <View className="bg-[#086491] w-40 py-4 rounded-md shadow-md items-center">
                <Text
                  className="text-xl mt-8 text-white"
                  style={{ fontFamily: 'SpaceGrotesk-Medium' }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {formatName(tutor.nombre, tutor.apellido)}
                </Text>
                <Text
                  className="text-white text-center px-2"
                  style={{ fontFamily: 'SpaceGrotesk-Medium' }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {tutor.cursos_detalle && tutor.cursos_detalle.length > 0
                    ? tutor.cursos_detalle
                      .sort((a, b) => b.tutorias_impartidas - a.tutorias_impartidas)[0].nombre
                    : tutor.cursos_impartidos && tutor.cursos_impartidos.length > 0
                      ? tutor.cursos_impartidos[0]
                      : "Tutor"}
                </Text>
                <Text className="text-lg mt-2 text-white" style={{ fontFamily: 'SpaceGrotesk-Medium', fontWeight: 'bold' }}>
                  ₡ 3 000
                </Text>
                <View className="flex-row justify-center items-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <AntDesign
                      key={index}
                      name={index < parseFloat(tutor.calificacion_promedio) ? "star" : "staro"}
                      size={16}
                      color="#FEB702"
                    />
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopTutorsComponent;