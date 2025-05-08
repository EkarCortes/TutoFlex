import { useState, useEffect } from "react";
import { getTutorialDetails, TutorialDetails } from "../services/getTutorialService";

const useCourseDetails = (curso_id: number) => {
  const [courseDetails, setCourseDetails] = useState<TutorialDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const details = await getTutorialDetails(curso_id);
        if (details) {
          console.log("Detalles del curso obtenidos:", details);
          console.log("curso_profesor_id:", details.curso_profesor_id); // Confirmar que curso_profesor_id está presente
          setCourseDetails(details);
        } else {
          setError("No se encontraron detalles para el curso seleccionado.");
        }
      } catch (err) {
        console.error("Error al obtener los detalles del curso:", err);
        setError("Ocurrió un error al obtener los detalles del curso.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourseDetails();
  }, [curso_id]);

  return { courseDetails, loading, error };
};

export default useCourseDetails;