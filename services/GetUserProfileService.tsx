import axiosInstance from "../api/axiosConfig";

export interface Profile {
    pais_id: any;
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
    mis_cursos: [];
    total_cursos_recibidos: number;
    universidad_id: number;
    sede_id: number;
    recinto_id: number;
    carrera_id: number;
    pais_nombre?: string;
    
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

