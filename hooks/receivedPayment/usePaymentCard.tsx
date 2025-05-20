import { router } from "expo-router";
import usePaymentReceived from "./usePaymentReceived";
import { View, Text } from 'react-native';

// Este hook se encarga de manejar la lógica de los pagos recibidos y la navegación a los detalles del pago.

const usePaymentCard = () => {
  const { students, loading, refreshPayments } = usePaymentReceived();

  const navigateToDetails = (pagoId: number) => {
    router.push({
      pathname: "../../(drawer)/receivedPayments/_detailsPayments",
      params: { pagoId },
    });
  };

  const isDetailDisabled = (estado: string) => {
    return estado?.toLowerCase() === "pendiente";
  };

  const renderMonto = (item: any) => {
    if (item.monto_final && item.monto_final !== item.monto_original) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              textDecorationLine: "line-through",
              opacity: 0.6,
              marginRight: 8,
            }}
          >
            ₡{item.monto_original}
          </Text>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            ₡{item.monto_final}
          </Text>
        </View>
      );
    }
    return (
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
        ₡{item.monto_original}
      </Text>
    );
  };

  return {
    students,
    loading,
    refreshPayments,
    navigateToDetails,
    isDetailDisabled,
    renderMonto,
  };
};

export default usePaymentCard;
