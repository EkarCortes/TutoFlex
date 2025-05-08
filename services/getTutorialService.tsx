import axiosInstance from "../api/axiosConfig";

export interface Tutorial {
  curso_id: number;
  foto_profesor: string | null;
  curso: string;
  clasificacion_curso: string;  
  usuario_id: number;
  profesor_id: number;
  profesor: string;
  universidad: string;
  carrera: string | null;
  pais: string;
  modalidad: string;
  monto_por_hora: string;
  horarios: string;
}

interface ScheduleTutorialParams {
  profesor_id: number;
  curso_id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  temas: string;
}

export interface TutorialDetails {
  curso_id: number;
  curso_profesor_id: number; // Agregado
  modalidad: string;
  monto_por_hora: string;
  horarios: string;
}

// Interfaz para los parámetros de consulta de tutorías pendientes
interface PendingTutorialParams {
  profesor_id: number;
  curso_id: number;
  fecha: string; // formato YYYY-MM-DD
}

export const getTutorial = async (): Promise<{
  success: boolean;
  message: string;
  data: Tutorial[];
} | null> => {
  try {
    const response = await axiosInstance.get("/tutorials/getTutorials");
    console.log(
      "Respuesta completa de la API desde GetTutorialService:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener el tutorial del usuario:", error);
    return null;
  }
};

export const scheduleTutorial = async (
  params: ScheduleTutorialParams
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const response = await axiosInstance.post(
      "/tutorials/scheduleTutoring",
      params
    );
    console.log("Respuesta al agendar tutoría:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agendar la tutoría:", error);
    return {
      success: false,
      message: "No se pudo agendar la tutoría. Intente nuevamente más tarde.",
    };
  }
};

export const getTutorialDetails = async (
  curso_id: number
): Promise<TutorialDetails | null> => {
  try {
    const response = await axiosInstance.post(
      "/tutorials/getTutorialsProfessorCourse",
      {
        curso_id,
      }
    );

    if (response.data.success && response.data.data.length > 0) {
      const course = response.data.data[0];

      // Devolver los datos tal como están, sin validar si están completos
      return {
        curso_id: course.curso_id,
        curso_profesor_id: course.curso_profesor_id,
        modalidad: course.modalidad || "No especificada",
        monto_por_hora: course.monto_por_hora || "0",
        horarios: course.horarios || "Sin horarios disponibles",
      };
    } else {
      console.log("Error: No se encontraron datos para el curso.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los detalles del curso:", error);
    return null;
  }
};

// Nueva función para obtener tutorías pendientes por profesor y fecha
export const getPendingTutorialsByProfessor = async (
  params: PendingTutorialParams
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    console.log("Consultando tutorías pendientes con params:", params);
    
    const response = await axiosInstance.post(
      "/tutorials/getPendingTutorialProfessor",
      params
    );
    
    console.log("Respuesta de tutorías pendientes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al consultar tutorías pendientes:", error);
    return {
      success: false,
      message: "No se pudieron obtener las tutorías pendientes.",
      data: null
    };
  }
};
