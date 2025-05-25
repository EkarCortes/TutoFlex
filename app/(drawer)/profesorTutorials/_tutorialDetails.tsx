import HeaderScreens from "@/components/HeaderScreens";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TutorailInfo from "../../../components/TeacherPaymentInfo";

const PaymentInfoExampleScreen = () => {
  const route = useRoute();
  const { tutorial } = route.params as { tutorial: any };

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={["left", "right", "bottom"]}>
      <View style={{ flex: 1 }}>
        <HeaderScreens title={"Detalles de Tutoria"} />
        <ScrollView contentContainerStyle={{ padding: 15, flexGrow: 1 }}>
          <TutorailInfo
            estudiante={tutorial.estudiante}
            fecha={tutorial.fecha_tutoria}
            hora={tutorial.horario}
            monto={tutorial.monto}
            curso={tutorial.curso}
            tema={tutorial.tema}
            modalidad={tutorial.modalidad}
            telefono_estudiante={tutorial.telefono_estudiante}
          />
        </ScrollView>
        <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
          <TouchableOpacity
            className="bg-[#FF4C4C] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
            onPress={() => {
              // Lógica para cancelar aquí
            }}
          >
            <Text className="text-white font-bold text-lg ml-2">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentInfoExampleScreen;