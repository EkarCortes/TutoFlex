import axiosInstance from "../api/axiosConfig";

export type Modalidad = 'presencial' | 'virtual' | 'hibrida';

// Interfaz para los detalles del curso
export interface CourseDetails {
  curso_id: number;
  monto_por_hora: number;
  modalidad: Modalidad;
  horario: string; // Ejemplo: "Miércoles-09:00-10:00,Sábado-14:00-16:00"
}

// Interfaz para la respuesta del servidor
export interface CourseDetailsResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface CourseProfesor {
  curso_id: number;
  curso_profesor_id: number;
  foto_profesor: string | null;
  curso: string;
  clasificacion_curso: string;
  usuario_id: number;
  profesor_id: number;
  profesor: string;
  universidad: string;
  carrera: string;
  pais: string;
  modalidad: Modalidad;
  monto_por_hora: string;
  horarios: string | null;
}

export const addCourseDetails = async (data: CourseDetails): Promise<CourseDetailsResponse> => {
  try {
    console.log("API request data:", JSON.stringify(data));

    // Validar formato de horario antes de enviar la petición
    if (!validarFormatoHorario(data.horario)) {
      return {
        success: false,
        message: "El formato del horario es inválido. Use Día-HH:MM-HH:MM.",
      };
    }

    const requestData = {
      curso_id: data.curso_id,
      monto_por_hora: data.monto_por_hora,
      modalidad: data.modalidad,
      horario: data.horario,
    };

    const response = await axiosInstance.post<CourseDetailsResponse>(
      "/courses/insertCourseScheduleProfessor",
      requestData,
      {
        timeout: 10000, // Timeout de 10 segundos
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    // Si el servidor responde con un error
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Ocurrió un problema con la solicitud.",
      };
    }

    // Manejo de errores de red u otros
    return {
      success: false,
      message: "No se pudo conectar con el servidor. Intente de nuevo.",
    };
  }
};

// Validación del formato del horario
export const validarFormatoHorario = (horario: string): boolean => {
  const regex = /^([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)-([0-2][0-9]:[0-5][0-9])-([0-2][0-9]:[0-5][0-9])(?:,([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)-([0-2][0-9]:[0-5][0-9])-([0-2][0-9]:[0-5][0-9]))*$/;
  return regex.test(horario);
};

export const deleteCourseProfessor = async (
  curso_profesor_id: number
): Promise<{ success: boolean; message: string; error?: string; data?: any }> => {
  try {
    // Validar que el ID del curso sea un número válido
    if (!curso_profesor_id || typeof curso_profesor_id !== "number") {
      return {
        success: false,
        message: "El ID del curso_profesor es inválido.",
      };
    }

    // Realizar la solicitud DELETE a la API
    const response = await axiosInstance.delete(
      "/courses/deleteCourseProfessor",
      {
        data: { curso_profesor_id }, // El body de la solicitud
        headers: {
          "Content-Type": "application/json", // Asegurar el tipo de contenido
        },
      }
    );

    // Retornar la respuesta del servidor
    return {
      success: response.data.success,
      message: response.data.message,
      error: response.data.error, // Capturar el campo "error" si está presente
      data: response.data, // Pasar la respuesta completa si es necesario
    };
  } catch (error: any) {
    console.error("Error detallado al eliminar curso_profesor:", error);

    // Manejo de errores del servidor
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Error desconocido en la API",
        error: error.response.data.error, // Capturar el campo "error" si está presente
      };
    }

    // Manejo de errores de red u otros
    return {
      success: false,
      message: "No se pudo conectar con el servidor. Intente nuevamente.",
    };
  }
};

export const getCoursesProfesor = async (): Promise<Course[]> => {
  try {
    const response = await axiosInstance.get<{ data: CourseProfesor[] }>("/courses/getCoursesProfesor");

    return response.data.data.map((course: CourseProfesor) => ({
      id: course.curso_id.toString(),
      name: course.curso, // Nombre del curso
      description: course.clasificacion_curso, // Clasificación como descripción
      category: course.clasificacion_curso, // Categoría del curso
      price: course.monto_por_hora, // Precio por hora
      schedule: course.horarios || "Sin horarios disponibles", // Horarios
      modalidad: course.modalidad, // Modalidad
    }));
  } catch (error) {
    console.error("Error al obtener los cursos del profesor:", error);
    throw new Error("No se pudieron obtener los cursos del profesor.");
  }
};