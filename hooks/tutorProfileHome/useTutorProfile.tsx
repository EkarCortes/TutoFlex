import { useState, useEffect, useCallback } from 'react';
import { getTutorById, TutorProfile } from '../../services/tutorService';

// Este hook se utiliza para obtener el perfil de un tutor
// en la pantalla de inicio del perfil del tutor. Permite cargar el perfil

const useTutorProfile = (tutorId: number | null) => {
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutorProfile = useCallback(async () => {
    if (!tutorId) {
      
      setError("No se especificó un ID de tutor");
      setLoading(false);
      return;
    }

    try {
      
      setLoading(true);
      setError(null);
      
      const data = await getTutorById(tutorId);
      
      if (data) {
        
        setTutor(data);
      } else {
        
        setError(`No se encontró el tutor con ID: ${tutorId}`);
      }
    } catch (err) {
      
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