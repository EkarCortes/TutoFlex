import { useState, useEffect } from "react";
import { getFinishedTutorials, FinishedTutorial } from "../services/reviewService";

const useFinishedTutorials = () => {
  const [tutorials, setTutorials] = useState<FinishedTutorial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const response = await getFinishedTutorials();
      
      if (response.success) {
        setTutorials(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Error fetching finished tutorials:", err);
      setError("No se pudieron obtener las tutorías finalizadas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  return { tutorials, loading, error, refreshTutorials: fetchTutorials };
};

export default useFinishedTutorials;