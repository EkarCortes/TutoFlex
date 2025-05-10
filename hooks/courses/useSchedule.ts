// Hook para manejar la lógica de los horarios en la pantalla setClassDetails
import { useState, useCallback } from "react";
import { showToast } from "../../components/Toast";

export const useSchedule = () => {
  const [scheduleData, setScheduleData] = useState<string[]>([]);

  const validateTime = (time: string) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  };

  const isOverlapping = (day: string, startTime: string, endTime: string) => {
    return scheduleData.some((schedule) => {
      const [existingDay, existingStart, existingEnd] = schedule.split("-");
      if (existingDay !== day) return false;

      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);
      const [existingStartHour, existingStartMinute] = existingStart.split(":").map(Number);
      const [existingEndHour, existingEndMinute] = existingEnd.split(":").map(Number);

      const newStart = startHour * 60 + startMinute;
      const newEnd = endHour * 60 + endMinute;
      const existingStartTime = existingStartHour * 60 + existingStartMinute;
      const existingEndTime = existingEndHour * 60 + existingEndMinute;

      // Verificar si los horarios se solapan
      return (
        (newStart >= existingStartTime && newStart < existingEndTime) || // Nuevo inicio dentro de un horario existente
        (newEnd > existingStartTime && newEnd <= existingEndTime) || // Nuevo fin dentro de un horario existente
        (newStart <= existingStartTime && newEnd >= existingEndTime) // Nuevo horario cubre completamente un horario existente
      );
    });
  };

  const addSchedule = useCallback(
    (selectedDays: string[], startTime: string, endTime: string) => {
      if (!validateTime(startTime) || !validateTime(endTime)) {
        showToast("error", "Por favor ingrese un horario válido en formato 24h (HH:MM)", "Error", "top");
        return;
      }

      const start = startTime.split(":").map(Number);
      const end = endTime.split(":").map(Number);

      if (start[0] > end[0] || (start[0] === end[0] && start[1] >= end[1])) {
        showToast("error", "La hora de inicio debe ser anterior a la hora de fin", "Error", "top");
        return;
      }

      // Validar si hay solapamiento en los horarios
      for (const day of selectedDays) {
        if (isOverlapping(day, startTime, endTime)) {
          showToast("error", `El horario para el día ${day} se solapa con un horario existente`, "Error", "top");
          return;
        }
      }

      // Construir el formato esperado: Día-HH:MM-HH:MM
      const newSchedules = selectedDays.map((day) => `${day}-${startTime}-${endTime}`);
      setScheduleData((prev) => [...prev, ...newSchedules]);
      showToast("success", "Horario agregado correctamente", "Éxito", "top");
    },
    [scheduleData]
  );

  const removeSchedule = useCallback((index: number) => {
    setScheduleData((prev) => prev.filter((_, i) => i !== index));
    showToast("success", "Horario eliminado correctamente", "Éxito", "top");
  }, []);

  return {
    scheduleData,
    setScheduleData,
    addSchedule,
    removeSchedule,
  };
};