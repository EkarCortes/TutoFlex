import { getStoredUserData } from "./authStorage";

export interface Profile {
  usuario_id: number;
  profesor_id: number;
  nombre: string;
  apellido: string;
  telefono_profesor: string;
  foto: string;
  descripcion: string;
  email: string;
  universidad_id: number;
  sede_id: number;
  recinto_id: number;
  carrera_id: number;
  universidad: string;
  sede: string;
  recinto: string;
  carrera: string;
  cursos_impartidos: string[];
  total_cursos_impartidos: number;
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
        usuario_id: localUser.id,
        profesor_id: 0,
        nombre: localUser.nombre,
        apellido: localUser.apellido,
        telefono_profesor: "",
        foto: "",
        descripcion: "",
        email: localUser.email,
        universidad_id: localUser.universidad_id || 0,
        sede_id: 0,
        recinto_id: 0,
        carrera_id: localUser.carrera_id || 0,
        universidad: "",
        sede: "",
        recinto: "",
        carrera: "",
        cursos_impartidos: [],
        total_cursos_impartidos: 0,
        calificacion_promedio: "0",
      },
    };
  } catch (err) {
    console.error("Error al obtener perfil:", err);
    return null;
  }
};
