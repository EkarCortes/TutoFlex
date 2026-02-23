import axiosInstance from "../api/axiosConfig";
import { getStoredUserData } from "./authStorage";

export interface Profile {
    usuario_id: number;
    nombre: string;
    apellido: string;
    email: string;
    estudiante_id: number;
    carnet: string;
    total_puntos: string;
    universidad: string;
    carrera: string;
    sede: string;
    recinto: string;
    mis_cursos: string[];
    total_cursos_recibidos: number;
    // Añade estas propiedades opcionales
    pais_id: number;
    universidad_id: number;
    sede_id: number;
    recinto_id: number;
    carrera_id: number;
    pais_nombre?: string; // Opcional si necesitas el nombre del país
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
        nombre: localUser.nombre,
        apellido: localUser.apellido,
        email: localUser.email,
        estudiante_id: 0,
        carnet: "",
        total_puntos: "0",
        universidad: "",
        carrera: "",
        sede: "",
        recinto: "",
        mis_cursos: [],
        total_cursos_recibidos: 0,
        pais_id: 0,
        universidad_id: localUser.universidad_id || 0,
        sede_id: 0,
        recinto_id: 0,
        carrera_id: localUser.carrera_id || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const updateProfile = async (profileData: Partial<Profile>): Promise<{ data: Profile } | null> => {
  try {
    const response = await axiosInstance.put("/users/me/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
