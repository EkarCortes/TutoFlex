import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const estadoColors: Record<string, { color: string; bg: string; text: string }> = {
  pendiente: { color: "#FB8500", bg: "#0B4C6D", text: "Pendiente" },

};

const getEstadoStyle = (estado: string) => {
  const key = estado?.toLowerCase();
  return estadoColors[key] || { color: "#FB8500", bg: "#0B4C6D", text: "En Revisión" };
};

const PagoItem = ({
  nombre,
  telefono,
  materia,
  monto,
  fecha,
  estado,
  onPress,
  onCancel,
}: {
  nombre: string;
  telefono: string;
  materia: string;
  monto: string;
  fecha: string;
  estado: string;
  onPress: () => void;
  onCancel?: () => void;
}) => {
  const estadoStyle = getEstadoStyle(estado);

  return (
    <View
      className="rounded-xl shadow-md my-3 overflow-hidden"
      style={{ backgroundColor: estadoStyle.bg }}
    >
      <View style={{ height: 4, backgroundColor: estadoStyle.color }} />
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xl font-bold text-white">{nombre}</Text>
          <View
            style={{
              backgroundColor: estadoStyle.color,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 16,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{estadoStyle.text}</Text>
          </View>
        </View>

        <View className="bg-[#2379A1] p-3 rounded-xl mb-3">
          <View className="flex-row justify-between mb-1">
            <Text className="text-[#fff] text-sm">Materia:</Text>
            <Text className="font-bold text-white">{materia}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-[#fff] text-sm">Monto:</Text>
            <Text className="font-bold text-white">{monto}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-[#fff] text-sm">Fecha:</Text>
            <Text className="font-bold text-white">{fecha}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[#fff] text-sm">Teléfono:</Text>
            <Text className="font-bold text-white">{telefono}</Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-2">
          <TouchableOpacity
            className="flex-1 bg-[#FB8500] py-2.5 rounded-lg flex-row justify-center items-center mr-2"
            onPress={onPress}
          >
            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
            <Text className="text-white font-semibold ml-1.5">Ver Detalle</Text>
          </TouchableOpacity>
          {onCancel && (
            <TouchableOpacity
              className="flex-1 bg-[#E53E3E] py-2.5 rounded-lg flex-row justify-center items-center"
              onPress={onCancel}
            >
              <MaterialIcons name="cancel" size={18} color="#fff" />
              <Text className="text-white font-semibold ml-1.5">Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default PagoItem;