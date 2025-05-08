import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Linking, ActivityIndicator } from 'react-native';
import '../../global.css';
import HeaderScreens from '../../components/HeaderScreens';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import useTutorProfile from '../../hooks/tutorProfileHome/useTutorProfile';
  
const TutorProfileScreen = () => {
  const { tutorId } = useLocalSearchParams<{ tutorId: string }>();
  const parsedTutorId = tutorId ? parseInt(tutorId, 10) : null;
  const { tutor, loading, error } = useTutorProfile(parsedTutorId);
  const [activeTab, setActiveTab] = useState<'Cursos' | 'Reseñas'>('Cursos');
  
  // Para paginación de cursos
  const initialCoursesToShow = 3; // Mostrar inicialmente 3 cursos
  const [visibleCourses, setVisibleCourses] = useState(initialCoursesToShow);

  // Helper function to convert day number to text
  const getDayText = (dayNum: number): string => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[dayNum % 7] || 'N/A';
  };

  // Helper function to format time
  const formatTime = (timeStr: string): string => {
    try {
      const timePart = timeStr.split('.')[0]; // Remove milliseconds
      return timePart.substring(0, 5); // Get just HH:MM
    } catch (e) {
      return timeStr;
    }
  };

  // Format schedule text from horarios array
  const getScheduleText = (horarios: any[]): string => {
    if (!horarios || horarios.length === 0) return 'Horario no disponible';
    
    return horarios.map(h => 
      `${getDayText(h.dia)} ${formatTime(h.hora_inicio)}-${formatTime(h.hora_fin)}`
    ).join(', ');
  };

  // Use courses_detalle if available, otherwise fall back to the old structure
  const courses = tutor?.cursos_detalle 
    ? tutor.cursos_detalle.map(course => {
        // Group schedules by day
        const schedulesByDay = {};
        
        // Add null check for horarios before calling forEach
        if (course.horarios) {
          course.horarios.forEach(h => {
            const day = getDayText(h.dia);
            if (!schedulesByDay[day]) {
              schedulesByDay[day] = [];
            }
            schedulesByDay[day].push(`${formatTime(h.hora_inicio)}-${formatTime(h.hora_fin)}`);
          });
        }
        
        // Convert to array format for display
        const scheduleArray = Object.entries(schedulesByDay).map(([day, times]) => ({
          day,
          times: times as string[]
        }));
        
        return {
          id: course.curso_id,
          title: course.nombre,
          schedule: course.horarios ? getScheduleText(course.horarios) : 'Horario no disponible', // Handle null horarios
          scheduleArray,
          schedulesByDay,
          reviewsCount: course.resenas,
          price: course.precio_por_hora,
          totalTutorials: course.tutorias_impartidas
        };
      })
    : tutor?.cursos_impartidos?.map((curso, index) => ({
        id: index + 1,
        title: curso,
        schedule: 'Lun-Vie 15:00-17:00', // Default schedule
        scheduleArray: [{ day: 'Lun-Vie', times: ['15:00-17:00'] }], // Updated structure
        schedulesByDay: { 'Lun-Vie': ['15:00-17:00'] },
        reviewsCount: Math.floor(Math.random() * 10) + 1,
        price: 3000,
        totalTutorials: tutor.total_cursos_impartidos || 0,
      })) || [];

  // Función para cargar más cursos
  const loadMoreCourses = () => {
    setVisibleCourses(prev => prev + 3); // Incrementar en 3 el número de cursos visibles
  };

  // Sample reviews for demo purposes
  const reviews = [
    { id: '1', name: 'Juan Pérez', rating: 5, comment: 'Excelente profesor, muy claro explicando.' },
    { id: '2', name: 'María López', rating: 4, comment: 'Muy buen profesor, recomendado.' },
    { id: '3', name: 'Carlos Ruiz', rating: 5, comment: 'Muy buen dominio de los temas.' },
  ];

  const handleContactWhatsApp = () => {
    if (tutor?.whatsapp) {
      const url = `https://wa.me/+506${tutor.whatsapp.replace(/[^0-9]/g, '')}`;
      Linking.openURL(url).catch(err => 
        console.error('Error al abrir WhatsApp:', err)
      );
    }
  };

  // Reset visible courses when changing tabs
  useEffect(() => {
    setVisibleCourses(initialCoursesToShow);
  }, [activeTab]);

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