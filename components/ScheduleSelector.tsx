import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ScheduleSelectorProps {
  horarios: string[];
  selectedHorarios: number[];
  toggleHorario: (index: number) => void;
  dateSelected: boolean; // New prop to know if date was selected
  occupiedHorarios?: number[]; // Array of indices of occupied time slots
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({ 
  horarios, 
  selectedHorarios, 
  toggleHorario,
  dateSelected,
  occupiedHorarios = [] // Default to empty array if not provided
}) => {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-white mb-3">Hora</Text>
      
      {!dateSelected ? (
        // When no date has been selected
        <View className="bg-[#0B4C6D] py-6 px-4 rounded-xl items-center">
          <MaterialIcons name="calendar-today" size={40} color="#fff" />
          <Text className="text-white text-center mt-3 text-base">
            Por favor seleccione una fecha primero
          </Text>
        </View>
      ) : horarios.length === 1 && horarios[0] === "No hay horarios disponibles" ? (
        // When date is selected but no hours available
        <View className="bg-[#0B4C6D] py-6 px-4 rounded-xl items-center">
          <MaterialIcons name="access-time-off" size={40} color="#fff" />
          <Text className="text-white text-center mt-3 text-base">
            No hay horarios disponibles para esta fecha
          </Text>
        </View>
      ) : (
        // When date is selected and hours are available
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row rounded-xl">
          {horarios.map((horario, index) => {
            // Verificamos explícitamente si este horario está ocupado
            const isOccupied = Array.isArray(occupiedHorarios) && occupiedHorarios.includes(index);
            console.log(`Horario ${horario} (índice ${index}): ${isOccupied ? 'ocupado' : 'disponible'}`);
            
            return (
              <TouchableOpacity
                key={horario}
                className={`flex-row items-center p-3 px-4 rounded-lg mr-3 border-none 
                  ${selectedHorarios.includes(index) ? 'bg-[#FA8401]' : 
                    isOccupied ?  'bg-[#0B4C6D]' : 'bg-[#093c56]' }`}
                onPress={() => !isOccupied && toggleHorario(index)}
                disabled={isOccupied} // Aseguramos que se deshabilita si está ocupado
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