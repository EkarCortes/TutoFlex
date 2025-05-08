import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const reviews = [
  {
    id: '1',
    name: 'Juan Pérez',
    rating: 5,
    description: 'Excelente profesor, muy paciente y claro al explicar.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '2',
    name: 'María López',
    rating: 4,
    description: 'Muy buen profesor, aunque podría mejorar en puntualidad.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '3',
    name: 'Carlos García',
    rating: 5,
    description: 'Sus clases son muy dinámicas y entretenidas.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '4',
    name: 'Ana Torres',
    rating: 3,
    description: 'Explica bien, pero a veces se extiende demasiado.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '5',
    name: 'Luis Fernández',
    rating: 4,
    description: 'Muy profesional y siempre dispuesto a ayudar.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '6',
    name: 'Sofía Martínez',
    rating: 5,
    description: 'El mejor profesor que he tenido, lo recomiendo mucho.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '7',
    name: 'Diego Ramírez',
    rating: 2,
    description: 'No cumplió con mis expectativas, esperaba más.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '8',
    name: 'Valeria Gómez',
    rating: 4,
    description: 'Muy buen profesor, aunque podría mejorar en organización.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '9',
    name: 'Jorge Herrera',
    rating: 5,
    description: 'Sus explicaciones son claras y fáciles de entender.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    id: '10',
    name: 'Camila Rojas',
    rating: 3,
    description: 'Es un buen profesor, pero a veces se distrae mucho.',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
];

const StarRating = ({ rating }: any) => {
  return (
    <View className="flex-row mt-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FontAwesome
          key={index}
          name={index < rating ? 'star' : 'star-o'}
          size={16}
          color={index < rating ? '#FFD700' : '#C0C0C0'}
          style={{ marginRight: 4 }}
        />
      ))}
    </View>
  );
};

const ReviewScreen = () => {
  const renderReview = ({ item }: any) => (
    <View className="bg-white p-4 mb-4 mx-4 rounded-lg shadow-lg flex-row items-center">
      <Image
        source={{ uri: item.photo }}
        className="w-14 h-14 rounded-full mr-4 border border-gray-300"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
        <StarRating rating={item.rating} />
        <Text className="text-gray-600 mt-1 text-sm">{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#023047]">
      <View className="bg-[#086491] rounded-b-3xl items-center shadow-md p-5">
        <Text className="text-3xl font-bold text-white">Mis Reseñas</Text>
      </View>


      <FlatList className="flex-1 mt-4"
        contentContainerStyle={{ paddingBottom: 10 }}
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ReviewScreen;