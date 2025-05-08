//HOOK PARA MANEJAR LAS CARD DE LOS PROFESORES DE LAS TUTORIAS
import { useState, useEffect } from "react";
import { getTutorial, Tutorial } from "../services/getTutorialService";

const useGetTutorials = () => {
  // Cambié el tipo de tutorials a Tutorial[] para que coincida con la respuesta de la API
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const response = await getTutorial();
      console.log("Datos recibidos de la API en useGetTutorials:", response);

      if (response?.success) {
        setTutorials(response.data);
      } else {
        setError(response?.message || "No se pudieron obtener los tutoriales");
      }
    } catch (err) {
      console.error("Error al obtener los tutoriales:", err);
      setError("No se pudieron obtener los tutoriales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  return { tutorials, loading, error, fetchTutorials };
};

export default useGetTutorials;
