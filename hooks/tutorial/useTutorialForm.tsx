import { useState, useCallback } from 'react';
import { useCalendarState } from './useCalendarState';
import { useScheduleState } from './useScheduleState';
import { useModalityState } from './useModalityState';
import { useFormSubmission } from './useFormSubmission';

// Hook principal que orquesta los demás hooks
// y gestiona el estado de la pantalla de detalles de la tutoría
export const useTutorialForm = (tutorData: any) => {
  // Estados compartidos
  const [topics, setTopics] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  
  // Hooks especializados
  const { 
    selectedDate, 
    selectedDates, 
    handleDayPress, 
    formatSelectedDate,
    getDisabledDaysOfWeek,
    pendingTutorials,
    occupiedHorarios // Añadir esta propiedad
  } = useCalendarState(tutorData);
  
  const { 
    selectedHorarios, 
    availableHours, 
    toggleHorario, 
    setAvailableHours,
    extractTimeRange 
  } = useScheduleState();
  
  const { 
    selectedModalidad, 
    setSelectedModalidad 
  } = useModalityState(tutorData);
  
  const { 
    isSubmitting, 
    handleConfirm 
  } = useFormSubmission({
    tutorData,
    selectedDate,
    selectedHorarios,
    availableHours,
    topics,
    extractTimeRange,
    setShowConfirmModal
  });
  
  // Funciones simples
  const handleCloseModal = useCallback(() => {
    setShowConfirmModal(false);
  }, []);
  
  return {
    // Estados
    selectedDate,
    selectedDates,
    selectedHorarios,
    selectedModalidad,
    topics,
    setTopics,
    showConfirmModal,
    isSubmitting,
    availableHours,
    pendingTutorials,
    occupiedHorarios, // Añadir al retorno
    
    // Funciones
    handleDayPress: (day: any) => {
      handleDayPress(day, setAvailableHours);
    },
    toggleHorario,
    setSelectedModalidad,
    formatSelectedDate,
    handleCloseModal,
    handleConfirm,
    setShowConfirmModal,
    getDisabledDaysOfWeek,
  };
};