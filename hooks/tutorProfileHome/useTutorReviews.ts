import { useState, useEffect } from "react";
import { getReviewsByProfesorId, Review } from "../../services/tutorService";

//Este hook se utiliza para obtener las reseñas de un tutor

export function useTutorReviews(profesorId: number | null) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profesorId) return;
    setLoading(true);
    getReviewsByProfesorId(profesorId)
      .then(setReviews)
      .finally(() => setLoading(false));
  }, [profesorId]);

  return { reviews, loading };
}