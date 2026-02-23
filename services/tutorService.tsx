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

let warnedUnavailable = false;

const warnUnavailableOnce = () => {
  if (warnedUnavailable) return;
  warnedUnavailable = true;
  console.warn("Rutas de tutores y reseñas no disponibles en API v2 actual.");
};

export const getTopTutors = async (limit: number = 5): Promise<TutorProfile[]> => {
  void limit;
  warnUnavailableOnce();
  return [];
};

export const getTutorById = async (profesorId: number): Promise<TutorProfile | null> => {
  void profesorId;
  warnUnavailableOnce();
  return null;
};

export const getReviewsByProfesorId = async (profesorId: number): Promise<Review[]> => {
  void profesorId;
  warnUnavailableOnce();
  return [];
};
