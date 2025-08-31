import axiosInstance from "../api/axiosConfig";

export interface FinishedTutorial {
  tutoria_id: number;
  estudiante_id: number;
  profesor_id: number;
  nombre_profesor: string;
  foto_profesor: string;
  nombre_tutoria: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
}

export interface ReviewPayload {
  tutoria_id: number;
  profesor_id: number;
  estrellas: number;
  comentario: string;
}

export const getFinishedTutorials = async (): Promise<{ 
  success: boolean; 
  message: string; 
  data: FinishedTutorial[] 
}> => {
  try {
    const response = await axiosInstance.get("/reviews/reviewTutorialFinished");
    return response.data;
  } catch (error) {
    console.error("Error fetching finished tutorials:", error);
    return {
      success: false,
      message: "Error al obtener las tutorías finalizadas",
      data: []
    };
  }
};

export const submitTutorialReview = async (payload: ReviewPayload): Promise<{ success: boolean; message: string }> => {
  try {
    
    
    const response = await axiosInstance.post("/reviews/insertReview", payload);
    
    
    return response.data;
  } catch (error) {
    console.error("Error en la respuesta:", error);
    
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }
    
    return {
      success: false,
      message: error.response?.data?.message || "Error al enviar la reseña"
    };
  }
};