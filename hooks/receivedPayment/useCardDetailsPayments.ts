import { useState } from "react";
import { router } from "expo-router";

import { usePaymentDetails } from "./usePaymentsDetails";
import { useSearchParams } from "expo-router/build/hooks";
import useUpdatePaymentStatus from "./useUpdatePaymentStatus ";
import { showToast } from "../../components/Toast";

// Este hook se encarga de manejar la lógica de los detalles de los pagos

const useCardDetailsPayments = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmModalRejection, setShowConfirmModalRejection] =
    useState(false);
  const [showComprobanteModal, setShowComprobanteModal] = useState(false); 

  const searchParams = useSearchParams();
  const pagoId = searchParams.get("pagoId");
  const { selectedPayment, loading } = usePaymentDetails(Number(pagoId));
  const { updateStatus, loading: updating } = useUpdatePaymentStatus();

  const managePaymentConfirmation = async () => {
    try {
      await updateStatus(Number(pagoId), "realizado");
      showToast("success", "Pago confirmado correctamente");
      router.push("/(drawer)/receivedPayments");
    } catch (error) {
      showToast("error", "Error al confirmar el pago");
    }
  };

  const handlePaymentRejection = async () => {
    try {
      await updateStatus(Number(pagoId), "pendiente");
      showToast("success", "Pago rechazado correctamente");
      router.push("/(drawer)/receivedPayments");
    } catch (error) {
      showToast("error", "Error al rechazar el pago");
    }
  };

  return {
    showConfirmModal,
    setShowConfirmModal,
    showConfirmModalRejection,
    setShowConfirmModalRejection,
    showComprobanteModal,
    setShowComprobanteModal,
    selectedPayment,
    loading,
    updating,
    managePaymentConfirmation,
    handlePaymentRejection,
  };
};

export default useCardDetailsPayments;
