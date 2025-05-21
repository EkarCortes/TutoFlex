import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import PaymentInfoTeacher from '../../../components/PaymentInfoTeacher';
import TransferenciaInfo from '../../../components/TransferenciaInfo';
import UploadComprobante from '../../../components/UploadComprobante';
import RoundedHeader from '../../../components/HeaderScreens';
import ToastComponent from '../../../components/Toast';
import useTotalFee from '../../../hooks/deductions/useTotalFee';
import useDeductionsPaymentHandler from '../../../hooks/deductions/useDeductionsPaymentHandler';
import '../../../global.css';

const ConfirmarPagoScreen = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);
  const [transferNumber, setTransferNumber] = useState<string>("");

  const { feeTotal, deductions, loading: loadingFee } = useTotalFee();

  const deduccionIds = deductions.map(d => Number(d.deduccion_id));

  const { handleValidatePayment, handleConfirmPayment, loading: loadingPago } = useDeductionsPaymentHandler({
    transferNumber,
    comprobanteUri,
    deductions,
    router,
  });


  const fechaActual = new Date().toLocaleDateString("es-ES");
  const monto = `₡ ${feeTotal.toFixed(2)}`;

  const ConfirmarPago = async () => {
    if (!handleValidatePayment()) return;
    await handleConfirmPayment(setShowConfirmModal);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={['left', 'right', 'bottom']}>
      <RoundedHeader title={'Confirmar Pago'} />

      <ScrollView contentContainerStyle={{ padding: 8 }}>

        <PaymentInfoTeacher
          nombre="Tutoflex"
          email="Tutoflex@gmail.com"
          telefono="8888-8888"
          monto={monto}
          fecha={fechaActual}
        />

        <TransferenciaInfo onTransferNumberChange={setTransferNumber} />
        <UploadComprobante
          comprobante={comprobanteUri}
          onPickImage={(uri) => setComprobanteUri(uri)}
          onChangeImage={() => setComprobanteUri(null)}
        />


      </ScrollView>

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
                onPress={ConfirmarPago}
                disabled={loadingPago}
              >
                <Text className="text-white text-center font-medium">
                  {loadingPago ? 'Pagando...' : 'Confirmar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <View className="">
          <TouchableOpacity
            className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
            onPress={() => setShowConfirmModal(true)}
          >
            <Text className="text-white font-bold text-lg ml-2">
              Pagar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ToastComponent />
    </SafeAreaView>
  );
};

export default ConfirmarPagoScreen;
