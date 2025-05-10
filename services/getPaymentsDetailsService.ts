import axiosInstance from "../api/axiosConfig";

// Interfaz para los datos del pago
export interface Payment {
  pago_id: number;
  profesor_id: number;
  estudiante_id: number;
  estudiante_nombre: string;
  curso_id: number;
  nombre_curso: string;
  modalidad: string;
  monto: string;
  tutoria_id: number;
  fecha_tutoria: string;
  hora_inicio_tutoria: string;
  hora_fin_tutoria: string;
  email: string;

  //El comprobante es un string que contiene la URL del comprobante de pago puede ser null
  
  comprobante?: string;
}

// Obtener todos los pagos pendientes
export const getPaymentsDetailsService = async (): Promise<Payment[]> => {
  try {
    const response = await axiosInstance.get(
      "/payments/pendingPaymentsProfessor"
    );
    return response.data.data.map(
      (payment: any) =>
        ({
          pago_id: payment.pago_id,
          profesor_id: payment.profesor_id,
          estudiante_id: payment.estudiante_id,
          estudiante_nombre: payment.estudiante_nombre,
          curso_id: payment.curso_id,
          nombre_curso: payment.nombre_curso,
          modalidad: payment.modalidad,
          monto: payment.monto,
          tutoria_id: payment.tutoria_id,
          fecha_tutoria: payment.fecha_tutoria,
          hora_inicio_tutoria: payment.hora_inicio_tutoria,
          hora_fin_tutoria: payment.hora_fin_tutoria,
          email: payment.email,
          comprobante: payment.comprobante,
        } as Payment)
    );
  } catch (error) {
    console.error("Error al obtener los datos del pago pendiente:", error);
    throw error;
  }
};
