import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { usePaymentCoupon } from '../hooks/payments/useDropdownCoupon';
import CustomDropdown from './CustomDropdown';
import { MaterialIcons } from '@expo/vector-icons';

interface CouponInputProps {
  onApplyCoupon: (couponCode: string | null) => void;
}

const CouponInput: React.FC<CouponInputProps> = ({ onApplyCoupon }) => {
  const {
    coupons,
    selectedCoupon,
    setSelectedCoupon,
    loading,
  } = usePaymentCoupon();

  const dropdownData = [
    { label: 'Sin cupón', value: '' },
    ...coupons.map(c => ({
      label: `${c.codigo} (${c.descuento}% off)`,
      value: c.codigo,
    })),
  ];

  const handleApply = () => {
    onApplyCoupon(selectedCoupon || null);
  };

  return (
    <View className="bg-[#085276] rounded-2xl p-4 mb-5">
      <View className="flex-row items-center mb-3">
        <MaterialIcons name="local-offer" size={24} color="#FEB602" />
        <Text className="text-lg text-white ml-2" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
          Selecciona un cupón
        </Text>
      </View>
      <View className="flex-row items-center">
        <View className="flex-1 mr-3">
          <CustomDropdown
            data={dropdownData}
            value={selectedCoupon}
            onChange={setSelectedCoupon}
            placeholder="Elige un cupón"
            iconName=""
          />
        </View>
        <TouchableOpacity
          className="bg-[#FB8501] rounded-xl px-4 py-2"
          onPress={handleApply}
        >
          <Text className="text-white text-base" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
            Aplicar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CouponInput;