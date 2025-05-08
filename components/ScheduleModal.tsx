import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  allDays: string[]; // Nombres completos de los días
  selectedDays: string[];
  toggleDay: (day: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
  onSave: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  visible,
  onClose,
  allDays,
  selectedDays,
  toggleDay,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onSave,
}) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [pickerType, setPickerType] = useState<"start" | "end">("start");

  // Abre el selector de tiempo
  const openTimePicker = (type: "start" | "end") => {
    setPickerType(type);
    setPickerVisible(true);
  };

  // Maneja la selección de tiempo
  const handleConfirm = (date) => {
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    if (pickerType === "start") {
      setStartTime(formattedTime);
      console.log("Start Time:", formattedTime);
    } else {
      setEndTime(formattedTime);

      console.log("End Time:", formattedTime);
    }
    setPickerVisible(false);
  };

  // Abreviaturas de los días
  const dayAbbreviations = ["L", "M", "X", "J", "V", "S", "D"];

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
      onDismiss={() => Keyboard.dismiss()}
    >
      <TouchableOpacity
        className="flex-1 justify-center items-center bg-black/80"
        activeOpacity={1}
        onPressOut={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="bg-[#023146] p-6 rounded-xl w-[90%]"
          onPress={() => Keyboard.dismiss()}
        >
          <View className="flex-row items-center justify-center mb-4">
            <MaterialIcons
              name="schedule"
              size={28}
              color="#FB8500"
              className="mr-2"
            />
            <Text className="text-xl text-white font-bold">Agendar Horario</Text>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            className="max-h-[400px]"
          >
            {/* Selección de días */}
            <Text className="text-white font-bold mb-2">Seleccione día:</Text>
            <View className="flex-row border border-[#023146] rounded-lg overflow-hidden">
              {allDays.map((day, index) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => toggleDay(day)}
                  className={`flex-1 items-center py-3 border-r border-[#023146] ${
                    selectedDays.includes(day) ? "bg-[#FB8500]" : "bg-white"
                  } ${index === allDays.length - 1 ? "border-r-0" : ""}`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      selectedDays.includes(day)
                        ? "text-white"
                        : "text-[#023146]"
                    }`}
                  >
                    {dayAbbreviations[index]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Rango horario */}
            <Text className="text-white font-bold mt-4 mb-2">
              Seleccione rango horario:
            </Text>
            <View className="flex-row items-center mb-4">
              {/* Botón para seleccionar hora de inicio */}
              <TouchableOpacity
                onPress={() => openTimePicker("start")}
                className="flex-1 flex-row items-center justify-between bg-[#023046] p-3 rounded-lg border border-[#FB8500] mr-2"
              >
                <Text className="text-white">{startTime || "Hora inicio"}</Text>
              </TouchableOpacity>

              <Text className="mx-2 text-white font-bold">a</Text>

              {/* Botón para seleccionar hora de fin */}
              <TouchableOpacity
                onPress={() => openTimePicker("end")}
                className="flex-1 flex-row items-center justify-between bg-[#023046] p-3 rounded-lg border border-[#FB8500] ml-2"
              >
                <Text className="text-white">{endTime || "Hora fin"}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Botones de acción */}
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 px-4 py-3 mr-2 bg-gray-300 rounded-lg"
              accessibilityRole="button"
              accessibilityLabel="Cancelar"
            >
              <Text className="text-black text-center font-semibold">
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onSave();
                onClose();
              }}
              className="flex-1 px-4 py-3 bg-[#FB8500] rounded-lg"
              accessibilityRole="button"
              accessibilityLabel="Guardar"
            >
              <Text className="text-white text-center font-semibold">
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </Modal>
  );
};

export default ScheduleModal;