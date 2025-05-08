import { useState } from "react";
import { sendPayment, PaymentRequest } from "../services/paymentService";
import { showToast } from "../components/Toast";

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (
    paymentData: PaymentRequest | FormData,
    onSuccess: () => void
  ) => {
    try {
      await sendPayment(paymentData);
      showToast("success", "Pago realizado correctamente");
      onSuccess();
    } catch (err) {
      console.error("Error al realizar el pago:", err);
      setError("No se pudo realizar el pago. Inténtalo nuevamente.");
      showToast("error", "No se pudo realizar el pago");
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading, error };
};

export default usePayment;
