import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import useTotalFee from "hooks/useTotalFee"; 

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const { feeTotal, loading } = useTotalFee(); 

  if (!visible) return null; 

  return (
    <View className="flex-1 justify-center items-center bg-black/80 absolute inset-0">
      <View className="bg-[#023047] w-11/12 max-w-md rounded-xl p-4 shadow-lg">
        <Text className="text-white text-lg font-bold text-center mb-4">
          Confirmar Pago
        </Text>

        <View className="bg-[#0B4D6C] rounded-lg p-4 mb-4">
          {loading ? (
            <ActivityIndicator size="large" color="#FB8500" />
          ) : (
            <>
              <Text className="text-white text-center text-base mb-1">
                Total a pagar por deducción del 2%:
              </Text>
              <Text className="text-white text-center text-xl font-semibold">
                ₡{feeTotal.toFixed(2)} 
              </Text>
            </>
          )}
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity
            className="bg-[#0B4D6C] py-3 px-6 rounded-lg w-5/12"
            onPress={onClose}
          >
            <Text className="text-white text-center font-medium">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#FB8500] py-3 px-6 rounded-lg w-5/12"
            onPress={onConfirm}
          >
            <Text className="text-white text-center font-medium">Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentModal;
