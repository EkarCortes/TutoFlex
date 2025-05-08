import { useState, useEffect, useCallback } from 'react';
import { getTopTutors, TutorProfile } from '../../services/tutorService';

const useTopTutors = (limit: number = 5) => {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopTutors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTopTutors(limit);
      setTutors(data);
    } catch (err) {
      console.error("Error in useTopTutors:", err);
      setError("Error al cargar los mejores tutores");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTopTutors();
  }, [fetchTopTutors]);

  return { tutors, loading, error, fetchTopTutors };
};

export default useTopTutors;