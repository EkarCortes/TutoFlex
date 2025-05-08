import axiosInstance from "../api/axiosConfig";
import Ranking from '../app/(drawer)/ranking';

// Interfaz para los datos del curso
export interface Ranking {
    estudiante_id: number;
    nombre: string;
    apellido: string;
    puntos_ranking: number;
}

export interface ApiResponse {
    message: string;
    success: boolean;
    data?: any;
}

export const getRanking = async (): Promise<Ranking[]> => {
    try {
        const response = await axiosInstance.get("/coupons/getRanking");
        return response.data.data.map((ranking: any) => ({
            estudiante_id: ranking.estudiante_id,
            nombre: ranking.nombre,
            apellido: ranking.apellido,
            puntos_ranking: ranking.puntos_ranking
        }));
    } catch (error) {
        console.error("Error al obtener los ranking:", error);
        throw error;
    }
};
