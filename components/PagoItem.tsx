import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type PagoItemProps = {
  nombre: string;
  telefono: string;
  materia: string;
  monto: string;
  fecha: string;
  estado: string;
  onPress?: () => void;
  onCancel?: () => void;
};

const PagoItem: React.FC<PagoItemProps> = ({
  nombre,
  telefono,
  materia,
  monto,
  fecha,
  estado,
  onPress,
  onCancel,
}) => {
  return (
    <View className="bg-[#0d6a97] rounded-xl p-4 mr-3 ml-3 mt-5 relative">
      <Text
        className="text-white text-xl mb-1"
        style={{ fontFamily: "SpaceGrotesk-Bold" }}
      >
        {nombre}
      </Text>
      <Text
        className="text-white text-lg mb-1"
        style={{ fontFamily: "SpaceGrotesk-Bold" }}
      >
        Teléfono:{" "}
        <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{telefono}</Text>
      </Text>
      <Text
        className="text-white text-lg mb-1"
        style={{ fontFamily: "SpaceGrotesk-Bold" }}
      >
        Materia:{" "}
        <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{materia}</Text>
      </Text>
      <Text
        className="text-white text-lg mb-1"
        style={{ fontFamily: "SpaceGrotesk-Bold" }}
      >
        Monto:{" "}
        <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{monto}</Text>
      </Text>
      <Text
        className="text-white text-s mb-2"
        style={{ fontFamily: "SpaceGrotesk-Bold" }}
      >
        Fecha:{" "}
        <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{fecha}</Text>
      </Text>

      {estado === "en revision" ? (
        <View className="absolute bottom-2 right-2 bg-[#FB8500] rounded p-2">
          <Text
            className="text-white"
            style={{ fontFamily: "SpaceGrotesk-Bold" }}
          >
            En Revisión
          </Text>
        </View>
      ) : (
        <View className="absolute bottom-2 right-2 flex-row space-x-2">
          <TouchableOpacity
            className="bg-red-600 rounded p-2 m-1"
            onPress={onCancel}
          >
            <Text
              className="text-white"
              style={{ fontFamily: "SpaceGrotesk-Bold" }}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-600 rounded p-2 m-1"
            onPress={onPress}
          >
            <Text
              className="text-white"
              style={{ fontFamily: "SpaceGrotesk-Bold" }}
            >
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PagoItem;
