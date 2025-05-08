import axiosInstance from "../api/axiosConfig";

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
    const response = await axiosInstance.get("/users/getProfileStudent");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

export const updateProfile = async (profileData: Partial<Profile>): Promise<{ data: Profile } | null> => {
  try {
    const response = await axiosInstance.put("/users/updateStudent", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};