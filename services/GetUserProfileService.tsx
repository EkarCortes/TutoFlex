import { getStoredUserData } from "./authStorage";

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
    const localUser = await getStoredUserData<{
      id: number;
      nombre: string;
      apellido: string;
      email: string;
      universidad_id?: number;
      carrera_id?: number;
    }>();

    if (!localUser) {
      return null;
    }

    return {
      data: {
        pais_id: 0,
        usuario_id: localUser.id,
        nombre: localUser.nombre,
        apellido: localUser.apellido,
        email: localUser.email,
        telefono_estudiante: "",
        estudiante_id: 0,
        carnet: "",
        total_puntos: "0",
        universidad: "",
        carrera: "",
        sede: "",
        recinto: "",
        mis_cursos: [],
        total_cursos_recibidos: 0,
        universidad_id: localUser.universidad_id || 0,
        sede_id: 0,
        recinto_id: 0,
        carrera_id: localUser.carrera_id || 0,
        pais_nombre: "",
      },
    };
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    return null;
  }
};

export const getProfileProfesor = async (): Promise<ProfesorProfile | null> => {
  try {
    const localUser = await getStoredUserData<{
      id: number;
      nombre: string;
      apellido: string;
      email: string;
      universidad_id?: number;
      carrera_id?: number;
    }>();

    if (!localUser) {
      return null;
    }

    return {
      usuario_id: localUser.id,
      profesor_id: 0,
      nombre: localUser.nombre,
      apellido: localUser.apellido,
      email: localUser.email,
      telefono_profesor: "",
      foto: "",
      descripcion: "",
      universidad: "",
      sede: null,
      recinto: null,
      carrera: "",
      universidad_id: localUser.universidad_id || 0,
      sede_id: null,
      recinto_id: null,
      carrera_id: localUser.carrera_id || 0,
      calificacion_promedio: "0",
    };
  } catch (error) {
    console.error("Error al obtener el perfil del profesor:", error);
    return null;
  }
};

