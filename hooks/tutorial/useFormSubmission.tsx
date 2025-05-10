import { useState, useCallback } from 'react';
import { router } from 'expo-router';
import { scheduleTutorial } from '../../services/getTutorialService';
import { showToast } from '../../components/Toast';


// Este hook se utiliza para gestionar la lógica de la pantalla de detalles de la tutoría
// y la confirmación de la tutoría. Permite enviar los datos de la tutoría seleccionada

interface FormSubmissionProps {
  tutorData: any;
  selectedDate: string | null;
  selectedHorarios: number[];
  availableHours: string[];
  topics: string;
  extractTimeRange: (timeSlot: string) => { start: string, end: string };
  setShowConfirmModal: (show: boolean) => void;
}

export const useFormSubmission = ({
  tutorData,
  selectedDate,
  selectedHorarios,
  availableHours,
  topics,
  extractTimeRange,
  setShowConfirmModal
}: FormSubmissionProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleConfirm = useCallback(async () => {
    if (!tutorData || !selectedDate || selectedHorarios.length === 0) {
      showToast("error", "Por favor complete todos los campos requeridos");
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedTimeSlot = availableHours[selectedHorarios[0]];
      
      if (selectedTimeSlot === "No hay horarios disponibles") {
        showToast("error", "No hay horarios disponibles para agendar");
        setIsSubmitting(false);
        return;
      }
      
      const { start: horaInicio, end: horaFin } = extractTimeRange(selectedTimeSlot);
      
      const params = {
        profesor_id: parseInt(tutorData.profesor_id),
        curso_id: parseInt(tutorData.curso_id),
        fecha: selectedDate,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        temas: topics || "No se especificaron temas"
      };
      console.log("Parámetros para agendar la tutoría:", params);

      const response = await scheduleTutorial(params);

      if (response.success) {
        showToast("success", "Tutoría agendada correctamente");
        setTimeout(() => {
          router.dismissTo('/(drawer)/filter');
        }, 2000);
      } else {
        showToast("error", response.message || "Error al agendar la tutoría");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      showToast("error", "Error al agendar la tutoría");
    } finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
    }
  }, [tutorData, selectedDate, selectedHorarios, availableHours, topics, extractTimeRange]);

  return {
    isSubmitting,
    handleConfirm
  };
};