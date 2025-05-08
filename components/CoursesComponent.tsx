import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

const RecommendedCourses = () => {
  const courses = [
    { id: '1', image: require('../assets/images/course-1.jpg'), title: 'Bases de datos Avanzadas' },
    { id: '2', image: require('../assets/images/course-2.jpg'), title: 'Programación' },
    { id: '3', image: require('../assets/images/course-3.jpg'), title: 'Calculo y Algebra' },
    { id: '4', image: require('../assets/images/course-4.jpg'), title: 'Ingles' }
  ];

  return (
    <View className="flex-1 items-center mt-5 mb-5">
    
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row mt-5 mb-5'>
      {courses.map((course) => (
        <TouchableOpacity
        key={course.id}
        className="bg-[#086491] w-[136px] h-[120px] rounded-lg ml-5 items-center justify-center overflow-hidden"
        >
        <View className="w-full h-20">
          <Image source={course.image} className='w-full h-full' resizeMode="cover" />
        </View>
        <View className='flex-1 justify-center'>
          <Text className="text-white text-center"  style={{ fontFamily: 'SpaceGrotesk-Medium' }}>
          {course.title}
          </Text>
        </View>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

export default RecommendedCourses;