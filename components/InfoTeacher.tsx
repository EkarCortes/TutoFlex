import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const InfoTeacher = ({
  tutorData,
}: {
  tutorData: {
    profesor?: string;
    curso?: string;
    modalidad?: string;
    horarios?: string;
    monto_por_hora?: string;
  } | null;
}) => {
  const nombre = tutorData?.profesor || "Sin nombre";
  const curso = tutorData?.curso || "Sin curso";
  const modalidad = tutorData?.modalidad || "Sin modalidad";
  const horario = tutorData?.horarios || "Sin horario";
  const monto = tutorData?.monto_por_hora
    ? "₡ " + Math.floor(Number(tutorData.monto_por_hora))
    : "Sin precio";

  const capitalizeFirstLetter = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <View className="rounded-2xl shadow-xl my-3 overflow-hidden" style={{ backgroundColor: "#0B4C6C" }}>
              <View style={{ height: 4, backgroundColor: '#FB8500' }} />
       
       
       <View className="bg-[#0B4D6D] rounded-3xl p-6  shadow-xl">
   
         <View className="flex-row items-center justify-between mb-4">
           <View className="flex-row items-center">
             <MaterialIcons name="account-circle" size={28} color="#FEB602" />
             <Text className="text-2xl text-white ml-3 font-bold" >
               {nombre}
             </Text>
           </View>
            <View className="flex-row items-center rounded-full">
                     <View className="bg-[#FB8500] px-4 py-1 rounded-full mr-2">
                       <Text className="text-white text-xs font-bold">
                         {capitalizeFirstLetter(modalidad)}
                       </Text>
                     </View>
                   </View>
         </View>
   
         <View>
       
          
         <View className="flex-row justify-between items-center mb-4">
           <View className="flex-row items-center">
             <Text className="text-xl text-white font-bold ml-1" >
               {monto}
             </Text>
           </View>
           <View className="flex-row items-center">
             <Text className="text-base text-white font-bold ml-1" >
               {curso}
             </Text>
           </View>
         </View>
   
         <View className="h-0.5 bg-[#fff] opacity-60 mb-4 rounded-full" />
         <View className="mb-3 flex-row items-center">
           <MaterialIcons name="access-time" size={22} color="#FEB602" />
           <Text className="text-base text-white ml-2 font-semibold">
             {horario}
           </Text>
         </View>
         </View>
         </View>
       </View>
  );
};

export default InfoTeacher;