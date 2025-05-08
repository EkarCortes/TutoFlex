//Este hook contiene la lógica para agregar una tutoría en la pantalla setClassDetails
import { useRouter } from "expo-router";
import { showToast } from "../components/Toast";
import { addCourseDetails } from "../services/courseProfesorService";

export const useAddTutoring = (onSuccess?: () => void) => {
  const router = useRouter();

  const addTutoring = async (
    id: string,
    price: string,
    scheduleData: string[],
    selectedModalidad: string
  ) => {
    if (!price.trim()) {
      showToast("error", "Ingrese un precio válido.", "Error", "top");
      return;
    }

    if (scheduleData.length === 0) {
      showToast("error", "Agregue al menos un horario.", "Error", "top");
      return;
    }

    try {
      const formattedSchedule = scheduleData
        .map((schedule) => {
          const [day, start, end] = schedule.split("-");
          return `${day}-${start}-${end}`;
        })
        .join(",");

      const requestBody = {
        curso_id: parseInt(id, 10),
        monto_por_hora: parseInt(price, 10),
        modalidad: selectedModalidad.toLowerCase(),
        horario: formattedSchedule,
      };

      const response = await addCourseDetails(requestBody);

      // Manejar el caso de conflicto de horarios
      if (response.message?.includes("Conflicto de horarios")) {
        showToast(
          "error",
          "Conflicto de horarios con otra Tutoría",
          "Error",
          "top"
        );
        return;
      }

      if (!response.success) {
        // Mostrar un mensaje genérico si ocurre otro error
        showToast(
          "error",
          "No se pudo guardar la tutoría. Intente de nuevo.",
          "Error",
          "top"
        );
        return;
      }

      if (response.success) {
        showToast("success", "Tutoría guardada con éxito.", "Éxito", "top");
        if (onSuccess) onSuccess(); // Llamar al callback para actualizar la lista
        setTimeout(() => {
          router.back();
        }, 3000);
        
      } else {
        showToast(
          "error",
          response.message || "No se pudo guardar la tutoría.",
          "Error",
          "top"
        );
      }
    } catch {
      // Mostrar un mensaje genérico si ocurre un error inesperado
      showToast(
        "error",
        "No se pudo guardar la tutoría. Intente de nuevo.",
        "Error",
        "top"
      );
    }
  };

  return { addTutoring };
};
