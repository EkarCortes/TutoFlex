import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { showToast } from "../../components/Toast";
import { submitTutorialReview } from "../../services/reviewService";

// Este hook se utiliza en la pantalla de calificar a los tutores
// y permite gestionar la reseña y la calificación del tutor en estrellas.

export const useReviewTutorialScreen = () => {
  const params = useLocalSearchParams();
  const { id, profesor, curso, foto_profesor, profesor_id: profesorIdParam } = params;

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async () => {
    if (!review.trim()) {
      showToast("error", "Por favor, ingrese una reseña antes de enviar.");
      return;
    }
    if (rating === 0) {
      showToast("error", "Por favor, seleccione una calificación.");
      return;
    }

    try {
      setSubmitting(true);
      const tutoria_id = parseInt(id as string, 10);
      const profesor_id = parseInt(profesorIdParam as string, 10);

      if (isNaN(tutoria_id) || isNaN(profesor_id)) {
        showToast("error", "Datos de tutoría inválidos");
        return;
      }

      const payload = {
        tutoria_id,
        profesor_id,
        estrellas: rating,
        comentario: review
      };

      const response = await submitTutorialReview(payload);

      if (response.success) {
        showToast("success", "Reseña enviada con éxito.");
        setTimeout(() => router.dismissTo("/(drawer)/qualifications"), 2000);
      } else {
        showToast("error", response.message || "Error al enviar la reseña");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showToast("error", "Ocurrió un error al enviar la reseña");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    params: { id, profesor, curso, foto_profesor, profesorIdParam },
    review,
    setReview,
    rating,
    setRating,
    submitting,
    submitReview,
  };
};