//Componente para mostrar la lista de cursos, 
// se puede usar en la pantalla de Alejandra
import React, { memo } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

interface Course {
  id: string;
  name: string;
  description: string;
  price: string;
  schedule: string;
  modalidad: string;
}

interface CourseListProps {
  courses: Course[];
  onPressCourse: (course: Course) => void;
  refreshing: boolean; // Nuevo prop para el estado de refresco
  onRefresh: () => void; // Nuevo prop para manejar el refresco
}

// Componente memoizado para renderizar cada curso
const CourseItem = memo(({ course, onPress }: { course: Course; onPress: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    className="mb-4 rounded-xl bg-white p-3 shadow-md"
  >
    <Text className="text-center text-base font-bold text-[#219EBC] md:text-lg">
      {course.name}
    </Text>
    <Text className="mt-1 text-center text-xs text-[#219EBC] md:text-sm">
      {course.description}
    </Text>
  </TouchableOpacity>
));

const CourseList: React.FC<CourseListProps> = ({ courses, onPressCourse, refreshing, onRefresh }) => {
  const renderCourseItem = ({ item }: { item: Course }) => (
    <CourseItem course={item} onPress={() => onPressCourse(item)} />
  );

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCourseItem}
      initialNumToRender={10} // Renderiza solo 10 elementos inicialmente
      maxToRenderPerBatch={10} // Renderiza 10 elementos por lote
      windowSize={5} // Ajusta el tamaño de la ventana para renderizado
      contentContainerStyle={{ paddingVertical: 10 }}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing} // Indicador de refresco
      onRefresh={onRefresh} // Función para refrescar la lista
    />
  );
};

export default CourseList;