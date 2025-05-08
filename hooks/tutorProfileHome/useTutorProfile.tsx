import { useState, useEffect, useCallback } from 'react';
import { getTutorById, TutorProfile } from '../../services/tutorService';

const useTutorProfile = (tutorId: number | null) => {
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutorProfile = useCallback(async () => {
    if (!tutorId) {
      console.log("No tutor ID provided");
      setError("No se especificó un ID de tutor");
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching tutor with ID: ${tutorId}`);
      setLoading(true);
      setError(null);
      
      const data = await getTutorById(tutorId);
      
      if (data) {
        console.log(`Successfully loaded tutor: ${data.nombre} ${data.apellido}`);
        setTutor(data);
      } else {
        console.error(`No tutor found with ID: ${tutorId}`);
        setError(`No se encontró el tutor con ID: ${tutorId}`);
      }
    } catch (err) {
      console.error("Error in useTutorProfile:", err);
      setError("Error al cargar los datos del tutor");
    } finally {
      setLoading(false);
    }
  }, [tutorId]);

  useEffect(() => {
    fetchTutorProfile();
  }, [fetchTutorProfile]);

  return { tutor, loading, error, fetchTutorProfile };
};

export default useTutorProfile;