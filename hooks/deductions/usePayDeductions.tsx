import { useState } from "react";
import { showToast } from "../../components/Toast";
import { DeductionPaidItem, payMultipleDeductions } from "../../services/deductionsService";


// Este hook se utiliza para gestionar el pago de deducciones
// y permite realizar el pago de múltiples deducciones.


const usePayDeductions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (
    paymentData: DeductionPaidItem | FormData,
    onSuccess: () => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      await payMultipleDeductions(paymentData);
      showToast("success", "Pago de deducciones realizado correctamente");
      onSuccess();
    } catch (err) {
      console.error("Error al pagar deducciones:", err);
      setError("No se pudo procesar el pago de deducciones.");
      showToast("error", "Error en el pago de deducciones");
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading, error };
};

export default usePayDeductions;
