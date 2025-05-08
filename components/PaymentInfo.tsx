import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
    <View className="bg-[#0d6a97] rounded-xl p-4 mb-4">
      <Text
        className="text-xl text-white mb-4"
        style={{ fontFamily: "SpaceGrotesk-Bold" }}
      >
        Detalles de Pago de Tutoría
      </Text>
      <View className="flex-row items-center mb-2">
        <MaterialIcons name="account-circle" size={28} color="#FEB602" />
        <Text
          className="text-lg text-white"
          style={{ fontFamily: "SpaceGrotesk-Bold" }}
        >
          {" "}
          Profesor:{" "}
          <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{nombre}</Text>
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <MaterialIcons name="book" size={28} color="#FEB602" />
        <Text
          className="text-lg text-white"
          style={{ fontFamily: "SpaceGrotesk-Bold" }}
        >
          {" "}
          Materia:{" "}
          <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{materia}</Text>
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <MaterialIcons name="location-on" size={28} color="#FEB602" />
        <Text
          className="text-lg text-white"
          style={{ fontFamily: "SpaceGrotesk-Bold" }}
        >
          {" "}
          Modalidad:{" "}
          <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>
            {capitalizeFirstLetter(modalidad)}
          </Text>
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <MaterialIcons name="attach-money" size={28} color="#FEB602" />
        <Text
          className="text-lg text-white"
          style={{ fontFamily: "SpaceGrotesk-Bold" }}
        >
          {" "}
          Monto:{" "}
          <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{monto}</Text>
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <MaterialIcons name="calendar-month" size={28} color="#FEB602" />
        <Text
          className="text-lg text-white"
          style={{ fontFamily: "SpaceGrotesk-Bold" }}
        >
          {" "}
          Fecha:{" "}
          <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{fecha}</Text>
        </Text>
      </View>
      <View className="flex-row items-center mb-2">
        <MaterialIcons name="access-time" size={28} color="#FEB602" />
        <Text
          className="text-lg text-white"
          style={{ fontFamily: "SpaceGrotesk-Bold" }}
        >
          {" "}
          Hora:{" "}
          <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{hora}</Text>
        </Text>
      </View>
      <View className="flex-row items-center">
        <MaterialIcons name="phone" size={28} color="#FEB602" />
        <Text
          className="text-lg text-white"
          style={{ fontFamily: "SpaceGrotesk-Bold" }}
        >
          {" "}
          Teléfono:{" "}
          <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{telefono}</Text>
        </Text>
      </View>
    </View>
  );
};

export default PaymentInfo;
