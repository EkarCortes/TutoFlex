import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./LoadingScreen";
import usePaymentCard from "../hooks/receivedPayment/usePaymentCard";
import {formatTime } from '../hooks/receivedPayment/useCardDetailsPayments';


const estadoColors: Record<string, { color: string; bg: string; text: string }> = {
  pendiente: { color: "#FB8500", bg: "#0B4C6D", text: "Pendiente" }
};
  
const getEstadoStyle = (estado: string) => {
  const key = estado?.toLowerCase();
  return estadoColors[key] || { color: "#FB8500", bg: "#0B4C6D", text: "En Revisión" };
};

const PaymentCard = () => {

  const { students, loading, refreshPayments, navigateToDetails, isDetailDisabled } = usePaymentCard();

  if (loading) {
    return <LoadingScreen message="Cargando pagos recibidos..." />;
  }

  return (
    <View className="flex-1 p-4 bg-[##023046]">
      <FlatList
        data={students}
        keyExtractor={(item) => item.pago_id.toString()}
        refreshing={loading}
        onRefresh={refreshPayments}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-lg font-bold text-white mb-2">No tienes pagos recibidos</Text>
            <Text className="text-sm text-white opacity-70 text-center px-5">
              Cuando un estudiante realice un pago, aparecerá aquí.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const estadoStyle = getEstadoStyle(item.estado);

          return (
            <View
              className="rounded-xl shadow-md my-3 overflow-hidden"
              style={{ backgroundColor: estadoStyle.bg }}
            >
              <View style={{ height: 4, backgroundColor: estadoStyle.color }} />
              <View className="p-4">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-xl font-bold text-white">{item.nombre_estudiante}</Text>
                  <View
                    style={{
                      backgroundColor: estadoStyle.color,
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 16,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      {estadoStyle.text}
                    </Text>
                  </View>
                </View>

                <View className="bg-[#2379A1] p-3 rounded-xl mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-[#fff] text-sm">Profesor:</Text>
                    <Text className="font-bold text-white">{item.nombre_profesor}</Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-[#fff] text-sm">Materia:</Text>
                    <Text className="font-bold text-white">{item.nombre}</Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-[#fff] text-sm">Fecha:</Text>
                    <Text className="font-bold text-white">{(item.fecha_tutoria.split("T")[0].split("-").reverse().join("/"))}</Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-[#fff] text-sm">Horario:</Text>
                    <Text className="font-bold text-white">
                      {item.hora_inicio} - {formatTime(item.hora_fin)}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-[#fff] text-sm">Monto:</Text>
                    <Text className="font-bold text-white">₡{item.monto}</Text>
                  </View>
                </View>
                <View className="w-full mt-2">
                  <TouchableOpacity
                    className="flex-row bg-[#FB8500] py-3 rounded-lg items-center justify-center w-full"
                    onPress={() => navigateToDetails(item.pago_id)}
                    disabled={isDetailDisabled(item.estado)}
                    style={isDetailDisabled(item.estado) ? { opacity: 0.5 } : {}}
                  >
                    <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
                    <Text className="text-white font-semibold ml-2">Ver Detalle</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PaymentCard;
