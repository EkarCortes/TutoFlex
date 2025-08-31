import { useState } from 'react';
import { updatePaymentStatus } from '../../services/updatePaymentsStatus';

// Este hook se encarga de manejar la lógica de actualización del estado del pago.

const useUpdatePaymentStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (payment_id: number, estado: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updatePaymentStatus({ payment_id, estado });
      
      return response;
    } catch (err: any) {
      setError(err.message);
      console.error('Error al actualizar el estado del pago:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};

export default useUpdatePaymentStatus;