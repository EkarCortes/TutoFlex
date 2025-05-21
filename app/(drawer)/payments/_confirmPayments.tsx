import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import PaymentInfo from "../../../components/PaymentInfo";
import TransferenciaInfo from "../../../components/TransferenciaInfo";
import UploadComprobante from "../../../components/UploadComprobante";
import CouponInput from "../../../components/CouponInput";
import ToastComponent from "../../../components/Toast";
import HeaderScreens from "../../../components/HeaderScreens";
import useConfirmarPago from "../../../hooks/payments/useConfirmPayment";

const ConfirmarPagoScreen = () => {
  const {
    tutorialData,
    paymentMethod,
    setPaymentMethod,
    comprobanteUri,
    setComprobanteUri,
    transferNumber,
    setTransferNumber,
    showConfirmModal,
    setShowConfirmModal,
    coupons,
    userPoints,
    discountedAmount,
    applyCoupon,
    handleValidatePayment,
    handleConfirmPayment,
    loading,
  } = useConfirmarPago();

  return (
    <SafeAreaView className="flex-1 bg-[#023047]" edges={["bottom", "left", "right"]}>
      <HeaderScreens title={"Confirmar Pago"} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View className="p-2 mt-2">
            <PaymentInfo
              nombre={tutorialData.Nombre_Profesor}
              materia={tutorialData.Nombre_Curso}
              modalidad={tutorialData.modalidad}
              monto={`₡ ${discountedAmount.toFixed(2)}`}
              fecha={tutorialData.fecha.split("T")[0].split("-").reverse().join("/")}
              hora={`${tutorialData.hora_inicio} - ${tutorialData.hora_fin}`}
              telefono={tutorialData.telefono}
            />
            <CouponInput
              onApplyCoupon={(couponCode) => applyCoupon(couponCode, coupons, userPoints)}
            />
            <View className="flex-row justify-between mt-1 mb-5 mx-2">
              <TouchableOpacity
                className={`flex-1 py-3 mr-2 rounded-lg ${paymentMethod === "efectivo" ? "bg-[#FB8500]" : "bg-[#2379A1] opacity-70"
                  }`}
                onPress={() => setPaymentMethod("efectivo")}
              >
                <Text className="text-white text-center font-medium">En Efectivo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 ml-2 rounded-lg ${paymentMethod === "transferencia" ? "bg-[#FB8500]" : "bg-[#2379A1] opacity-70"
                  }`}
                onPress={() => setPaymentMethod("transferencia")}
              >
                <Text className="text-white text-center font-medium">Transferencia</Text>
              </TouchableOpacity>
            </View>
            {paymentMethod === "efectivo" ? (
              <View className="bg-[#0B4D6D] rounded-lg p-4 mx-2 mb-5">
                <Text className="text-white text-center text-lg font-bold mb-2">Monto a pagar</Text>
                <Text className="text-white text-center text-2xl ">₡ {discountedAmount.toFixed(2)}</Text>
                <Text className="text-white text-center mt-2 text-xs">
                  El pago en efectivo se realizará directamente al tutor durante la sesión
                </Text>
              </View>
            ) : (
              paymentMethod === "transferencia" && (
                <>
                  <TransferenciaInfo onTransferNumberChange={setTransferNumber} />
                  <UploadComprobante
                    comprobante={comprobanteUri}
                    onPickImage={(uri) => setComprobanteUri(uri)}
                    onChangeImage={() => setComprobanteUri(null)}
                  />
                </>
              )
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <TouchableOpacity
          className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
          onPress={() => {
            if (handleValidatePayment()) {
              setShowConfirmModal(true);
            }
          }}
          disabled={loading || tutorialData.estado === "en revision"}
          style={tutorialData.estado?.toLowerCase() === "en revision" ? { opacity: 0.5 } : {}}
        >
          <Text className="text-white font-bold text-lg ml-2">Pagar</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/80">
          <View className="bg-[#023047] w-11/12 rounded-xl p-4 shadow-lg">
            <Text className="text-white text-xl font-bold text-center mb-4">
              ¿Realmente deseas confirmar el pago?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-[#2D81AD] py-3 px-6 rounded-lg w-5/12"
                onPress={() => setShowConfirmModal(false)}
              >
                <Text className="text-white text-center font-medium">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#FB8500] py-3 px-6 rounded-lg w-5/12"
                onPress={() => handleConfirmPayment(setShowConfirmModal)}
                disabled={loading}
              >
                <Text className="text-white text-center font-medium">Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ToastComponent />
    </SafeAreaView>
  );
};

export default ConfirmarPagoScreen;