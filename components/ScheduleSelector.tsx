import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ScheduleSelectorProps {
  horarios: string[];
  selectedHorarios: number[];
  toggleHorario: (index: number) => void;
  dateSelected: boolean; 
  occupiedHorarios?: number[]; 
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({ 
  horarios, 
  selectedHorarios, 
  toggleHorario,
  dateSelected,
  occupiedHorarios = [] 
}) => {
  return (
    <View className="mb-6">
      <Text className="text-xl font-semibold text-white mb-3 ">Hora</Text>
        <View className="h-0.5 bg-[#8ECAE6] opacity-60 mb-6 mx-0 rounded-full w-full" />
      
      {!dateSelected ? (
  
        <View className="bg-[#0B4C6D] py-6 px-4 rounded-xl items-center">
          <MaterialIcons name="calendar-today" size={40} color="#fff" />
          <Text className="text-white text-center mt-3 text-base">
            Por favor seleccione una fecha primero
          </Text>
        </View>
      ) : horarios.length === 1 && horarios[0] === "No hay horarios disponibles" ? (

        <View className="bg-[#0B4C6D] py-6 px-4 rounded-xl items-center">
          <MaterialIcons name="access-time-off" size={40} color="#fff" />
          <Text className="text-white text-center mt-3 text-base">
            No hay horarios disponibles para esta fecha
          </Text>
        </View>
      ) : (
    
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row rounded-xl">
          {horarios.map((horario, index) => {
         
            const isOccupied = Array.isArray(occupiedHorarios) && occupiedHorarios.includes(index);
            console.log(`Horario ${horario} (índice ${index}): ${isOccupied ? 'ocupado' : 'disponible'}`);
            
            return (
              <TouchableOpacity
                key={horario}
                className={`flex-row items-center p-3 px-4 rounded-lg mr-3 border-none 
                  ${selectedHorarios.includes(index) ? 'bg-[#FA8401]' : 
                    isOccupied ?  'bg-[#0B4C6D]' : 'bg-[#093c56]' }`}
                onPress={() => !isOccupied && toggleHorario(index)}
                disabled={isOccupied}
              >
                <MaterialIcons 
                  name={isOccupied ? "access-time-filled" : "access-time"} 
                  size={20} 
                  color={isOccupied ? "#E5E7EB" : "white"} 
                />
                <Text className={`ml-2 text-sm ${isOccupied ? 'text-gray-300' : 'text-white'}`}>
                  {horario}
                  {isOccupied && " (Ocupado)"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default ScheduleSelector;