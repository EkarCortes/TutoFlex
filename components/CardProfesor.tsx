import { router } from "expo-router";
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface DatosProps {
  usuario_id?: number;
  profesor_id?: number;
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
  if (!datos) return null;

  const handleScheduleAppointment = () => {
    router.push({
      pathname: '/(drawer)/filter/_tutorialDetails',
      params: { tutorData: JSON.stringify(datos) }
    });
  };

  const handleViewProfile = () => {
    router.push({
      pathname: '/(drawer)/filter/tutorProfile',
      params: datos.profesor_id ? { tutorId: datos.profesor_id } : {}
    });
  };

  const modalidad = datos.modalidad
    ? datos.modalidad.charAt(0).toUpperCase() + datos.modalidad.slice(1)
    : '';

  const montoInt = Math.trunc(Number(datos.monto_por_hora));

  return (
        <View className="rounded-2xl shadow-xl my-3 overflow-hidden" style={{ backgroundColor: "#0A4D6C" }}>
   <View style={{ height: 4, backgroundColor: '#FB8500' }} />
    <View className="bg-[#0A4D6C] rounded-2xl px-5 py-6 " style={{ position: 'relative' }}>
          
          
      {montoInt ? (
        <View
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: '#FB8400',
            borderRadius: 10,
            paddingVertical: 4,
            paddingHorizontal: 10,
            zIndex: 20,
            minWidth: 70,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>
            ₡{montoInt}/h
          </Text>
        </View>
      ) : null}

      <View className="flex-row items-center mb-3">
        <Image
          source={datos.foto_profesor
            ? { uri: datos.foto_profesor }
            : { uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={{ width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: '#FB8400' }}
        />
        <View className="ml-5 flex-1">
          <Text className="text-xl font-bold text-white">{datos.profesor}</Text>
          <Text className="text-base text-[#8ECAE6] font-semibold">{datos.curso}</Text>
        </View>
      </View>
      <Text className="text-xs text-white opacity-80 mb-2">
        {datos.universidad} · {datos.carrera || 'N/A'} · {datos.pais} · {modalidad}
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
    </View>
  );
}