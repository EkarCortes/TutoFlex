import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../../components/InputField";
import HeaderScreens from "../../../components/HeaderScreens";
import useCourses from "../../../hooks/useCourses";
import ModalAddCourse from "../../../components/ModalAddCourse";
import CourseList from "../../../components/CourseList";
import CustomDropdown from "../../../components/CustomDropdown";
import useClassifications from "../../../hooks/useClassifications";
import { useAuth } from "../../../app/contexts/AuthContext"; // Importar el contexto de autenticación
import ToastComponent, { showToast } from "../../../components/Toast"; // Importar la función showToast
import { useLocalSearchParams } from "expo-router";

const AddCourseScreen = () => {
  const router = useRouter();
  const { refresh } = useLocalSearchParams(); // Obtener el parámetro "refresh"
  const [refreshing, setRefreshing] = useState(false); // Estado para el refresco manual
  const {
    courses,
    loading,
    error,
    addCourse,
    filterCourses,
    fetchCoursesProfesor,
  } = useCourses();
  const { user } = useAuth(); // Obtener los datos del usuario autenticado
  const {
    classifications,
    loading: loadingClassifications,
    error: errorClassifications,
  } = useClassifications();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [modalSelectedCategory, setModalSelectedCategory] = useState<
    number | null
  >(null); // Estado independiente para el modal
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleFilter = () => {
    if (selectedCategory === -1) {
      // Si se selecciona "Mis cursos", obtener los cursos del profesor
      fetchCoursesProfesor();
    } else {
      const params = {
        keyword: searchText || undefined,
        clasificacion_id: selectedCategory || undefined,
      };
      filterCourses(params);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalSelectedCategory(null); // Reiniciar el estado del modal
  };

  useEffect(() => {
    handleFilter();
  }, [searchText, selectedCategory]);

  useEffect(() => {
    console.log("Datos del usuario desde el contexto:", user);
  }, [user]);

  const handleAddCourse = async () => {
    if (
      !courseName.trim() ||
      !courseDescription.trim() ||
      !modalSelectedCategory
    ) {
      showToast(
        "error",
        "Por favor completa todos los campos",
        "Aviso",
        "bottom"
      );
      return;
    }

    try {
      const newCourse = {
        universidad_id: user?.universidad_id, // Usar el valor dinámico del usuario autenticado
        carrera_id: user?.carrera_id, // Usar el valor dinámico del usuario autenticado
        clasificacion_id: modalSelectedCategory,
        nombre: courseName,
        descripcion: courseDescription,
      };

      console.log("Nuevo curso:", newCourse); // Verificar los datos del nuevo curso
      await addCourse(newCourse);
      handleCloseModal();
      setCourseName("");
      setCourseDescription("");
      showToast("success", "Curso añadido correctamente", "¡Éxito!", "bottom");
    } catch (error) {
      showToast("error", "No se pudo añadir el curso", "Aviso", "bottom");
      console.error("Error al añadir el curso:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (selectedCategory === -1) {
        await fetchCoursesProfesor();
      } else {
        const params = {
          keyword: searchText || undefined,
          clasificacion_id: selectedCategory || undefined,
        };
        await filterCourses(params);
      }
    } catch (error) {
      console.error("Error al refrescar los cursos:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#023046]"
      edges={["left", "right", "bottom"]}
    >
      <HeaderScreens title="Cursos Disponibles" />

      <View className="flex-1 w-full px-5 py-3 md:px-8 md:py-5">
        {/* Search and Filter Card */}
        <View className="w-full bg-[#0d6a97] rounded-2xl p-5 shadow-lg mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-xl font-bold">Buscar Cursos</Text>
          </View>

          <View className="mb-1">
            <InputField
              icon="search"
              placeholder="Nombre del curso"
              value={searchText}
              onChangeText={setSearchText}
              className="bg-[#023046]/20"
            />
          </View>

          <View>
            {loadingClassifications ? (
              <ActivityIndicator size="small" color="#FB8500" />
            ) : errorClassifications ? (
              <Text className="text-white">
                Error al cargar clasificaciones
              </Text>
            ) : (
              <CustomDropdown
                data={[
                  { label: "Todas las categorías", value: null },
                  { label: "Mis cursos", value: -1 }, // Nueva opción para "Mis cursos"
                  ...classifications.map((classification) => ({
                    label: classification.nombre,
                    value: classification.clasificacion_id,
                  })),
                ]}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Seleccionar categoría"
              />
            )}
          </View>
        </View>

        {/* Course List Card */}
        <View className="flex-1 bg-[#0d6a97] rounded-2xl px-5 pt-4 pb-3 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Ionicons name="book" size={20} color="#FB8500" />
              <Text className="text-white text-xl font-bold ml-2">
                {selectedCategory === null
                  ? "Todos los cursos"
                  : selectedCategory === -1
                  ? "Mis cursos"
                  : classifications.find((classification) => classification.clasificacion_id === selectedCategory)?.nombre || "Categoría desconocida"}
              </Text>
            </View>
            {!loading && courses?.length > 0 && (
              <View className="bg-[#FB8500] px-3 py-1 rounded-full">
                <Text className="text-white font-medium">{courses.length}</Text>
              </View>
            )}
          </View>

          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#FB8500" />
              <Text className="text-white mt-4 text-center">
                Cargando cursos...
              </Text>
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="alert-circle" size={48} color="#FB8500" />
              <Text className="text-center text-white mt-3 px-5">{error}</Text>
            </View>
          ) : courses?.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Ionicons
                name="school-outline"
                size={64}
                color="rgba(255,255,255,0.5)"
              />
              <Text className="text-center text-white text-lg font-medium mt-4">
                No se encontraron cursos
              </Text>
              <Text className="text-center text-white opacity-70 mt-2 px-8 mb-4">
                Intenta con otros criterios de búsqueda o añade un nuevo curso
              </Text>
            </View>
          ) : (
            <CourseList
              courses={courses}
              onPressCourse={(course) => {
                if (!course.name) {
                  console.error("El curso no tiene un nombre:", course);
                  return;
                }
                router.push({
                  pathname: "../../(drawer)/course/_setClassDetails",
                  params: { id: course.id, name: course.name },
                });
              }}
              refreshing={refreshing} // Pasar el estado de refresco
              onRefresh={handleRefresh} // Pasar la función de refresco
            />
          )}
        </View>
      </View>

      {/* Add Course Button */}

      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <View className="">
          <TouchableOpacity
            className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white font-bold text-lg ml-2">
              Añadir Nuevo Curso
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Course Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => handleCloseModal()}
      >
        {loadingClassifications ? (
          <ActivityIndicator size="small" color="#FB8500" />
        ) : errorClassifications ? (
          <Text className="text-white">Error al cargar clasificaciones</Text>
        ) : (
          <ModalAddCourse
            courseName={courseName}
            setCourseName={setCourseName}
            courseDescription={courseDescription}
            setCourseDescription={setCourseDescription}
            selectedCategory={modalSelectedCategory}
            setSelectedCategory={setModalSelectedCategory}
            classifications={classifications} // Pasar las clasificaciones al modal
            onCancel={() => handleCloseModal()}
            onAdd={handleAddCourse}
          />
        )}
      </Modal>

      <ToastComponent></ToastComponent>
    </SafeAreaView>
  );
};

export default AddCourseScreen;