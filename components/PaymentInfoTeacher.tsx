import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type PagoInfoProps = {
  nombre: string;
  email: string;
  fecha: string;
  monto: string;
  telefono: string;
};

const PaymentInfoTeacher: React.FC<PagoInfoProps> = ({
  nombre,
  email,
  fecha,
  monto,
  telefono,
}) => {
  return (
    <View
      className="rounded-2xl shadow-xl my-3 overflow-hidden"
      style={{ backgroundColor: "#0B4C6C" }}
    >
      <View style={{ height: 4, backgroundColor: "#FB8500" }} />

      <View className="bg-[#0B4D6D] rounded-3xl p-6 shadow-xl">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <MaterialIcons name="account-circle" size={28} color="#FEB602" />
            <Text className="text-2xl text-white ml-3 font-bold">{nombre}</Text>
          </View>
        </View>

        <View>
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Text className="text-lg text-white font-bold ml-1">{monto}</Text>
            </View>
            <View className="flex-row items-center">
              <MaterialIcons name="calendar-month" size={22} color="#FEB602" />
              <Text className="text-base text-white font-bold ml-1">{fecha}</Text>
            </View>
          </View>

          <View className="h-0.5 bg-[#fff] opacity-60 mb-4 rounded-full" />

          <View className="mb-3 flex-row items-center">
            <MaterialIcons name="mail" size={22} color="#FEB602" />
            <Text className="text-base text-white ml-2 font-semibold">
              {email}
            </Text>
          </View>
          <View className="mb-3 flex-row items-center">
            <MaterialIcons name="phone" size={22} color="#FEB602" />
            <Text className="text-base text-white ml-2 font-semibold">
              {telefono}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentInfoTeacher;