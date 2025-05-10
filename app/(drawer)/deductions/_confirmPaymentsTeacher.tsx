

import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import PaymentInfoTeacher from '../../../components/PaymentInfoTeacher';
import TransferenciaInfo from '../../../components/TransferenciaInfo';
import UploadComprobante from '../../../components/UploadComprobante';
import '../../../global.css';
import RoundedHeader from '../../../components/HeaderScreens';
import ButtonBotton from '../../../components/ButtonBottom';
import ToastComponent from '../../../components/Toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import useGetProfesorProfile from '../../../hooks/profesorProfile/useGetProfesorProfile';
import useTotalFee from '../../../hooks/useTotalFee';
import useDeductionsPaymentHandler from '../../../hooks/useDeductionsPaymentHandler';



const ConfirmarPagoScreen = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);
  const [transferNumber, setTransferNumber] = useState<string>("");

  const { profile, loading, error } = useGetProfesorProfile();
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

      <ScrollView contentContainerStyle={{ padding: 8 }} className="mt-5">
        {loading || loadingFee ? (
          <ActivityIndicator size="large" color="#FEB602" />
        ) : error ? (
          <Text className="text-white text-center mb-4">{error}</Text>
        ) : profile ? (
          <PaymentInfoTeacher
            nombre={profile.nombre}
            email={profile.email}
            telefono={profile.whatsapp}
            monto={monto}
            fecha={fechaActual}
          />
        ) : null}

        <TransferenciaInfo onTransferNumberChange={setTransferNumber} />
        <UploadComprobante
          comprobante={comprobanteUri}
          onPickImage={(uri) => setComprobanteUri(uri)}
          onChangeImage={() => setComprobanteUri(null)}
        />

        <View className="items-center mb-6">
          <ButtonBotton
            title="Pagar"
            onPress={() => setShowConfirmModal(true)}
            style={{ width: '40%'}}
            disabled={loadingPago}
          />
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
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

      <ToastComponent />
    </SafeAreaView>
  );
};

export default ConfirmarPagoScreen;
