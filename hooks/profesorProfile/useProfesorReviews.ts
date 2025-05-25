import { useEffect, useState } from "react";
import { getReviewsByProfesorId } from "../../services/tutorService";
import { Review } from "../../services/tutorService";

export function useProfesorReviews(profesorId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getReviewsByProfesorId(profesorId)
      .then((res) => {
        if (isMounted) {
          setReviews(res);
          setError(null);
        }
      })
      .catch(() => {
        if (isMounted) setError("Error al cargar las reseñas");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [profesorId]);

  return { reviews, loading, error };
}