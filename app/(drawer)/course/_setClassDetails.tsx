import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, Modal } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import InputField from "../../../components/InputField";
import HeaderScreens from "../../../components/HeaderScreens";
import ScheduleModal from "../../../components/ScheduleModal";
import ScheduleList from "../../../components/ScheduleList";
import { useSchedule } from "../../../hooks/useSchedule";
import { useAddTutoring } from "../../../hooks/useAddTutoring";
import { useSelectedDays } from "../../../hooks/useSelectedDays";
import useCourseDetails from "../../../hooks/useCourseDetails";
import ModeSelector from "../../../components/ModeSelector";
import { useHandleSaveClassDetails } from "../../../hooks/useHandleSaveClassDetails";
import { useInitializeCourseDetails } from "../../../hooks/useInitializeCourseDetails";
import ToastComponent, { showToast } from "../../../components/Toast"; // Importar la función showToast
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import useDeleteCourseProfesor from "../../../hooks/useDeleteCourseProfesor";

const modalidades = ["Presencial", "Virtual", "Híbrida"];

const SetClassDetails = () => {
  const router = useRouter();
  const { id, name = "Curso sin nombre" } = useLocalSearchParams();
  const { addTutoring } = useAddTutoring();
  const curso_id = parseInt(id as string, 10);
  // Hook para obtener los detalles del curso
  const { courseDetails, loading, error } = useCourseDetails(curso_id);
  // Usa el hook useSelectedDays para manejar los días seleccionados
  const { selectedDays, toggleDay } = useSelectedDays();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [selectedModalidad, setSelectedModalidad] = useState("");
  const { scheduleData, setScheduleData, addSchedule, removeSchedule } =
    useSchedule();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Estado para el modal de eliminación
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false); // Estado para el modal de horarios
  
  const { handleDelete, loading: deleting } = useDeleteCourseProfesor(() => {
    router.back(); // Navegar hacia atrás después de eliminar
  });
  // Inicializar los datos del curso
  useInitializeCourseDetails({
    courseDetails,
    setPrice,
    setSelectedModalidad,
    setScheduleData,
  });

  // Hook para manejar el guardado
  const handleSave = useHandleSaveClassDetails({
    id: id as string,
    price,
    selectedModalidad,
    scheduleData,
    addTutoring,
  });

  const allDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <SafeAreaView
      className="flex-1 bg-[#023046]"
      edges={["left", "right", "bottom"]}
    >
      <HeaderScreens title="Detalles de la tutoría" />

      <ScrollView className="flex-1">
        <View className="p-5">
          {/* Selected Course Card */}
          <View className="bg-[#0d6a97] rounded-2xl shadow-lg mb-6 overflow-hidden">
            {/* Contenido de la tarjeta */}
            <View className="p-5 flex-row items-center">
              <Ionicons name="book" size={48} color="#FB8500" />
              <View className="ml-4 flex-1">
                <Text className="text-white text-2xl font-bold">{name}</Text>
                <Text className="text-white/70 text-sm mt-1">
                  Gestiona los detalles de este curso.
                </Text>
              </View>
            </View>
          </View>

          {/* Price Card */}
          <View className="bg-[#0d6a97] rounded-2xl shadow-lg mb-4 overflow-hidden">
            <View className="px-5 py-4 border-b border-[#FFF]/30">
              <Text className="text-white text-lg font-bold">
                Precio por sesión
              </Text>
              <Text className="text-white/70 text-sm">
                Establece el costo por cada hora de tutoría
              </Text>
            </View>

            <View className="p-5">
              <View className="flex-row items-center bg-[#023046]/20 rounded-xl ">
                <InputField
                  icon="attach-money"
                  placeholder="Precio por sesión (1 hora)"
                  keyboardType="phone-pad"
                  value={price}
                  onChangeText={setPrice}
                  className="flex-1 ml-2 text-white"
                />
              </View>
            </View>
          </View>

          {/* Modalidad Card */}
          <View className="bg-[#0d6a97] rounded-2xl shadow-lg mb-4 overflow-hidden">
            <View className="px-5 py-4 border-b border-[#FFF]/30">
              <Text className="text-white text-lg font-bold">Modalidad</Text>
              <Text className="text-white/70 text-sm">
                Selecciona la modalidad de la tutoría
              </Text>
            </View>
            <ModeSelector
              modalidades={modalidades}
              selectedModalidad={selectedModalidad}
              setSelectedModalidad={setSelectedModalidad}
            />
          </View>

          {/* Schedule Card */}
          <View className="bg-[#0d6a97] rounded-2xl shadow-lg mb-6 overflow-hidden">
            <View className="px-5 py-4 border-b border-[#FFF]/30 flex-row justify-between items-center">
              <View>
                <Text className="text-white text-lg font-bold">
                  Horarios disponibles
                </Text>
                <Text className="text-white/70 text-sm">
                  Define cuándo puedes dar tutorías
                </Text>
              </View>
              <View className="h-8 w-8 items-center justify-center rounded-full bg-[#FB8500]">
                <Text className="text-white font-bold">
                  {scheduleData.length}
                </Text>
              </View>
            </View>

            <View className="p-5">
              {scheduleData.length > 0 ? (
                <ScheduleList
                  scheduleData={scheduleData}
                  onRemove={removeSchedule}
                />
              ) : (
                <View className="items-center py-6">
                  <MaterialIcons name="event-busy" size={48} color="#fff" />
                  <Text className="text-white/70 text-center mt-3 mb-2">
                    No has agendado horarios disponibles
                  </Text>
                </View>
              )}

              <TouchableOpacity
                onPress={() => {
                  if (!price.trim()) {
                    showToast(
                      "error",
                      "Por favor ingrese un precio antes de agendar horarios",
                      "Error",
                      "top"
                    );
                    return;
                  }
                  setScheduleModalVisible(true);
                }}
                className="mt-4 bg-[#FB8500] py-3 px-4 rounded-xl flex-row items-center justify-center"
              >
                <Ionicons name="calendar" size={20} color="white" />
                <Text className="text-white font-bold ml-2">
                  Agregar Horario
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Instructions */}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <View className="flex-row justify-between">
          {/* Botón de eliminar */}
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(true)}
            className="bg-[#FF4C4C] rounded-xl py-3 px-6 w-[48%] items-center"
            disabled={deleting}
          >
            <Text className="text-white font-semibold">Eliminar</Text>
          </TouchableOpacity>
      
          {/* Botón de guardar */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-[#FB8500] rounded-xl py-3 px-6 w-[48%] items-center"
          >
            <Text className="text-white font-semibold">Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScheduleModal
        visible={scheduleModalVisible}
        onClose={() => setScheduleModalVisible(false)} // Asegúrate de cerrar el modal aquí
        allDays={allDays}
        selectedDays={selectedDays}
        toggleDay={toggleDay}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onSave={() => addSchedule(selectedDays, startTime, endTime)}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={() => {
          if (courseDetails?.curso_profesor_id) {
            handleDelete(courseDetails.curso_profesor_id); // Llamar al hook para eliminar
            setDeleteModalVisible(false); // Cerrar el modal
          } else {
            showToast(
              "error",
              "No se pudo eliminar el curso. ID del curso no encontrado.",
              "Error",
              "top"
            );
          }
        }}
        message={`¿Eliminar curso "${name}"?`}
      ></DeleteConfirmationModal>
      <ToastComponent></ToastComponent>
    </SafeAreaView>
  );
};

export default SetClassDetails;
