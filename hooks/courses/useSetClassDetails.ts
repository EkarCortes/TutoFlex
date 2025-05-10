import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSchedule } from "./useSchedule";
import { useAddTutoring } from "./useAddTutoring";
import { useSelectedDays } from "./useSelectedDays";
import useCourseDetails from "./useCourseDetails";
import useDeleteCourseProfesor from "./useDeleteCourseProfesor";
import { useHandleSaveClassDetails } from "./useHandleSaveClassDetails";
import { useInitializeCourseDetails } from "./useInitializeCourseDetails";
import { showToast } from "../../components/Toast";

// Este hook se utiliza para gestionar los detalles de una clase
// en la pantalla de Dettalles de clases. Permite seleccionar días y horarios.

export default function useSetClassDetails() {
  const router = useRouter();
  const { id, name = "Curso sin nombre" } = useLocalSearchParams();
  const { addTutoring } = useAddTutoring();
  const curso_id = parseInt(id as string, 10);

  const { courseDetails, loading, error } = useCourseDetails(curso_id);
  const { selectedDays, toggleDay } = useSelectedDays();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [selectedModalidad, setSelectedModalidad] = useState("");
  const { scheduleData, setScheduleData, addSchedule, removeSchedule } = useSchedule();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);

  const { handleDelete, loading: deleting } = useDeleteCourseProfesor(() => {
    router.back();
  });

  useInitializeCourseDetails({
    courseDetails,
    setPrice,
    setSelectedModalidad,
    setScheduleData,
  });

  const handleSave = useHandleSaveClassDetails({
    id: id as string,
    price,
    selectedModalidad,
    scheduleData,
    addTutoring,
  });

  const allDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handleDeleteConfirm = () => {
    if (courseDetails?.curso_profesor_id) {
      handleDelete(courseDetails.curso_profesor_id);
      setDeleteModalVisible(false);
    } else {
      showToast(
        "error",
        "No se pudo eliminar el curso. ID del curso no encontrado.",
        "Error",
        "top"
      );
    }
  };

  return {
    name,
    loading,
    error,
    selectedDays,
    toggleDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    price,
    setPrice,
    selectedModalidad,
    setSelectedModalidad,
    scheduleData,
    setScheduleData,
    addSchedule,
    removeSchedule,
    deleteModalVisible,
    setDeleteModalVisible,
    scheduleModalVisible,
    setScheduleModalVisible,
    handleSave,
    handleDeleteConfirm,
    deleting,
    allDays,
    courseDetails,
  };
}