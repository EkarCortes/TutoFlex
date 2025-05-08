//Componente para mostrar la lista de horarios agendados en la pantalla setClassDetails
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ScheduleListProps {
  scheduleData: string[];
  onRemove: (index: number) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({ scheduleData, onRemove }) => {
  return (
    <View className="mt-4 bg-[#fff] rounded p-2">
      <Text className="font-bold text-[#022D42] text-center mb-2">Horarios Agendados</Text>
      <View className="flex-row justify-between items-center border-b border-gray-500 py-2 mb-1">
        <Text className="flex-1 text-[#022D42] font-bold text-center">Día</Text>
        <Text className="flex-1 text-[#022D42] font-bold text-center">Horario</Text>
        <Text className="w-16"></Text>
      </View>
      {scheduleData.map((slot, index) => {
        if (!slot) {
          console.error("Slot inválido:", slot);
          return null;
        }
        const [day, start, end] = slot.split("-");        return (
          <View
            key={index}
            className="flex-row justify-between items-center border-b border-gray-200 py-2"
          >
            <Text className="flex-1 text-[#022D42] text-center">{day}</Text>
            <Text className="flex-1 text-[#022D42] text-center">
              {start} - {end}
            </Text>
            <TouchableOpacity
              onPress={() => onRemove(index)}
              className="bg-red-500 px-2 py-1 rounded w-16"
            >
              <Text className="text-white text-center">X</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ScheduleList;