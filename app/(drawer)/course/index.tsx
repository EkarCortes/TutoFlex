import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CourseList from "../../../components/CourseList";
import CustomDropdown from "../../../components/CustomDropdown";
import ModalAddCourse from "../../../components/ModalAddCourse";
import InputField from "../../../components/InputField";
import HeaderScreens from "../../../components/HeaderScreens";
import ToastComponent from "../../../components/Toast";
import useAddCourseScreen from "../../../hooks/courses/useAddCourseScreen";

const AddCourseScreen = () => {
  const {
    router,
    courses,
    loading,
    error,
    classifications,
    loadingClassifications,
    errorClassifications,
    selectedCategory,
    setSelectedCategory,
    modalSelectedCategory,
    setModalSelectedCategory,
    searchText,
    setSearchText,
    modalVisible,
    setModalVisible,
    courseName,
    setCourseName,
    courseDescription,
    setCourseDescription,
    handleCloseModal,
    handleAddCourse,
    handleRefresh,
    refreshing,
    user,
  } = useAddCourseScreen();

  return (
    <SafeAreaView
      className="flex-1 bg-[#023046]"
      edges={["left", "right", "bottom"]}
    >
      <HeaderScreens title="Cursos Disponibles" />

      <View className="flex-1 w-full px-5 py-3 md:px-8 md:py-5">
        <View className="w-full bg-[#0B4D6C] rounded-2xl p-5 shadow-lg mb-4">
          <View className="flex-row items-center mb-4">
            <Ionicons name="search" size={24} color="#FB8500" />
            <Text className="text-white text-xl font-bold ml-2">Buscar Cursos</Text>
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
                  { label: "Mis cursos", value: -1 },
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

        <View className="flex-1 bg-[#0B4D6C] rounded-2xl px-5 pt-4 pb-3 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Ionicons name="book" size={20} color="#FB8500" />
              <Text className="text-white text-xl font-bold ml-2">
                {selectedCategory === null
                  ? "Todos los cursos"
                  : selectedCategory === -1
                    ? "Mis cursos"
                    : classifications.find(
                      (classification) =>
                        classification.clasificacion_id === selectedCategory
                    )?.nombre || "Categoría desconocida"}
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
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          )}
        </View>
      </View>

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
      <Modal
        animationType="fade"
        transparent={true}
        hardwareAccelerated={true}
        statusBarTranslucent={true}
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
            classifications={classifications}
            onCancel={() => handleCloseModal()}
            onAdd={handleAddCourse}
          />
        )}
      </Modal>

      <ToastComponent />
    </SafeAreaView>
  );
};

export default AddCourseScreen;