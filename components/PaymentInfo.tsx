import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type PagoInfoProps = {
  nombre: string;
  materia: string;
  hora: string;
  modalidad: string;
  monto: string;
  telefono: string;
  fecha: string;
};

const PaymentInfo: React.FC<PagoInfoProps> = ({
  nombre,
  materia,
  hora,
  fecha,
  modalidad,
  monto,
  telefono,
}) => {
  const capitalizeFirstLetter = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <View className="bg-[#0B4C6C] rounded-3xl p-6 mb-6 shadow-xl">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <MaterialIcons name="account-circle" size={28} color="#FEB602" />
          <Text className="text-2xl text-white ml-3 font-bold" >
            {nombre}
          </Text>
        </View>
        <View className="bg-[#FB8500] px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-bold" >
            {capitalizeFirstLetter(modalidad)}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Text className="text-xl text-white font-bold ml-1" >
            {monto}
          </Text>
        </View>
        <View className="flex-row items-center">
          <MaterialIcons name="calendar-month" size={22} color="#FEB602" />
          <Text className="text-base text-white font-bold ml-1" >
            {fecha}
          </Text>
        </View>
      </View>

      <View className="h-0.5 bg-[#fff] opacity-60 mb-4 rounded-full" />


      <View className="mb-3 flex-row items-center">
        <MaterialIcons name="book" size={22} color="#FEB602" />
        <Text className="text-base text-white ml-2 font-semibold">
          {materia}
        </Text>
      </View>
      <View className="mb-3 flex-row items-center">
        <MaterialIcons name="access-time" size={22} color="#FEB602" />
        <Text className="text-base text-white ml-2 font-semibold">
          {hora}
        </Text>
      </View>

      <View className="mb-3 flex-row items-center">
        <MaterialIcons name="phone" size={22} color="#FEB602" />
        <Text className="text-base text-white ml-2 font-semibold" >
          {telefono}
        </Text>
      </View>
    </View>
  );
};

export default PaymentInfo;