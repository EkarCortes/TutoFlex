import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InputField from './InputField';

interface CouponInputProps {
  onApplyCoupon: (couponCode: string) => void;
}

const CouponInput: React.FC<CouponInputProps> = ({ onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  return (
    <View className="bg-[#0d6a97] rounded-2xl p-3 mb-5">
      <View>
        <Text className="text-lg text-white mb-3" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
          Ingresar Cupón
        </Text>
        <View className="flex-row items-center">
          <View className="w-9/12">
            <InputField
              icon="local-offer"
              value={couponCode}
              onChangeText={setCouponCode}
              placeholder="Código del cupón"
              keyboardType="default"
            />
          </View>
          <TouchableOpacity
            className="bg-[#FB8501] rounded-xl px-4 py-2 ml-2"
            onPress={() => onApplyCoupon(couponCode)}
          >
            <Text className="text-white text-base" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
              Aplicar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CouponInput;