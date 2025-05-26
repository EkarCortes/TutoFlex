import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useTopTutors from '../hooks/tutorProfileHome/useTopTutors';

const TopTutorsComponent = () => {
  const { tutors } = useTopTutors(6);



  const formatName = (nombre, apellido) => {
    const formattedLastName = apellido.length > 6
      ? `${apellido.charAt(0)}.`
      : apellido;
    return `${nombre} ${formattedLastName}`;
  };

  const handleTutorPress = (tutor) => {
    router.push({
      pathname: '/(drawer)/filter/tutorProfile',
      params: { tutorId: tutor.profesor_id.toString() }
    });
  };

  return (
    <View className="w-full mb-10">
      <Text className="text-xl font-bold pl-5 mb-2 text-[#023047]" style={{ fontFamily: 'SpaceGrotesk-Medium' }}>
        Tutores Destacados
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-4"
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
      >
        {tutors.map((tutor) => (
          <TouchableOpacity
            key={tutor.profesor_id}
            className="bg-[#0B4D6D] rounded-xl p-3 mr-4 w-36 shadow items-center"
            onPress={() => handleTutorPress(tutor)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: tutor.foto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
              className="w-16 h-16 rounded-full mb-2"
              resizeMode="cover"
            />
            <Text
              className="font-bold text-[15px] text-white text-center"
              style={{ fontFamily: 'SpaceGrotesk-Medium' }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formatName(tutor.nombre, tutor.apellido)}
            </Text>
            <Text
              className="text-[12px] text-[#B6E0FE] mb-1 text-center"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
             Artes
            </Text>
            <View className="flex-row items-center justify-center mb-1">
              {[...Array(5)].map((_, index) => (
                <AntDesign
                  key={index}
                  name={index < parseFloat(tutor.calificacion_promedio) ? "star" : "staro"}
                  size={14}
                  color="#FFB702"
                />
              ))}
              <Text className="text-[11px] text-[#B6E0FE] ml-1">
                ({parseFloat(tutor.calificacion_promedio).toFixed(1)})
              </Text>
            </View>
            <Text className="font-bold text-[#fff] text-[15px] mt-1">₡ 3 000</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopTutorsComponent;