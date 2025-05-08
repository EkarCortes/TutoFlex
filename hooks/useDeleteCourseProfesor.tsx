import { deleteCourseProfessor } from "../services/courseProfesorService";
import { useState } from "react";
import { showToast } from "../components/Toast";

const useDeleteCourseProfesor = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (curso_profesor_id: number) => {
    try {
      setLoading(true);

      const response = await deleteCourseProfessor(curso_profesor_id);

      if (response.success) {
        showToast("success", "Curso eliminado correctamente.", "Éxito", "top");
        if (onSuccess) onSuccess(); // Ejecutar el callback si está definido
      } else {
        // Manejar el caso específico del error de estudiantes matriculados
        const errorMessage =
          response.error || response.message || "Error desconocido";
        if (errorMessage.includes("matriculado(s), no se puede eliminar")) {
          showToast(
            "error",
            "La tutoría tiene estudiantes matriculados.",
            "Error",
            "top"
          );
        } else {
          showToast("error", errorMessage, "Error", "top");
        }
        console.error("Error al eliminar el curso:", errorMessage); // Registrar el error en la consola
      }
    } catch (err: any) {
      // Manejar errores inesperados
      console.error("Error inesperado al eliminar el curso:", err);
      showToast(
        "error",
        "Ocurrió un error inesperado. Intente nuevamente.",
        "Error",
        "top"
      );
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading };
};

export default useDeleteCourseProfesor;
