import { useState } from "react";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { usePaymentDetails } from "./usePaymentsDetails";
import { showToast } from "../../components/Toast";
import useUpdatePaymentStatus from "./useUpdatePaymentStatus ";

const useCardDetailsPayments = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmModalRejection, setShowConfirmModalRejection] =
    useState(false);

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
    selectedPayment,
    loading,
    updating,
    managePaymentConfirmation,
    handlePaymentRejection,
  };
};

export default useCardDetailsPayments;
