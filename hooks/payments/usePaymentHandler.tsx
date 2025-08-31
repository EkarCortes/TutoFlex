import { Platform } from "react-native";
import { showToast } from "../../components/Toast";
import { Coupon } from "../../services/CouponService";
import usePayment from "./usePayment";

interface UsePaymentHandlerProps {
  tutorialData: any;
  discountedAmount: number;
  paymentMethod: "efectivo" | "transferencia";
  transferNumber: string;
  comprobanteUri: string | null;
  selectedCoupon: Coupon | null;
  router: any;
}

//Este hook se encarga de manejar la lógica de los pagos en la pantalla de confirmación de pago. Se encarga de validar los datos y confirmar el pago al backend.

const usePaymentHandler = ({
  tutorialData,
  discountedAmount,
  paymentMethod,
  transferNumber,
  comprobanteUri,
  selectedCoupon,
  router,
}: UsePaymentHandlerProps) => {
  const { handlePayment, loading } = usePayment();

  const handleValidatePayment = (): boolean => {
    if (!tutorialData.tutoria_id || !tutorialData.profesor_id) {
      showToast("error", "Faltan datos de la tutoría o del profesor.");
      return false;
    }

    if (!discountedAmount || discountedAmount <= 0) {
      showToast("error", "El monto a pagar no es válido.");
      return false;
    }

    if (paymentMethod === "transferencia") {
      if (!transferNumber.trim()) {
        showToast("error", "El número de transferencia es obligatorio.");
        return false;
      }

      if (!/^\d+$/.test(transferNumber)) {
        showToast(
          "error",
          "El número de transferencia debe contener solo números."
        );
        return false;
      }

      if (!comprobanteUri) {
        showToast("error", "Debes subir un comprobante de transferencia.");
        return false;
      }
    }

    return true;
  };

  const handleConfirmPayment = async (
    setShowConfirmModal: (value: boolean) => void
  ) => {
    if (!tutorialData.pago_id) {
      return;
    }

    const formData = new FormData();
    formData.append("pago_id", tutorialData.pago_id.toString());
    formData.append("monto", discountedAmount.toString());
    formData.append("tipo_pago", paymentMethod);

    if (selectedCoupon?.id) {
      formData.append("cupon_id", selectedCoupon.id.toString());
    }

    if (paymentMethod === "transferencia") {
      formData.append("num_transferencia", transferNumber || "");
      if (Platform.OS === "web") {
        if (comprobanteUri) {
          const resp = await fetch(comprobanteUri);
          const blob = await resp.blob();
          const ext = blob.type.split("/")[1] || "jpg";
          formData.append("comprobante", blob, `comprobante.${ext}`);
        } else {
          formData.append("comprobante", "");
        }
      } else {
        if (comprobanteUri) {
          const ext = comprobanteUri.split(".").pop() || "jpg";
          formData.append("comprobante", {
            uri: comprobanteUri,
            name: `comprobante.${ext}`,
            type: `image/${ext}`,
          } as any);
        } else {
          formData.append("comprobante", "");
        }
      }
    } else {
      formData.append("num_transferencia", "");
      formData.append("comprobante", "");
    }

    handlePayment(formData, () => {
      setShowConfirmModal(false);
      showToast("success", "Pago confirmado con éxito.");
      for (let pair of formData.entries()) {
        
      }
      setTimeout(() => {
      router.dismissTo("/(drawer)/payments");
      }
      , 2000);
    });
  };

  return { handleValidatePayment, handleConfirmPayment, loading };
};

export default usePaymentHandler;
