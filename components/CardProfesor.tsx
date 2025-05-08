// CardProfesor.tsx
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from "expo-router";
import React from 'react';

interface DatosProps {
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

  if (!datos) return null;

  return (
    <View className="mb-4 rounded-lg bg-[#2D80AD] p-4">
      <View className="flex-row items-center">
        <Image 
          source={datos.foto_profesor ? { uri: datos.foto_profesor } : require('../assets/images/imagenProfesor1.jpg')} 
          style={{ width: 70, height: 70, borderRadius: 40 }} 
          className="mr-4" 
        />
        <View className="flex-1">
          <Text className="text-lg font-bold text-white">{datos.curso}</Text>
          <Text className="text-white">{datos.profesor}</Text>
          <Text className="text-white">{datos.universidad} · {datos.carrera || 'N/A'}</Text>
          <Text className="text-white">{datos.pais} · {datos.modalidad}</Text>
          <Text className="text-white">{datos.horarios || 'Horario no especificado'}</Text>
          <Text className="text-white font-bold">₡{datos.monto_por_hora}</Text>
          
          {/* Mostrar clasificación */}
          <View className="mt-1 flex-row items-center">
            <Text className="text-white">
              Clasificacion: {datos.clasificacion_nombre || 'Sin clasificación'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        className="mt-3 rounded-lg bg-[#0C4A6E] py-2"
        onPress={handleScheduleAppointment}
      >
        <Text className="text-center text-white">Agendar Cita</Text>
      </TouchableOpacity>
    </View>
  );
}