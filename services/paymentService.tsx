import axiosInstance from "../api/axiosConfig";

export interface PaymentRequest {
  tutoria_id: number;
  profesor_id: number;
  monto: number;
  comprobante: string | null;
  num_transferencia: string | null;
  tipo_pago: string;
  cupon_id?: number | null;
}

export const sendPayment = async (
  paymentData: PaymentRequest | FormData
): Promise<any> => {
  try {
    let res;
    if (paymentData instanceof FormData) {
      res = await axiosInstance.put(
        "/payments/updatePaymentOfStudent",
        paymentData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      res = await axiosInstance.put(
        "/payments/updatePaymentOfStudent",
        paymentData
      );
    }
 
    return res.data;
  } catch (error: any) {
    console.error(
      "⏺ sendPayment error.response:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const cancelTutorial = async (tutoria_id: number): Promise<void> => {
  try {
    await axiosInstance.post("/tutorials/cancelTutorial", { tutoria_id });
    
  } catch (error: any) {
    console.error("Error al cancelar la tutoría:", error.response?.data || error.message);
    throw error;
  }
};
