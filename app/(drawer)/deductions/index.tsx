import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import RoundedHeader from '../../../components/HeaderScreens';
import InvoicesCard from '../../../components/InvoicesCard';
import useTotalFee from '../../../hooks/deductions/useTotalFee';

const Index = () => {
  const { feeTotal, deductions, refresh } = useTotalFee();
  const insets = useSafeAreaInsets();

  const handleConfirm = () => {
    router.push('../../(drawer)/deductions/_confirmPaymentsTeacher');
  };

  const goToHistory = () => {
    router.push('../../(drawer)/deductions/history');
  };

  useRefreshOnFocus(refresh);

  // Desactivar el botón si no hay deducciones pendientes o feeTotal es 0
  const isPayDisabled = !deductions || deductions.length === 0 || Number(feeTotal) === 0;

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-[#023046] to-[#045a8d]" edges={['left', 'right', 'bottom']}>
      <RoundedHeader title={'Deducciones'} />
      <ScrollView
        contentContainerStyle={{ padding: 12, gap: 24, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="rounded-2xl shadow-lg overflow-hidden"
          style={{ backgroundColor: "#0B4D6D" }}
        >
          <View style={{ height: 4, backgroundColor: "#FB8500" }} />
          <View className="p-6">
            <Text className="text-2xl font-bold text-white mb-2 text-center">
              Resumen de Deducciones
            </Text>
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg text-white">Total pendiente:</Text>
              <Text className="text-2xl font-bold text-[#FB8500]">₡{feeTotal ?? '0.00'}</Text>
            </View>
            <InvoicesCard />
          </View>
        </View>
      </ScrollView>
      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30" style={{ paddingBottom: insets.bottom }}>
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={goToHistory}
            className="bg-[#1A6386] rounded-xl py-3 px-6 w-[48%] items-center"
          >
            <Text className="text-white font-semibold">Ver Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirm}
            className="bg-[#FB8500] rounded-xl py-3 px-6 w-[48%] items-center"
            disabled={isPayDisabled}
            style={{
              opacity: isPayDisabled ? 0.5 : 1,
            }}
          >
            <Text className="text-white font-semibold">Pagar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;