import axiosInstance from "../api/axiosConfig";

// Interfaz para los datos del curso
export interface Payment {
  pago_id: number;
  tutoria_id: number;
  nombre: string;
  nombre_profesor: string;
  nombre_estudiante: string;
  fecha_tutoria: string;
  hora_inicio: string;
  hora_fin: string;
  monto: number;
  estado: "pendiente";
  created_at: string;
  updated_at: string;
}

// Obtener todos los cursos
export const getPaymentsReceived = async (): Promise<Payment[]> => {
  try {
    const response = await axiosInstance.get(
      "/payments/getPendingPaymentsStudentsTeacher"
    );
    return response.data.data.map(
      (payment: any) =>
        ({
          pago_id: payment.pago_id,
          tutoria_id: payment.tutoria_id,
          nombre: payment.nombre,
          nombre_profesor: payment.nombre_profesor,
          nombre_estudiante: payment.nombre_estudiante,
          fecha_tutoria: payment.fecha_tutoria,
          hora_inicio: payment.hora_inicio,
          hora_fin: payment.hora_fin,
          monto: payment.monto,
          estado: payment.estado,
          created_at: payment.created_at,
          updated_at: payment.updated_at,
        } as Payment),
        console.log("response.data.data", response.data.data)
    );
  } catch (error) {
    console.error("Error al obtener los datos del pago pendiente:", error);
    throw error;
  }
};
