import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import HeaderScreens from '../../../components/HeaderScreens';
import useTutorProfile from '../../../hooks/tutorProfileHome/useTutorProfile';
import { useTutorTabs } from '../../../hooks/tutorProfileHome/useTutorTabs';
import { useTutorCourses } from '../../../hooks/tutorProfileHome/useTutorCourses';
import { useTutorContact } from '../../../hooks/tutorProfileHome/useTutorContact';
import '../../../global.css';

const TutorProfileScreen = () => {
  const { tutorId } = useLocalSearchParams<{ tutorId: string }>();
  const parsedTutorId = tutorId ? parseInt(tutorId, 10) : null;
  const { tutor, loading, error } = useTutorProfile(parsedTutorId);

  const { courses } = useTutorCourses(tutor);
  const { activeTab, setActiveTab, visibleCourses, loadMoreCourses } = useTutorTabs(courses.length);
  const { handleContactWhatsApp } = useTutorContact(tutor);

  // Reseñas de ejemplo
  const reviews = [
    { id: '1', name: 'Juan Pérez', rating: 5, comment: 'Excelente profesor, muy claro explicando.' },
    { id: '2', name: 'María López', rating: 4, comment: 'Muy buen profesor, recomendado.' },
    { id: '3', name: 'Carlos Ruiz', rating: 5, comment: 'Muy buen dominio de los temas.' },
  ];

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-[#023046]" edges={['left', 'right', 'bottom']}>
        <HeaderScreens title="Perfil de Tutor" />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FB8500" />
          <Text className="text-white mt-4">Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !tutor) {
    return (
      <SafeAreaView className="flex-1 bg-[#023046]" edges={['left', 'right', 'bottom']}>
        <HeaderScreens title="Perfil de Tutor" />
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-white text-lg text-center">{error || 'No se encontró el tutor'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={['left', 'right', 'bottom']}>
    <HeaderScreens title="Perfil de Tutor" />
    <View className="flex-1">
      <ScrollView className="w-full flex-1 mb-16">
        <View className="mb-4 mt-4 items-center">
          <Image
            source={{
              uri: tutor.foto || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            className="mb-2 h-28 w-28 rounded-full border-4 border-white"
          />
          <Text className="font-[Young-Serif] text-xl font-bold text-white">
            {tutor.nombre} {tutor.apellido}
          </Text>
          <Text className="font-[Space-Grotesk] text-sm text-gray-200">{tutor.universidad}</Text>
          <Text className="font-[Space-Grotesk] text-sm text-gray-200">{tutor.carrera}</Text>
        </View>

        <View className="mb-5 w-full px-5">
          <View className="flex-row justify-around rounded-xl bg-white p-3 shadow-md">
            <View className="items-center">
              <Text className="font-[Space-Grotesk] text-gray-500">Calificación</Text>
              <Text className="font-[Young-Serif] text-xl font-bold text-gray-800">
                {tutor.calificacion_promedio}
              </Text>
              <Text className="font-[Space-Grotesk] text-sm text-gray-400">Promedio</Text>
            </View>
            <View className="w-[1px] bg-gray-300" />
            <View className="items-center">
              <Text className="font-[Space-Grotesk] text-gray-500">Tutorías</Text>
              <Text className="font-[Young-Serif] text-xl font-bold text-gray-800">
                {tutor.total_cursos_impartidos}
              </Text>
              <Text className="font-[Space-Grotesk] text-sm text-gray-400">Impartidas</Text>
            </View>
          </View>
        </View>

        <View className="mb-4 flex-row px-5">
          <TouchableOpacity
            onPress={() => setActiveTab('Cursos')}
            className={`flex-1 items-center rounded-xl p-3 ${
              activeTab === 'Cursos' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'
            }`}>
            <Text className="font-[Space-Grotesk] font-bold text-white">Cursos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('Reseñas')}
            className={`ml-2 flex-1 items-center rounded-xl p-3 ${
              activeTab === 'Reseñas' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'
            }`}>
            <Text className="font-[Space-Grotesk] font-bold text-white">Reseñas</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5 pb-6">
          {activeTab === 'Cursos' && (
            <>
              {courses.length > 0 ? (
                <>
                  {courses.slice(0, visibleCourses).map((course) => (
                    <View key={course.id} className="mb-4 w-full rounded-xl bg-white p-4 shadow-md">
                      <Text className="font-[Young-Serif] text-lg font-bold text-[#023047]">
                        {course.title}
                      </Text>
                      
                      {/* New grouped schedule display */}
                      <View className="mt-2 border-l-4 border-[#FA8501] bg-blue-50 pl-2 py-1 rounded-r">
                        <Text className="font-[Space-Grotesk] font-medium text-[#023047] mb-1">Horarios:</Text>
                        
                        {course.scheduleArray && course.scheduleArray.length > 0 ? (
                          course.scheduleArray.map((schedule, index) => (
                            <View key={index} className="flex-row items-start mb-1">
                              <Text className="font-[Space-Grotesk] text-[#023047] font-medium w-12">{schedule.day}:</Text>
                              <View className="flex-1">
                                <Text className="font-[Space-Grotesk] text-gray-700">
                                  {schedule.times.join(', ')}
                                </Text>
                              </View>
                            </View>
                          ))
                        ) : (
                          <Text className="font-[Space-Grotesk] text-gray-700">Horario no disponible</Text>
                        )}
                      </View>
                      
                      <Text className="mt-2 font-[Space-Grotesk] text-sm text-gray-600">
                        <FontAwesome name="star" size={14} color="#FFD700" />
                        {` ${course.reviewsCount} reseñas`}
                      </Text>
                      <Text className="mt-1 font-[Space-Grotesk] text-sm text-gray-600">
                        Tutorías: {course.totalTutorials}
                      </Text>
                      <Text className="mt-2 font-[Space-Grotesk] font-semibold text-gray-700">
                        ₡{course.price}/hora
                      </Text>
                    </View>
                  ))}
                  
                  {/* Botón "Ver más" si hay más cursos para mostrar */}
                  {courses.length > visibleCourses && (
                    <TouchableOpacity 
                      onPress={loadMoreCourses}
                      className="bg-[#0B4D6C] py-3 rounded-xl items-center mb-4"
                    >
                      <Text className="font-[Space-Grotesk] text-white font-bold">
                        Ver más cursos ({courses.length - visibleCourses} restantes)
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <View className="mb-4 w-full rounded-xl bg-white p-4 shadow-md items-center">
                  <Text className="font-[Young-Serif] text-lg font-bold text-[#023047]">
                    No hay cursos disponibles
                  </Text>
                </View>
              )}
            </>
          )}

          {activeTab === 'Reseñas' && (
            <View>
              {reviews.map((review) => (
                <View key={review.id} className="mb-4 rounded-xl bg-white p-4 shadow-md">
                  <View className="flex-row items-center mb-2">
                    <Text className="font-bold text-gray-800 mr-2">{review.name}</Text>
                    <View className="flex-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesome 
                          key={star} 
                          name={star <= review.rating ? 'star' : 'star-o'} 
                          size={14} 
                          color="#FFD700" 
                          style={{ marginRight: 2 }}
                        />
                      ))}
                    </View>
                  </View>
                  <Text className="text-gray-600">{review.comment}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed WhatsApp button at the bottom */}
      {tutor.whatsapp && (
        <View className="absolute bottom-0 left-0 right-0 px-5 pb-3 pt-2 bg-[#023046] border-t border-[#0B4D6C]">
          <TouchableOpacity 
            className="bg-[#25D366] py-3 rounded-xl flex-row items-center justify-center"
            onPress={handleContactWhatsApp}
          >
            <FontAwesome name="whatsapp" size={24} color="white" />
            <Text className="text-white ml-2 text-lg font-bold">Contactar por WhatsApp</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </SafeAreaView>
  );
};

export default TutorProfileScreen;