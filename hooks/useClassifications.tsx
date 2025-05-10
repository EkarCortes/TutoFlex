// Este hooks se utiliza para obtener las clasificaciones de los cursos
// Se usa en el index de la carpeta course y en el filtro del bucador principal
import { useState, useEffect } from "react";
import { getClassifications, Classification } from "../services/classificationService";

const useClassifications = () => {
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClassifications = async () => {
    try {
      setLoading(true);
      const data = await getClassifications();
      setClassifications(data);
    } catch (err) {
      console.error("Error al obtener las clasificaciones:", err);
      setError("No se pudieron obtener las clasificaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassifications();
  }, []);

  return { classifications, loading, error };
};

export default useClassifications;