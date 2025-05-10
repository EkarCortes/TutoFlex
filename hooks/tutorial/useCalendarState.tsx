import { useState, useCallback, useMemo } from 'react';
import { DAY_MAPPING_TO_NAME, normalizeDayName } from './utils';
import { getPendingTutorialsByProfessor } from '../../services/getTutorialService';

// Este hook se utiliza para gestionar la lógica del calendario en la pantalla de detalles de un tutorial.

export const useCalendarState = (tutorData: any) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<{ [date: string]: boolean }>({});
  const [pendingTutorials, setPendingTutorials] = useState<any[]>([]);
  const [occupiedHorarios, setOccupiedHorarios] = useState<number[]>([]);
  

  const availableDays = useMemo(() => {
    if (!tutorData?.horarios_array?.length) return [];
    
    const days = new Set();
    
    tutorData.horarios_array.forEach((slot: any) => {
      if (!slot.dia) return;
      
      const normalizedDay = normalizeDayName(slot.dia);
      const dayMapping: {[key: string]: number} = {
        'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 
        'Jueves': 4, 'Viernes': 5, 'Sábado': 6
      };
      
      const dayNumber = dayMapping[normalizedDay];
      if (dayNumber !== undefined) {
        days.add(dayNumber);
      }
    });
    
    return Array.from(days) as number[];
  }, [tutorData]);
  
  const handleDayPress = useCallback((day: { dateString: string }, setAvailableHours: (hours: string[]) => void) => {
    setSelectedDate(day.dateString);
    setSelectedDates({ [day.dateString]: true });
    
    // Crear fecha correctamente
    const [year, month, dayNum] = day.dateString.split('-').map(Number);
    const dateObj = new Date(Date.UTC(year, month - 1, dayNum, 12, 0, 0));
    const selectedDay = dateObj.getUTCDay();
    
    // Calcular horarios disponibles para este día
    if (tutorData?.horarios_array) {
      const dayName = DAY_MAPPING_TO_NAME[selectedDay];
      
      // Filtrar horarios para el día seleccionado
      const daySchedule = tutorData.horarios_array.filter((slot: any) => {
        const normalizedSlotDay = normalizeDayName(slot.dia);
        const normalizedSelectedDay = normalizeDayName(dayName);
        return normalizedSlotDay === normalizedSelectedDay;
      });
      
      // Generar slots de hora
      const hourSlots = calculateTimeSlots(daySchedule);
      
      setAvailableHours(hourSlots.length > 0 ? hourSlots : ["No hay horarios disponibles"]);
      
      // Consultar tutorías pendientes para esta fecha
      if (tutorData?.profesor_id && tutorData?.curso_id) {
        const fetchPendingTutorials = async () => {
          try {
            const response = await getPendingTutorialsByProfessor({
              profesor_id: tutorData.profesor_id,
              curso_id: tutorData.curso_id,
              fecha: day.dateString
            });
            
            console.log("Respuesta de tutorías pendientes:", response);
            
            if (response.success) {
              setPendingTutorials(response.data || []);
              
              // Si tenemos horarios y tutorías pendientes, calculamos cuáles están ocupados
              if (hourSlots.length > 0 && response.data?.length > 0) {
                console.log("Tutorías pendientes recibidas de API:", response.data);
                
                // Los horarios que vienen de la API ya están en formato 24h
                const occupiedSlots = response.data.map((tutorial: any) => ({
                  start: tutorial.hora_inicio,  // Formato 24h: "14:00"
                  end: tutorial.hora_fin        // Formato 24h: "15:00"
                }));
                
                console.log("Horarios ocupados de API (24h):", occupiedSlots);
                console.log("Horarios disponibles en UI (12h):", hourSlots);
                
                // Encontrar índices de horarios ocupados
                const occupiedIndices = hourSlots.reduce((indices: number[], slot, index) => {
                  // Extraer inicio y fin en formato 12h
                  const { start: start12h, end: end12h } = extractTimeRange(slot);
                  
                  // Convertir a formato 24h para comparación
                  const start24h = convertTo24HourFormat(start12h);
                  const end24h = convertTo24HourFormat(end12h);
                  
                  console.log(`Horario ${index}: "${slot}" -> ${start24h}-${end24h}`);
                  
                  // Verificar si este slot se solapa con algún horario ocupado
                  const isOccupied = occupiedSlots.some(occupiedSlot => {
                    const hasOverlap = areTimeRangesOverlapping(
                      start24h, end24h,
                      occupiedSlot.start, occupiedSlot.end
                    );
                    
                    if (hasOverlap) {
                      console.log(`  - Ocupado por ${occupiedSlot.start}-${occupiedSlot.end}`);
                    }
                    
                    return hasOverlap;
                  });
                  
                  if (isOccupied) {
                    indices.push(index);
                  }
                  
                  return indices;
                }, []);
                
                console.log("Índices finales de horarios ocupados:", occupiedIndices);
                setOccupiedHorarios(occupiedIndices);
              } else {
                setOccupiedHorarios([]);
              }
            }
          } catch (error) {
            console.error("Error al consultar tutorías pendientes:", error);
            setOccupiedHorarios([]);
          }
        };
        
        fetchPendingTutorials();
      }
    }
  }, [tutorData]);
  
  const formatSelectedDate = useCallback((dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);
  
  const getDisabledDaysOfWeek = useCallback(() => {
    if (availableDays.length > 0) {
      return [0, 1, 2, 3, 4, 5, 6].filter(day => !availableDays.includes(day));
    }
    return [0, 6]; // Valor por defecto
  }, [availableDays]);
  
  return {
    selectedDate,
    selectedDates,
    pendingTutorials,
    occupiedHorarios,
    handleDayPress,
    formatSelectedDate,
    getDisabledDaysOfWeek
  };
};

// Función auxiliar para calcular slots de tiempo
function calculateTimeSlots(daySchedule: any[]) {
  const hourSlots: string[] = [];
  
  daySchedule.forEach((slot: any) => {
    try {
      const startTime = parseTimeString(slot.hora_inicio);
      const endTime = parseTimeString(slot.hora_fin);
      
      let currentHour = new Date(startTime);
      
      while (currentHour < endTime) {
        const nextHour = new Date(currentHour);
        nextHour.setHours(nextHour.getHours() + 1);
        
        const slotEndTime = nextHour > endTime ? endTime : nextHour;
        
        hourSlots.push(
          `${formatTime(formatHoursMinutes(currentHour))} - ${formatTime(formatHoursMinutes(slotEndTime))}`
        );
        
        currentHour = nextHour;
      }
    } catch (error) {
      console.error("Error procesando horario", error);
    }
  });
  
  return hourSlots;
}

// Funciones auxiliares de formateo de tiempo
function parseTimeString(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function formatHoursMinutes(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function formatTime(time24h: string): string {
  const [hours, minutes] = time24h.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Función para extraer inicio y fin de un rango horario
function extractTimeRange(slot: string) {
  const parts = slot.split(' - ');
  return { 
    start: parts[0].trim(), 
    end: parts[1].trim() 
  };
}

// Función para convertir formato 12h a 24h
function convertTo24HourFormat(time12h: string): string {
  // Si ya parece estar en formato 24h, devolverlo tal cual
  if (!time12h.toLowerCase().includes('am') && !time12h.toLowerCase().includes('pm')) {
    return time12h;
  }
  
  // Separar hora y periodo (AM/PM)
  const [timePart, period] = time12h.split(/\s+/);
  let [hours, minutes] = timePart.split(':').map(Number);
  
  // Convertir a formato 24h
  if (period.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Función para verificar solapamiento de horarios
function areTimeRangesOverlapping(
  start1: string, end1: string, 
  start2: string, end2: string
): boolean {
  // Convertir a minutos desde medianoche para comparación
  const toMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  const start1Min = toMinutes(start1);
  const end1Min = toMinutes(end1);
  const start2Min = toMinutes(start2);
  const end2Min = toMinutes(end2);
  
  // Dos rangos se solapan si el inicio de uno es anterior al fin del otro
  // y el fin de uno es posterior al inicio del otro
  return (start1Min < end2Min && end1Min > start2Min);
}