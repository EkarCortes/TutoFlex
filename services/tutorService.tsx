import axiosInstance from "../api/axiosConfig";

export interface CourseSchedule {
  dia: number;
  hora_inicio: string;
  hora_fin: string;
}

export interface CourseDetail {
  nombre: string;
  resenas: number;
  curso_id: number;
  horarios: CourseSchedule[];
  precio_por_hora: number;
  tutorias_impartidas: number;
}

export interface TutorProfile {
  usuario_id: number;
  profesor_id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono_profesor: string;
  foto: string;
  descripcion: string;
  universidad_id: number;
  sede_id: number | null;
  recinto_id: number | null;
  carrera_id: number;
  universidad: string;
  sede: string | null;
  recinto: string | null;
  carrera: string;
  cursos_impartidos?: string[]; // Legacy field, keeping for backward compatibility
  cursos_detalle: CourseDetail[]; // New field with detailed course information
  total_cursos_impartidos: number;
  calificacion_promedio: string;
}

export interface Review {
  estrellas: number;
  comentario: string;
  nombre_estudiante: string;
}

// Cache to store tutor data and avoid unnecessary API calls
let tutorsCache: TutorProfile[] | null = null;

export const getTopTutors = async (limit: number = 5): Promise<TutorProfile[]> => {
  try {
    // Use cached data if available
    if (tutorsCache) {
      const sortedTutors = [...tutorsCache].sort((a, b) => {
        return parseFloat(b.calificacion_promedio) - parseFloat(a.calificacion_promedio);
      });
      return sortedTutors.slice(0, limit);
    }
    
    // Otherwise fetch from API
    const response = await axiosInstance.get<{ data: TutorProfile[] }>("/users/getProfilesProfesors");
    tutorsCache = response.data.data; // Cache the data
    
    // Sort by rating (descending) and get the top X tutors
    const sortedTutors = [...tutorsCache].sort((a, b) => {
      return parseFloat(b.calificacion_promedio) - parseFloat(a.calificacion_promedio);
    });
    
    return sortedTutors.slice(0, limit);
  } catch (error) {
    console.error("Error fetching top tutors:", error);
    return [];
  }
};

export const getTutorById = async (profesorId: number): Promise<TutorProfile | null> => {
  try {
    
    
    // Use cached data if available
    if (!tutorsCache) {
      const response = await axiosInstance.get<{ data: TutorProfile[] }>("/users/getProfilesProfesors");
      tutorsCache = response.data.data;
    }
    

    const tutor = tutorsCache.find(
      t => t.profesor_id === profesorId
    );
    
    
    
    
    return tutor || null;
  } catch (error) {
    console.error("Error fetching tutor by profesor_id:", error);
    return null;
  }
};

export const getReviewsByProfesorId = async (profesorId: number): Promise<Review[]> => {
  try {
    const response = await axiosInstance.get<{ data: { data: { reseñas: Review[] }[] } }>(
      `/reviews/getReviewByProfesorId/${profesorId}`
    );
    // Acceso correcto a las reseñas
    const reseñas = response.data.data?.data?.[0]?.reseñas || [];
    
    return reseñas;
  } catch (error) {
    console.error("Error fetching reviews by profesor ID:", error);
    return [];
  }
};