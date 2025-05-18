import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type TeacherPaymentInfoProps = {
  estudiante: string;
  fecha: string;
  hora: string;
  monto: string;
  curso: string;
  tema: string;
  modalidad: string;
};

const TeacherPaymentInfo: React.FC<TeacherPaymentInfoProps> = ({
  estudiante,
  fecha,
  hora,
  monto,
  curso,
  tema,
  modalidad,
}) => {
  const capitalizeFirstLetter = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <View
      className="rounded-2xl shadow-xl my-3 overflow-hidden"
      style={{ backgroundColor: "#0B4C6C" }}
    >
      <View style={{ height: 4, backgroundColor: "#FB8500" }} />

      <View className="bg-[#0B4D6D] rounded-3xl p-8 shadow-xl">
        {/* Estudiante y Modalidad en la misma fila */}
        <View className="flex-row items-center mb-6">
          <MaterialIcons name="account-circle" size={28} color="#FEB602" />
          <Text
            className="text-lg text-white ml-3 font-bold flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ maxWidth: "45%" }}
          >
            {estudiante}
          </Text>
          <View className="flex-1 items-end">
            <View className="px-4 py-2 rounded-2xl bg-[#FB8500] max-w-[60%]">
              <Text
                className="text-white font-semibold text-xs"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {capitalizeFirstLetter(modalidad)}
              </Text>
            </View>
          </View>
        </View>

      
            
      

        {/* Línea divisoria */}
        <View className="h-0.5 bg-[#fff] opacity-30 mb-6 rounded-full" />
      

        {/* Fecha y Hora */}
        <Text className="text-xs text-[#8ECAE6] mb-1">Fecha y Hora</Text>
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="calendar-today" size={22} color="#FEB602" />
          <Text className="text-base text-white ml-2 font-semibold">{fecha}</Text>
          <MaterialIcons name="access-time" size={22} color="#FEB602" style={{ marginLeft: 16 }} />
          <Text className="text-base text-white ml-2 font-semibold">{hora}</Text>
        </View>
        
        <View className="h-0.5 bg-[#fff] opacity-20 mb-4 rounded-full" />

        {/* Monto */}
        <Text className="text-xs text-[#8ECAE6] mb-1">Monto por hora</Text>
        <View className="flex-row items-center mb-4">
        <MaterialIcons name="account-balance-wallet" size={22} color="#FEB602" />
          <Text className="text-base text-white ml-2 font-semibold">₡{monto}</Text>
        </View>
        <View className="h-0.5 bg-[#fff] opacity-20 mb-4 rounded-full" />

        {/* Curso */}
        <Text className="text-xs text-[#8ECAE6] mb-1">Curso</Text>
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="book" size={22} color="#FEB602" />
          <Text className="text-base text-white ml-2 font-semibold">{curso}</Text>
        </View>
        <View className="h-0.5 bg-[#fff] opacity-20 mb-4 rounded-full" />

        {/* Tema */}
        <Text className="text-xs text-[#8ECAE6] mb-1">Tema a tratar</Text>
        <View className="flex-row items-start">
          <MaterialIcons name="topic" size={22} color="#FEB602" style={{ marginTop: 2 }} />
          <Text className="text-base text-white ml-2 font-semibold flex-1">{tema}</Text>
        </View>
      </View>
    </View>
  );
}; 

export default TeacherPaymentInfo;