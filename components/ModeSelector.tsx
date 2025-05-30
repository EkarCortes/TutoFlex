import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

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
    <View className="mb-6 py-4  items-center justify-center">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {modalidades.map((modalidad) => (
            <TouchableOpacity
              key={modalidad}
              className={`flex-row items-center justify-center py-3 px-3 rounded-md  ${
                selectedModalidad === modalidad
                  ? "bg-[#FA8401]"
                  : "bg-[#2379A1] opacity-70"
              }`}
              style={{ width: 100, minWidth: 90 }} // <-- ancho fijo para todos
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
                  selectedModalidad === modalidad
                    ? "text-white"
                    : "text-gray-300"
                }`}
              >
                {modalidad}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ModeSelector;