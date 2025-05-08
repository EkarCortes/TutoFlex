import { Platform } from "react-native";
import { showToast } from "../components/Toast";
import usePayDeductions from "./usePayDeductions";

interface UsePayDeductionsHandlerProps {
  transferNumber: string;
  comprobanteUri: string | null;
  deductions: { deduccion_id: string }[];
  router: any;
}

const usePayDeductionsHandler = ({
  transferNumber,
  comprobanteUri,
  deductions,
  router,
}: UsePayDeductionsHandlerProps) => {
  const { handlePayment, loading } = usePayDeductions();

  const handleValidate = (): boolean => {
    if (!transferNumber.trim()) {
      showToast("error", "El número de transferencia es obligatorio.");
      return false;
    }

    if (!/^\d+$/.test(transferNumber)) {
      showToast("error", "El número de transferencia debe contener solo números.");
      return false;
    }

    if (!comprobanteUri) {
      showToast("error", "Debes subir un comprobante.");
      return false;
    }

    if (!deductions || deductions.length === 0) {
      showToast("error", "Debes seleccionar deducciones.");
      return false;
    }

    return true;
  };

  const handleConfirm = async (setShowModal: (v: boolean) => void) => {
    if (!handleValidate()) return;

    const deduccionIds = deductions.map(d => d.deduccion_id);
    const formData = new FormData();

    formData.append("numero_tranferencia", transferNumber);
    deduccionIds.forEach(id => formData.append("deducciones_ids[]", id));

    if (comprobanteUri) {
      if (Platform.OS === "web") {
        try {
          const response = await fetch(comprobanteUri);
          const blob = await response.blob();
          const ext = blob.type.split("/")[1] || "jpg";
          const file = new File([blob], `comprobante.${ext}`, { type: blob.type });
          formData.append("comprobante", file);
        } catch (err) {
          showToast("error", "No se pudo procesar la imagen del comprobante.");
          return;
        }
      } else {
        const ext = comprobanteUri.split(".").pop() || "jpg";
        formData.append("comprobante", {
          uri: comprobanteUri,
          name: `comprobante.${ext}`,
          type: `image/${ext}`,
        } as any);
      }
    }

    await handlePayment(formData, () => {
      setShowModal(false);
      router.push("/(drawer)/deductions");
    });
  };

  return {
    handleValidatePayment: handleValidate,
    handleConfirmPayment: handleConfirm,
    loading,
  };
};

export default usePayDeductionsHandler;

