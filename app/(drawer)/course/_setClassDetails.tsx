import React from "react";
import { ScrollView, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import HeaderScreens from "../../../components/HeaderScreens";
import ScheduleModal from "../../../components/ScheduleModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import ToastComponent, { showToast } from "../../../components/Toast";
import ScheduleList from "../../../components/ScheduleList";
import ModeSelector from "../../../components/ModeSelector";
import InputField from "../../../components/InputField";
import useSetClassDetails from "../../../hooks/courses/useSetClassDetails";

const SetClassDetails = () => {
  const {
    name,
    selectedDays,
    toggleDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    price,
    setPrice,
    selectedModalidad,
    setSelectedModalidad,
    scheduleData,
    addSchedule,
    removeSchedule,
    deleteModalVisible,
    setDeleteModalVisible,
    scheduleModalVisible,
    setScheduleModalVisible,
    handleSave,
    handleDeleteConfirm,
    deleting,
    allDays,
  } = useSetClassDetails();

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={["left", "right", "bottom"]}>
      <HeaderScreens title="Detalles de la tutoría" />
      <ScrollView className="flex-1">
        <View className="p-5">
          {/* Selected Course Card */}
          <View className="bg-[#0B4D6C] rounded-2xl shadow-lg mb-6 overflow-hidden">
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
          <View className="bg-[#0B4D6C] rounded-2xl shadow-lg mb-4 overflow-hidden">
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
          <View className="bg-[#0B4D6C] rounded-2xl shadow-lg mb-4 overflow-hidden">
            <View className="px-5 py-4 border-b border-[#FFF]/30">
              <Text className="text-white text-lg font-bold">Modalidad</Text>
              <Text className="text-white/70 text-sm">
                Selecciona la modalidad de la tutoría
              </Text>
            </View>
            <ModeSelector
              modalidades={["Presencial", "Virtual", "Híbrida"]}
              selectedModalidad={selectedModalidad}
              setSelectedModalidad={setSelectedModalidad}
            />
          </View>

          {/* Schedule Card */}
          <View className="bg-[#0B4D6C] rounded-2xl shadow-lg mb-6 overflow-hidden">
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
        </View>
      </ScrollView>

      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => setDeleteModalVisible(true)}
            className="bg-[#FF4C4C] rounded-xl py-3 px-6 w-[48%] items-center"
            disabled={deleting}
          >
            <Text className="text-white font-semibold">Eliminar</Text>
          </TouchableOpacity>
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
        onClose={() => setScheduleModalVisible(false)}
        allDays={allDays}
        selectedDays={selectedDays}
        toggleDay={toggleDay}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        onSave={() => addSchedule(selectedDays, startTime, endTime)}
      />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
        message={`¿Eliminar curso "${name}"?`}
      />
      <ToastComponent />
    </SafeAreaView>
  );
};

export default SetClassDetails;
