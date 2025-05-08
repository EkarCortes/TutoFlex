import axiosInstance from "../api/axiosConfig";

export interface Profile {
  usuario_id: number;
  profesor_id: number;
  nombre: string;
  apellido: string;
  whatsapp: string;
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
    const resp = await axiosInstance.get<{ data: Profile }>("/users/getProfileProfesor");
    return resp.data;
  } catch (err) {
    console.error("Error al obtener perfil:", err);
    return null;
  }
};
