import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { usePaymentDetails } from "./usePaymentsDetails";
import useUpdatePaymentStatus from "./useUpdatePaymentStatus";
import { showToast } from "../../components/Toast";

//Funciones para formatear la hora

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Este hook se encarga de manejar la lógica de los detalles de los pagos

const useCardDetailsPayments = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmModalRejection, setShowConfirmModalRejection] =
    useState(false);
  const [showComprobanteModal, setShowComprobanteModal] = useState(false);

  const { pagoId } = useLocalSearchParams<{ pagoId?: string | string[] }>();
  const parsedPagoId = Array.isArray(pagoId) ? pagoId[0] : pagoId;
  const paymentId = parsedPagoId ? Number(parsedPagoId) : null;
  const validPaymentId =
    paymentId !== null && Number.isFinite(paymentId) && paymentId > 0 ? paymentId : null;

  const { selectedPayment, loading } = usePaymentDetails(validPaymentId);
  const { updateStatus, loading: updating } = useUpdatePaymentStatus();

  const managePaymentConfirmation = async () => {
    if (validPaymentId === null) {
      showToast("error", "No se encontró un pago válido para confirmar");
      return;
    }

    try {
      await updateStatus(validPaymentId, "realizado");
      showToast("success", "Pago confirmado correctamente");
      setTimeout(() => {
        router.push("/(drawer)/receivedPayments");
      }, 3000);
    } catch (error) {
      showToast("error", "Error al confirmar el pago");
    }
  };

  const handlePaymentRejection = async () => {
    if (validPaymentId === null) {
      showToast("error", "No se encontró un pago válido para rechazar");
      return;
    }

    try {
      await updateStatus(validPaymentId, "pendiente");
      showToast("success", "Pago rechazado correctamente");
      setTimeout(() => {
        router.push("/(drawer)/receivedPayments");
      }, 3000);
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
