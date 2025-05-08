import { Double } from "react-native/Libraries/Types/CodegenTypes";
import axiosInstance from "../api/axiosConfig";

// Interfaz para los datos del curso
export interface Coupon {
    id: number;
    cupon: string;
    codigo: string;
    descuento: number;
    fecha_inicio: string;
    fecha_expiracion: string;
    puntos_requeridos: number;
}
// Interfaz para los datos del nuevo curso
export interface CreateCouponData {
    nombre_cupon: string;
    descuento: Double;
    fecha_inicio: String;
    fecha_expiracion: String;
    puntos_requeridos: number;
}


// Obtener todos los cursos
export const getCoupons = async (): Promise<Coupon[]> => {
    try {
        const response = await axiosInstance.get("/coupons/getCoupons");
        return response.data.data.map((coupon: any) => ({
            id: coupon.id,
            cupon: coupon.cupon,
            codigo: coupon.codigo,
            descuento: coupon.descuento,
            fecha_inicio: coupon.fecha_inicio,
            fecha_expiracion: coupon.fecha_expiracion,
            puntos_requeridos: coupon.puntos_requeridos,
        }));
    } catch (error) {
        console.error("Error al obtener los cupones:", error);
        throw error;
    }
};


// Crear un nuevo curso
export const createCoupon = async (data: CreateCouponData): Promise<void> => {
    try {
        await axiosInstance.post("/coupons/createCoupon", data);
    } catch (error) {
        console.error("Error al crear el curso:", error);
        throw error;
    }
}

// Eliminar un curso
export const deleteCoupon = async (id: number): Promise<void> => {
    try {
        await axiosInstance.put(`/coupons/deleteCoupon/${id}`);
    } catch (error) {
        console.error("Error al eliminar el cupón:", error);
        throw error;
    }
};
