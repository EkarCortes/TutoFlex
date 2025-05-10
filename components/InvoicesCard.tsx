import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import useTotalFee from '../hooks/deductions/useTotalFee';

const DeductionsCard = () => {
  const { deductions, loading, error } = useTotalFee();

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

  if (deductions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-white text-base text-center">
          No tienes deducciones pendientes.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={deductions}
        keyExtractor={(item) => item.numero_factura.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="bg-[#e5f3f9] p-4 rounded-2xl mb-4 shadow-sm">
            <Text className="font-bold text-[#023046] text-lg mb-1">
              Factura #{item.numero_factura}
            </Text>
            <View className="space-y-1">
              <Text className="text-[#023046]">Monto Original: ₡{parseFloat(item.monto_original).toFixed(2)}</Text>
              <Text className="text-[#023046]">Monto Deducción: ₡{parseFloat(item.monto_deduccion).toFixed(2)}</Text>
              <Text className="text-[#023046]">Monto Neto: ₡{parseFloat(item.monto_neto).toFixed(2)}</Text>
              <Text className="text-[#023046]">Fecha: {item.fecha_deduccion.substring(0, 10)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DeductionsCard;