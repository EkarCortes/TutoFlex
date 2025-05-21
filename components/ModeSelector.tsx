import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ModeSelectorProps {
  modalidades: string[];
  selectedModalidad: string | null;
  setSelectedModalidad: (modalidad: string) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({
  modalidades,
  selectedModalidad,
  setSelectedModalidad,
}) => {
  return (
    <View className="mb-6  py-4">
         <Text className="text-white text-xl font-bold mb-2">Modalidad</Text>
             <View className="h-0.5 bg-[#8ECAE6] opacity-60 mb-6 mx-0 rounded-full w-full" />
      <View className="flex-row gap-2">
        
        {modalidades.map((modalidad) => (
          <TouchableOpacity
            key={modalidad}
            className={`flex-1 flex-row items-center justify-center py-3 px-2 rounded-md ${
              selectedModalidad === modalidad ? "bg-[#FA8401]" : "bg-[#2379A1] opacity-70"
            }`}
            onPress={() => setSelectedModalidad(modalidad)}
            accessibilityRole="button"
            accessibilityLabel={`Seleccionar modalidad ${modalidad}`}
          >
            <MaterialIcons
              name={modalidad === "Presencial" ? "school" : "videocam"}
              size={20}
              color="white"
            />
            <Text
              className={`ml-2 text-sm ${
                selectedModalidad === modalidad ? "text-white" : "text-gray-300"
              }`}
            >
              {modalidad}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ModeSelector;