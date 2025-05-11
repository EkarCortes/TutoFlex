import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from "expo-router";
import React from 'react';

interface DatosProps {
  usuario_id?: number;
  foto_profesor?: string;
  curso?: string;
  profesor?: string;
  universidad?: string;
  carrera?: string;
  pais?: string;
  modalidad?: string;
  horarios?: string;
  monto_por_hora?: string | number;
  clasificacion_id?: number;
  clasificacion_nombre?: string;
}

export default function CardProfesor({ datos }: { datos: DatosProps }) {
  const handleScheduleAppointment = () => {
    router.push({
      pathname: '/(drawer)/filter/_tutorialDetails',
      params: { tutorData: JSON.stringify(datos) }
    });
  };

  const handleViewProfile = () => {
    router.push({
      pathname: '/(drawer)/filter/tutorProfile',
      params: datos.usuario_id ? { tutorId: datos.usuario_id } : {}
    });
  };

  if (!datos) return null;

  return (
    <View className="bg-[#185B7D] rounded-2xl mb-5 px-5 py-6 shadow-lg">
      <View className="flex-row items-center mb-3">
        <Image
          source={datos.foto_profesor ? { uri: datos.foto_profesor } : { uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={{ width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: '#FB8400' }}
        />
        <View className="ml-5 flex-1">
          <Text className="text-xl font-bold text-white">{datos.profesor}</Text>
          <Text className="text-base text-[#FB8400] font-semibold">{datos.curso}</Text>
        </View>
       
      </View>
      <Text className="text-xs text-white opacity-80 mb-2">
        {datos.universidad} · {datos.carrera || 'N/A'} · {datos.pais} · {datos.modalidad}
      </Text>
      <Text className="text-xs text-white opacity-60 mb-4">
        {datos.horarios || 'Horario no especificado'}
      </Text>
      <View className="flex-row space-x-3">
      <TouchableOpacity
          className="flex-1 rounded-xl bg-[#8FCAE6] py-2 m-1"
          onPress={handleViewProfile}
        >
          <Text className="text-center text-white font-bold">Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 rounded-xl bg-[#FB8400] py-2 m-1"
          onPress={handleScheduleAppointment}
        >
          <Text className="text-center text-white font-bold">Agendar</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
}