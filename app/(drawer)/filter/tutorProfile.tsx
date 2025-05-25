import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../../../components/HeaderScreens';
import '../../../global.css';
import { useTutorContact } from '../../../hooks/tutorProfileHome/useTutorContact';
import { useTutorCourses } from '../../../hooks/tutorProfileHome/useTutorCourses';
import useTutorProfile from '../../../hooks/tutorProfileHome/useTutorProfile';
import { useTutorReviews } from '../../../hooks/tutorProfileHome/useTutorReviews';
import { useTutorTabs } from '../../../hooks/tutorProfileHome/useTutorTabs';

const TutorProfileScreen = () => {
  const { tutorId } = useLocalSearchParams<{ tutorId: string }>();
  const parsedTutorId = tutorId ? parseInt(tutorId, 10) : null;
  const { tutor, loading, error } = useTutorProfile(parsedTutorId);

  const { courses } = useTutorCourses(tutor);
  const { activeTab, setActiveTab, visibleCourses, loadMoreCourses } = useTutorTabs(courses.length);
  const { handleContactWhatsApp } = useTutorContact(tutor);
  const { reviews, loading: loadingReviews } = useTutorReviews(parsedTutorId);

  // Estados para filtro y paginación de reseñas
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);

  // Filtrar reseñas por estrellas si hay filtro activo
  const filteredReviews = starFilter
    ? reviews.filter(r => r.estrellas === starFilter)
    : reviews;

  // Mostrar solo las primeras N reseñas (paginación local)
  const displayedReviews = filteredReviews.slice(0, visibleReviews);

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
              className="mb-2 h-28 w-28 rounded-full border-2 border-[#FA8501]"
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
              className={`flex-1 items-center rounded-xl p-3 ${activeTab === 'Cursos' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'
                }`}>
              <Text className="font-[Space-Grotesk] font-bold text-white">Cursos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('Reseñas')}
              className={`ml-2 flex-1 items-center rounded-xl p-3 ${activeTab === 'Reseñas' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'
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
                <View className="flex-row justify-end mb-2 w-full">
                  <Dropdown
                    data={[
                      { label: 'Todas las calificaciones', value: '' },
                      { label: '5 estrellas', value: 5 },
                      { label: '4 estrellas', value: 4 },
                      { label: '3 estrellas', value: 3 },
                      { label: '2 estrellas', value: 2 },
                      { label: '1 estrella', value: 1 },
                    ]}
                    labelField="label"
                    valueField="value"
                    value={starFilter ?? ''}
                    onChange={item => setStarFilter(item.value ? Number(item.value) : null)}
                    placeholder="Filtrar"
                    style={{
                      fontFamily: 'Space-Grotesk',
                      fontSize: 12,
                      color: '#023047',
                      backgroundColor: '#0B4D6C',
                      borderRadius: 8,
                      borderWidth: 0,
                      width: 130, // más pequeño
                      paddingVertical: 2,
                      paddingHorizontal: 8,
                    }}
                    containerStyle={{
                      borderRadius: 8,
                      width: 130, // más pequeño
                    }}
                    selectedTextStyle={{
                      color: '#fff',
                      fontFamily: 'Space-Grotesk',
                      fontSize: 12,
                    }}
                    iconColor="#FB8500"
                  />
                </View>

                {loadingReviews ? (
                  <ActivityIndicator size="small" color="#FB8500" />
                ) : displayedReviews.length > 0 ? (
                  <>
                    {displayedReviews.map((review, idx) => (
                      <View key={idx} className="mb-4 rounded-xl bg-white p-4 shadow-md">
                        <View className="flex-row items-center mb-2">
                          <Text className="font-bold text-gray-800 mr-2">{review.nombre_estudiante}</Text>
                          <View className="flex-row">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FontAwesome
                                key={star}
                                name={star <= review.estrellas ? 'star' : 'star-o'}
                                size={14}
                                color="#FFD700"
                                style={{ marginRight: 2 }}
                              />
                            ))}
                          </View>
                        </View>
                        <Text className="text-gray-600">{review.comentario}</Text>
                      </View>
                    ))}
                    {/* Botón "Ver más reseñas" si hay más para mostrar */}
                    {filteredReviews.length > visibleReviews && (
                      <TouchableOpacity
                        onPress={() => setVisibleReviews(visibleReviews + 3)}
                        className="bg-[#0B4D6C] py-3 rounded-xl items-center mb-4"
                      >
                        <Text className="font-[Space-Grotesk] text-white font-bold">
                          Ver más reseñas ({filteredReviews.length - visibleReviews} restantes)
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <Text className="text-white text-center">No hay reseñas disponibles.</Text>
                )}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Fixed WhatsApp button at the bottom */}
        {tutor.telefono_profesor && (
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