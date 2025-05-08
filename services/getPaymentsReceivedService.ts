import axiosInstance from "../api/axiosConfig";

// Interfaz para los datos del curso
export interface Payment {
    pago_id: number;
    profesor_id: number;
    estudiante_id: number;
    estudiante_nombre: string;
    estudiante_email: string;
}

// Obtener todos los cursos
export const getPaymentsReceived = async (): Promise<Payment[]> => {
    try {
        const response = await axiosInstance.get("/payments/getPendingPaymentsStudentsTeacher");
        return response.data.data.map((payment: any) => ({
            pago_id: payment.pago_id,
            profesor_id: payment.profesor_id,
            estudiante_id: payment.estudiante_id,
            estudiante_nombre: payment.estudiante_nombre,
            estudiante_email: payment.estudiante_email
        } as Payment));
    } catch (error) {
        console.error("Error al obtener los datos del pago pendiente:", error);
        throw error;
    }
};




