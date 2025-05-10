import { useEffect } from "react";
import { CourseDetails } from "./useCourseDetails";
import { showToast } from "../../components/Toast";

// Este hook se utiliza para inicializar los detalles del curso
// en la pantalla de _setClassDetails. 

interface UseInitializeCourseDetailsProps {
  courseDetails: CourseDetails | null;
  setPrice: (price: string) => void;
  setSelectedModalidad: (modalidad: string) => void;
  setScheduleData: (schedules: string[]) => void;
}

export const useInitializeCourseDetails = ({
  courseDetails,
  setPrice,
  setSelectedModalidad,
  setScheduleData,
}: UseInitializeCourseDetailsProps) => {
  useEffect(() => {
    if (!courseDetails) return; // Manejar el caso de null aquí

    // Establecer el precio
    setPrice(courseDetails.monto_por_hora);

    // Capitalizar y establecer la modalidad
    setSelectedModalidad(
      courseDetails.modalidad.charAt(0).toUpperCase() +
        courseDetails.modalidad.slice(1)
    );

    // Verificar si los horarios están definidos
    if (!courseDetails.horarios || courseDetails.horarios === "Sin horarios disponibles") {
      showToast(
        "error",
        "No se han definido horarios.",
        "Aviso",
        "top"
      );
      setScheduleData([]); // Asegurarse de que no se procesen horarios
      return;
    }

    // Procesar y agregar los horarios directamente al estado
    const horarios = courseDetails.horarios.split(", ").map((horario) => {
      const [day, timeRange] = horario.split(" ");
      return `${day}-${timeRange.replace("-", "-")}`;
    });

    setScheduleData(horarios); // Agregar los horarios directamente al estado
  }, [courseDetails, setPrice, setSelectedModalidad, setScheduleData]);
};