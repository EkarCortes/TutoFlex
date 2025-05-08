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
  whatsapp: string;
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

export const getTutorById = async (tutorId: number): Promise<TutorProfile | null> => {
  try {
    console.log(`Searching for tutor with ID: ${tutorId}`);
    
    // Use cached data if available
    if (!tutorsCache) {
      const response = await axiosInstance.get<{ data: TutorProfile[] }>("/users/getProfilesProfesors");
      tutorsCache = response.data.data;
    }
    
    // Find tutor by ID, check both profesor_id and usuario_id
    const tutor = tutorsCache.find(
      t => t.profesor_id === tutorId || t.usuario_id === tutorId
    );
    
    if (!tutor) {
      console.log(`Tutor with ID ${tutorId} not found. Available IDs:`, 
        tutorsCache.map(t => `profesor_id: ${t.profesor_id}, usuario_id: ${t.usuario_id}`).join(', '));
    }
    
    return tutor || null;
  } catch (error) {
    console.error("Error fetching tutor by ID:", error);
    return null;
  }
};

