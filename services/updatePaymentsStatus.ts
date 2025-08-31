import axiosInstance from '../api/axiosConfig';

export const updatePaymentStatus = async (paymentData: { payment_id: number; estado: string }) => {
  try {
    
    const response = await axiosInstance.post('/payments/confirmPaymentOfStudent', paymentData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al actualizar el estado del pago');
    }
    throw new Error('Error de conexión al servidor');
  }
};