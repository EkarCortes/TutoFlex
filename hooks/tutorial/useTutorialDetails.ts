import { useMemo } from "react";
import { useTutorialForm } from "./useTutorialForm";

// Este hook se utiliza para gestionar los detalles de un tutorial
// en la pantalla de Detalles de tutoriales. Permite seleccionar fechas, horarios y modalidades.

const useTutorialDetails = (tutorData: any) => {
  const {
    selectedDate,
    selectedHorarios,
    selectedModalidad,
    topics,
    setTopics,
    showConfirmModal,
    isSubmitting,
    selectedDates,
    handleDayPress,
    pendingTutorials,
    occupiedHorarios,
    toggleHorario,
    setSelectedModalidad,
    formatSelectedDate,
    handleCloseModal,
    handleConfirm,
    setShowConfirmModal,
    availableHours,
    getDisabledDaysOfWeek,
  } = useTutorialForm(tutorData);

  // Horarios disponibles
  const horariosToDisplay = availableHours && availableHours.length > 0
    ? availableHours
    : ["No hay horarios disponibles"];

  // Modalidades disponibles
  const modalidadesToDisplay = useMemo(() => {
    if (!tutorData?.modalidad) {
      return ["Presencial", "Virtual"];
    }
    const modalidad = tutorData.modalidad.toLowerCase();
    if (modalidad === "hibrida" || modalidad === "híbrida") {
      return ["Presencial", "Virtual"];
    } else {
      return [tutorData.modalidad.charAt(0).toUpperCase() + tutorData.modalidad.slice(1)];
    }
  }, [tutorData?.modalidad]);

  return {
    selectedDate,
    selectedHorarios,
    selectedModalidad,
    topics,
    setTopics,
    showConfirmModal,
    isSubmitting,
    selectedDates,
    handleDayPress,
    pendingTutorials,
    occupiedHorarios,
    toggleHorario,
    setSelectedModalidad,
    formatSelectedDate,
    handleCloseModal,
    handleConfirm,
    setShowConfirmModal,
    availableHours,
    getDisabledDaysOfWeek,
    horariosToDisplay,
    modalidadesToDisplay,
  };
};

export default useTutorialDetails;