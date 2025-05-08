import { useState, useCallback } from 'react';

export const useScheduleState = () => {
  const [selectedHorarios, setSelectedHorarios] = useState<number[]>([]);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  
  const toggleHorario = useCallback((index: number) => {
    setSelectedHorarios([index]);
  }, []);
  
  const extractTimeRange = useCallback((formattedTimeSlot: string): { start: string, end: string } => {
    try {
      const [startFormatted, endFormatted] = formattedTimeSlot.split(' - ');
      const start = convertTo24HourFormat(startFormatted);
      const end = convertTo24HourFormat(endFormatted);
      return { start, end };
    } catch (error) {
      console.error("Error extrayendo rango de horas:", error);
      return { start: "09:00", end: "10:00" };
    }
  }, []);

  return {
    selectedHorarios,
    availableHours,
    toggleHorario,
    setSelectedHorarios,
    setAvailableHours,
    extractTimeRange
  };
};

// Función auxiliar para convertir formato de tiempo
function convertTo24HourFormat(time12h: string): string {
  const [timePart, period] = time12h.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}