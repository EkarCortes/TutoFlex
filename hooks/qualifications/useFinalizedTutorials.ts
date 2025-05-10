import { useState } from "react";
import { router } from "expo-router";
import useFinishedTutorials from "./useFinishedTutorialsData";

// Este hooks se encarga de gestionar la pantalla de tutorías finalizadas
// para poder reseñar las tutorías 

const useFinalizedTutorialsScreen = () => {
  const { tutorials, loading, error, refreshTutorials } = useFinishedTutorials();
  const [selectedTutoria, setSelectedTutoria] = useState(null);

  const openReviewModal = (tutoria) => setSelectedTutoria(tutoria);
  const closeReviewModal = () => setSelectedTutoria(null);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      const day = localDate.getDate().toString().padStart(2, '0');
      const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
      const year = localDate.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    } catch (e) {
      console.error("Error formatting time:", e);
      return timeString;
    }
  };

  const handleReview = () => {
    if (selectedTutoria) {
      router.push({
        pathname: "/(drawer)/qualifications/review",
        params: { 
          id: selectedTutoria.tutoria_id, 
          profesor: selectedTutoria.nombre_profesor, 
          curso: selectedTutoria.nombre_tutoria,
          profesor_id: selectedTutoria.profesor_id,
          foto_profesor: selectedTutoria.foto_profesor,
        },
      });
    }
    closeReviewModal();
  };

  return {
    tutorials,
    loading,
    error,
    refreshTutorials,
    selectedTutoria,
    openReviewModal,
    closeReviewModal,
    formatDate,
    formatTime,
    handleReview,
  };
};

export default useFinalizedTutorialsScreen;