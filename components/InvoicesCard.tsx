import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTotalFee from '../hooks/deductions/useTotalFee';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';

const DeductionsCard = () => {
  const { deductions, loading, error, refresh} = useTotalFee();

    useRefreshOnFocus(refresh);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-red-500 text-center">Error: {error}</Text>
      </View>
    );
  }

  if (!deductions || deductions.length === 0) {
    return (
      <View className="bg-[#2379A1] p-6 rounded-xl mb-3">
        <Text className="text-white text-base text-center">
          No tienes deducciones pendientes.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      {deductions.map((item) => (
        <View
          key={item.numero_factura}
          className="rounded-xl shadow-md my-2 overflow-hidden border border-[#1A6386]"
          style={{ backgroundColor: "#086490" }}
        >
 
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold text-white">
                Factura #{item.numero_factura}
              </Text>
            </View>
            <View className="bg-[#0B4D6D] p-3 rounded-xl mb-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-[#fff] text-sm">Monto Original:</Text>
                <Text className="font-bold text-white">
                  ₡{parseFloat(item.monto_original).toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-[#fff] text-sm">Monto Deducción:</Text>
                <Text className="font-bold text-white">
                  ₡{parseFloat(item.monto_deduccion).toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between mb-1">
                <Text className="text-[#fff] text-sm">Monto Neto:</Text>
                <Text className="font-bold text-white">
                  ₡{parseFloat(item.monto_neto).toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-[#fff] text-sm">Fecha:</Text>
                <Text className="font-bold text-white">
                  {item.fecha_deduccion?.substring(0, 10)}
                </Text>
              </View>
            </View>
           
          </View>
        </View>
      ))}
    </View>
  );
};

export default DeductionsCard;