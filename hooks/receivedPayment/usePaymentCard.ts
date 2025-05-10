import { router } from "expo-router";
import usePaymentReceived from "./usePaymentReceived";

// Este hook se encarga de manejar la lógica de los pagos recibidos y la navegación a los detalles del pago.

const usePaymentCard = () => {
  const { students, loading, refreshPayments } = usePaymentReceived();

  const navigateToDetails = (pagoId: number) => {
    router.push({
      pathname: "../../(drawer)/receivedPayments/_detailsPayments",
      params: { pagoId },
    });
  };

  return {
    students,
    loading,
    refreshPayments,
    navigateToDetails,
  };
};

export default usePaymentCard;
