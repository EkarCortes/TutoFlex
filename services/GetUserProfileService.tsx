import axiosInstance from "../api/axiosConfig";

export interface Profile {
    pais_id: any;
    usuario_id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono_estudiante: string;
    estudiante_id: number;
    carnet: string;
    total_puntos: string;
    universidad: string;
    carrera: string;
    sede: string;
    recinto: string;
    mis_cursos: [];
    total_cursos_recibidos: number;
    universidad_id: number;
    sede_id: number;
    recinto_id: number;
    carrera_id: number;
    pais_nombre?: string;
    
}

// Solo los datos personales del profesor
export interface ProfesorProfile {
  usuario_id: number;
  profesor_id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono_profesor: string;
  foto: string;
  descripcion: string;
  universidad: string;
  sede: string | null;
  recinto: string | null;
  carrera: string;
  universidad_id: number;
  sede_id: number | null;
  recinto_id: number | null;
  carrera_id: number;
  calificacion_promedio: string;
}

export const getProfile = async (): Promise<{ data: Profile } | null> => {
    try {
        const response = await axiosInstance.get("/users/getProfileStudent");
        console.log("Respuesta completa de la API desde GetUserProfileService:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        return null;
    }
};

export const getProfileProfesor = async (): Promise<ProfesorProfile | null> => {
  try {
    const response = await axiosInstance.get("users/getProfileProfesor");
    const data = response.data?.data;
    if (!data) return null;
    return {
      usuario_id: data.usuario_id,
      profesor_id: data.profesor_id,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono_profesor: data.telefono_profesor,
      foto: data.foto,
      descripcion: data.descripcion,
      universidad: data.universidad,
      sede: data.sede,
      recinto: data.recinto,
      carrera: data.carrera,
      universidad_id: data.universidad_id,
      sede_id: data.sede_id,
      recinto_id: data.recinto_id,
      carrera_id: data.carrera_id,
      calificacion_promedio: data.calificacion_promedio,
    };
  } catch (error) {
    console.error("Error al obtener el perfil del profesor:", error);
    return null;
  }
};

