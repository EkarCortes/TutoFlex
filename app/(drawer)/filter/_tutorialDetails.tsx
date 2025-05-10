import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import DateCalendar from "../../../components/DateCalendar";
import ScheduleSelector from "../../../components/ScheduleSelector";
import ModeSelector from "../../../components/ModeSelector";
import TopicsInput from "../../../components/TopicsInput";
import StatusBarComponent from "../../../components/StatusBarComponent";
import HeaderScreens from "../../../components/HeaderScreens";
import InfoTeacher from "../../../components/InfoTeacher";
import ToastComponent, { showToast } from "../../../components/Toast";
import useTutorialDetails from "../../../hooks/tutorial/useTutorialDetails";
import "../../../global.css";

// ConfirmationModal component definition
interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tutorData: any;
  selectedDate: string | null;
  selectedHorarios: number[];
  horarios: string[];
  formatSelectedDate: (date: string) => string;
  isSubmitting: boolean;
  selectedModalidad: string | null; 
}

// Calendar modal component
interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  selectedDates: any;
  onDayPress: (day: any) => void;
  disabledDaysOfWeek: number[];
  selectedDate: string | null;
  formatSelectedDate: (date: string) => string;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  selectedDates,
  onDayPress,
  disabledDaysOfWeek,
  selectedDate,
  formatSelectedDate,
}) => {
  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      hardwareAccelerated={true}
      statusBarTranslucent={true}
    >
      <View className="flex-1 justify-end bg-black/70">
        <View className="bg-[#023046] rounded-t-3xl p-6 shadow-2xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">Selecciona una fecha</Text>
            <TouchableOpacity onPress={onClose} className="p-2">
              <Ionicons name="close-circle" size={28} color="#FB8500" />
            </TouchableOpacity>
          </View>
        
            <DateCalendar
              selectedDates={selectedDates}
              onDayPress={onDayPress}
              disabledDaysOfWeek={disabledDaysOfWeek}
            />
        
          <View className="items-center">
            <Ionicons
              name="calendar-outline"
              size={32}
              color="#FB8500"
              style={{ marginBottom: 8 }}
            />
            <Text className="text-white mb-3 text-center text-base">
              {selectedDate
                ? `Fecha seleccionada: ${formatSelectedDate(selectedDate)}`
                : "No has seleccionado una fecha"}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="bg-[#FB8500] py-3 px-8 rounded-xl items-center mt-2 shadow"
              disabled={!selectedDate}
              style={{
                opacity: selectedDate ? 1 : 0.6,
              }}
            >
              <Text className="text-white font-bold text-base">Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  tutorData,
  selectedDate,
  selectedHorarios,
  horarios,
  formatSelectedDate,
  isSubmitting,
  selectedModalidad, 
}) => {
  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} 
      presentationStyle="overFullScreen"
      hardwareAccelerated={true}
      statusBarTranslucent={true}
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-[#023046] w-11/12 rounded-3xl p-6 shadow-2xl ">
          <View className="items-center mb-4">
            <Ionicons name="checkmark-circle" size={48} color="#FB8500" />
            <Text className="text-white text-2xl font-bold mt-2 mb-1 text-center">
              Confirmar Tutoría
            </Text>
            <Text className="text-[#B0BFCB] text-base text-center mb-2">
              Revisa los detalles antes de guardar tu solicitud.
            </Text>
          </View>

          <View className="bg-[#096491] rounded-xl p-4 mb-5">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[#B0BFCB] font-medium">Profesor</Text>
              <Text className="text-white font-semibold">{tutorData?.profesor}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[#B0BFCB] font-medium">Curso</Text>
              <Text className="text-white font-semibold">{tutorData?.curso}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[#B0BFCB] font-medium">Fecha</Text>
              <Text className="text-white font-semibold">
                {selectedDate ? formatSelectedDate(selectedDate) : "No seleccionada"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[#B0BFCB] font-medium">Horario</Text>
              <Text className="text-white font-semibold">
                {selectedHorarios.length > 0 &&
                horarios[selectedHorarios[0]] !== "No hay horarios disponibles"
                  ? horarios[selectedHorarios[0]]
                  : "No seleccionado"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[#B0BFCB] font-medium">Modalidad</Text>
              <Text className="text-white font-semibold">
                {(tutorData?.modalidad?.toLowerCase() === "hibrida" ||
                  tutorData?.modalidad?.toLowerCase() === "híbrida")
                  ? selectedModalidad
                  : tutorData?.modalidad}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-[#B0BFCB] font-bold">Costo</Text>
              <Text className="text-[#FA8401] font-bold text-lg">
                ₡{tutorData?.monto_por_hora || "0"}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between gap-4">
            <TouchableOpacity
              className="flex-1 bg-[#E5E7EB] p-3 rounded-xl"
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text className="text-[#023047] text-center font-semibold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-[#FA8401] p-3 rounded-xl"
              onPress={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-white text-center font-semibold">Confirmar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const TutoriaScreen = () => {
  const params = useLocalSearchParams();
  const tutorData = params.tutorData ? JSON.parse(params.tutorData as string) : null;
  const [showCalendarModal, setShowCalendarModal] = useState(false);


  const {
    selectedDate,
    selectedHorarios,
    selectedModalidad,
    topics,
    setTopics,
    showConfirmModal,
    isSubmitting,
    selectedDates,
    handleDayPress,
    pendingTutorials,
    occupiedHorarios,
    toggleHorario,
    setSelectedModalidad,
    formatSelectedDate,
    handleCloseModal,
    handleConfirm,
    setShowConfirmModal,
    availableHours,
    getDisabledDaysOfWeek,
    horariosToDisplay,
    modalidadesToDisplay,
  } = useTutorialDetails(tutorData);

  return (
    <View className="flex-1 bg-[#023046]">
      <StatusBarComponent />
      <HeaderScreens title={"Detalles Tutoría"} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
        >
          <View className="p-4 mt-1">
            <InfoTeacher tutorData={tutorData} />
            <View className="bg-[#096491] rounded-2xl p-5 shadow-lg mb-4">
              <Text className="text-white text-lg font-bold mb-2">Fecha</Text>
              <TouchableOpacity
                onPress={() => setShowCalendarModal(true)}
                className="flex-row items-center bg-[#FB8500] rounded-xl px-4 py-3 mb-4"
              >
                <Ionicons name="calendar-outline" size={22} color="#fff" style={{ marginRight: 10 }} />
                <Text className="text-[#fff] font-medium">
                  {selectedDate
                    ? formatSelectedDate(selectedDate)
                    : "Seleccionar fecha"}
                </Text>
              </TouchableOpacity>
              <ScheduleSelector
                horarios={horariosToDisplay}
                selectedHorarios={selectedHorarios}
                toggleHorario={toggleHorario}
                dateSelected={!!selectedDate}
                occupiedHorarios={occupiedHorarios}
              />
              <ModeSelector
                modalidades={modalidadesToDisplay}
                selectedModalidad={selectedModalidad}
                setSelectedModalidad={setSelectedModalidad}
              />
              <TopicsInput
                topics={topics}
                setTopics={setTopics}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-[#0B4D6D] rounded-xl py-3 px-6 w-[48%] items-center"
          >
            <Text className="text-white font-semibold">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!selectedDate || selectedHorarios.length === 0) {
                showToast("error", "Por favor seleccione fecha y horario");
                return;
              }
              if (!topics || topics.trim().length === 0) {
                showToast("error", "Por favor ingrese los temas a tratar");
                return;
              }
              setShowConfirmModal(true);
            }}
            className="bg-[#FB8500] rounded-xl py-3 px-6 w-[48%] items-center"
          >
            <Text className="text-white font-semibold">Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ToastComponent />

      <CalendarModal
        visible={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        selectedDates={selectedDates}
        onDayPress={handleDayPress}
        disabledDaysOfWeek={getDisabledDaysOfWeek()}
        selectedDate={selectedDate}
        formatSelectedDate={formatSelectedDate}
      />

      <ConfirmationModal
        visible={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        tutorData={tutorData}
        selectedDate={selectedDate}
        selectedHorarios={selectedHorarios}
        horarios={horariosToDisplay}
        formatSelectedDate={formatSelectedDate}
        isSubmitting={isSubmitting}
        selectedModalidad={selectedModalidad}
      />
    </View>
  );
};

export default TutoriaScreen;