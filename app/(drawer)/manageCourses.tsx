import React from "react";
import { View, Text, ActivityIndicator, Modal, Alert, TouchableOpacity, FlatList, RefreshControl, TextInput } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import useManageCoursesScreen from "../../hooks/manageCourse/useManageCoursesScreen";
import ModalAddCourse from "../../components/ModalAddCourse";
import HeaderScreens from '../../components/HeaderScreens';
import CustomDropdown from "../../components/CustomDropdown";
import InputField from "../../components/InputField";
import ToastComponent from "../../components/Toast";

const ManageCourseScreen = () => {
  const {
    modalVisible, setModalVisible,
    courseName, setCourseName,
    courseDescription, setCourseDescription,
    searchText, setSearchText,
    selectedCategory, setSelectedCategory,
    refreshing, deleteModalVisible, setDeleteModalVisible,
    courseToDelete, editModalVisible, setEditModalVisible,
    courseToEdit, editName, setEditName, editDescription, setEditDescription,
    loading, error, classifications, filteredCourses,
    handleAddCourse, handleEditCourse, handleSaveEdit,
    showDeleteModal, confirmDeleteCourse, onRefresh,
  } = useManageCoursesScreen();

  const renderCourse = ({ item }) => (
    <View
      className="mb-4 p-4 rounded-2xl shadow-lg"
      style={{
        backgroundColor: "#0A4C6D",
        elevation: 4,
      }}
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-xl font-bold text-[#fff] flex-1">{item.name}</Text>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 7,
            paddingHorizontal: 10,
            paddingVertical: 2,
            marginLeft: 8,
          }}
        >
          <Text className="text-xs text-[#0A4C6D] font-semibold">
            {item.category}
          </Text>
        </View>
      </View>
      <Text className="text-[#fff] mb-3">{item.description}</Text>
      <View className="flex-row space-x-3 mt-2">
        <TouchableOpacity
          className="flex-row items-center bg-[#FB8500] px-4 py-2 rounded-md"
          onPress={() => handleEditCourse(item)}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text className="text-white ml-2 font-semibold">Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center bg-red-500 ml-1 px-4 py-2 rounded-md"
          onPress={() => showDeleteModal(item)}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text className="text-white ml-2 font-semibold">Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={['left', 'right', 'bottom']}>
      <HeaderScreens title={"Gestionar Cursos"} />
      <View className="flex-1 w-full px-5 py-3 md:px-8 md:py-5">
        {/* Card de búsqueda y filtro */}
        <View className="w-full bg-[#0d6a97] rounded-2xl p-5 shadow-lg mb-4">
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
            {loading ? (
              <ActivityIndicator size="small" color="#FB8500" />
            ) : error ? (
              <Text className="text-white">Error al cargar clasificaciones</Text>
            ) : (
              <CustomDropdown
                data={[
                  { label: "Todas las categorías", value: null },
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

        {/* Lista de cursos filtrados */}
        <View className="flex-1 bg-[#0d6a97] rounded-2xl px-5 pt-4 pb-3 shadow-lg">
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Ionicons name="book" size={20} color="#FB8500" />
              <Text className="text-white text-xl font-bold ml-2">
                Todos los cursos
              </Text>
            </View>
            {!loading && filteredCourses?.length > 0 && (
              <View className="bg-[#FB8500] px-3 py-1 rounded-full">
                <Text className="text-white font-medium">{filteredCourses.length}</Text>
              </View>
            )}
          </View>

          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#FB8500" />
              <Text className="text-white mt-4 text-center">Cargando cursos...</Text>
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="alert-circle" size={48} color="#FB8500" />
              <Text className="text-center text-white mt-3 px-5">{error}</Text>
            </View>
          ) : filteredCourses?.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="school-outline" size={64} color="#ffffff" />
              <Text className="text-center text-white text-lg font-medium mt-4">
                No se encontraron cursos
              </Text>
              <Text className="text-center text-white opacity-70 mt-2 px-8 mb-4">
                Intenta con otros criterios de búsqueda o añade un nuevo curso
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredCourses}
              keyExtractor={(item) => item.id}
              renderItem={renderCourse}
              contentContainerStyle={{ paddingBottom: 20 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#FB8500"]}
                  tintColor="#FB8500"
                />
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>

      {/* Add Course Button */}
      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <TouchableOpacity
          className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white font-bold text-lg ml-2">Añadir Nuevo Curso</Text>
        </TouchableOpacity>
      </View>

      {/* Add Course Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        hardwareAccelerated={true}
        statusBarTranslucent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalAddCourse
          courseName={courseName}
          setCourseName={setCourseName}
          courseDescription={courseDescription}
          setCourseDescription={setCourseDescription}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          classifications={classifications}
          onCancel={() => setModalVisible(false)}
          onAdd={handleAddCourse}
        />
      </Modal>

      {/* Edit Course Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
        presentationStyle="overFullScreen"
        hardwareAccelerated={true}
        statusBarTranslucent={true}
      >
        <View className="flex-1 justify-center items-center bg-black/70">
          <View className="bg-[#023046] w-11/12 rounded-3xl p-6 shadow-2xl">
            <View className="items-center mb-4">
              <Ionicons name="create-outline" size={48} color="#FB8500" />
              <Text className="text-white text-2xl font-bold mt-2 mb-1 text-center">
                Editar Curso
              </Text>
              <Text className="text-[#B0BFCB] text-base text-center mb-2">
                Modifica los campos y guarda los cambios.
              </Text>
            </View>
            <View className="mb-4">
              <Text className="text-[#B0BFCB] mb-1">Nombre del curso</Text>
              <TextInput
                className="bg-[#0B4D6C] rounded-lg p-3 text-white"
                value={editName}
                onChangeText={setEditName}
                placeholder="Nombre del curso"
                placeholderTextColor="#B0BFCB"
              />
            </View>
            <View className="mb-6">
              <Text className="text-[#B0BFCB] mb-1">Descripción</Text>
              <TextInput
                className="bg-[#0B4D6C] rounded-lg p-3 text-white"
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Descripción del curso"
                placeholderTextColor="#B0BFCB"
                multiline
              />
            </View>
            <View className="flex-row justify-between gap-4">
              <TouchableOpacity
                className="flex-1 bg-[#E5E7EB] p-3 rounded-xl"
                onPress={() => setEditModalVisible(false)}
              >
                <Text className="text-[#023047] text-center font-semibold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-[#FB8500] p-3 rounded-xl"
                onPress={handleSaveEdit}
              >
                <Text className="text-white text-center font-semibold">Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Course Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        presentationStyle="overFullScreen"
        hardwareAccelerated={true}
        statusBarTranslucent={true}
      >
        <View className="flex-1 justify-center items-center bg-black/70">
          <View className="bg-[#023046] w-11/12 rounded-3xl p-6 shadow-2xl ">
            <View className="items-center mb-4">
              <MaterialIcons name="delete-forever" size={48} color="#FB8500" />
              <Text className="text-white text-2xl font-bold mt-2 mb-1 text-center">
                Eliminar Curso
              </Text>
              <Text className="text-[#B0BFCB] text-sm text-center mb-2">
                Esta acción no se puede deshacer.
              </Text>
            </View>

            <View className="bg-[#096491] rounded-xl p-4 mb-5">
            <Text className="text-[#fff] text-base text-center mb-2">
                ¿Estás seguro que deseas eliminar el curso
                <Text className="font-bold text-[#FB8500]">{courseToDelete ? ` : ${courseToDelete.name}` : ""}</Text>?
              </Text>
            </View>

            <View className="flex-row justify-between gap-4">
              <TouchableOpacity
                className="flex-1 bg-[#E5E7EB] p-3 rounded-xl"
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text className="text-[#023047] text-center font-semibold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-red-500 p-3 rounded-xl"
                onPress={confirmDeleteCourse}
              >
                <Text className="text-white text-center font-semibold">Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ToastComponent />
    </SafeAreaView>
  );
};

export default ManageCourseScreen;