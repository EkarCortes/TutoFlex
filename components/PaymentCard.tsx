import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LoadingScreen from "./LoadingScreen";
import usePaymentCard from "../hooks/receivedPayment/usePaymentCard";

const PaymentCard = () => {
  const { students, loading, refreshPayments, navigateToDetails } = usePaymentCard();

  if (loading) {
    return <LoadingScreen message="Cargando pagos recibidos..." />;
  }

  return (
    <View className="flex-1 p-4">
      <FlatList
        data={students}
        keyExtractor={(item) => item.pago_id.toString()}
        refreshing={loading}
        onRefresh={refreshPayments}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-[#096491] p-4 my-2 h-32 rounded-lg flex-row items-center shadow-md"
            onPress={() => navigateToDetails(item.pago_id)}
          >
            <Image
              source={require("../assets/images/AvatarStudents.png")}
              style={{
                width: 115,
                height: 115,
                borderRadius: 24,
                marginRight: 16,
                borderWidth: 2,
                borderColor: "#FFA500",
              }}
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-lg font-bold text-white">{item.estudiante_nombre}</Text>
              <Text className="text-sm text-white">{item.estudiante_email}</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#FFA500" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-lg font-bold text-white mb-2">No tienes pagos recibidos</Text>
            <Text className="text-sm text-white opacity-70 text-center px-5">
              Cuando un estudiante realice un pago, aparecerá aquí.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default PaymentCard;