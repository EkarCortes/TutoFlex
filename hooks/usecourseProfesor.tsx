//SE MANEJARA LA LOGICA DE LA ASIGNACION DE CURSOS A LOS PROFESORES
import { useState } from "react";
import { addCourseDetails, CourseDetails, CourseDetailsResponse } from "../services/courseProfesorService";

const useCourseProfessor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const addCourseProfessor = async (data: CourseDetails) => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response: CourseDetailsResponse = await addCourseDetails(data);

      if (response.success) {
        setSuccessMessage("Curso asignado correctamente al profesor");
      } else {
        setError(response.message || "No se pudo asignar el curso");
      }
    } catch (err) {
      console.error("Error al asignar curso al profesor:", err);
      setError("Ocurrió un error al asignar el curso");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, successMessage, addCourseProfessor };
};

export default useCourseProfessor;
