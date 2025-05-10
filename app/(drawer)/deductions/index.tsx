import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import ButtonBotton from '../../../components/ButtonBottom';
import InvoicesCard from '../../../components/InvoicesCard';
import RoundedHeader from '../../../components/HeaderScreens';
import DeductionsPaidList from '../../../components/DeductionsPaidList';
import useTotalFee from '../../../hooks/deductions/useTotalFee';
import useAllDeductionsPaid from '../../../hooks/deductions/useAllDeductionsPaid';


const Index = () => {
  const [showAll, setShowAll] = useState(false);
  const { feeTotal } = useTotalFee();
  const { deductionsPaid, loading, error, refresh } = useAllDeductionsPaid();

  const handleConfirm = () => {
    router.push('../../(drawer)/deductions/_confirmPaymentsTeacher');
  };

  return (
    <View className="flex-1 bg-[#023046]">
      <RoundedHeader title={'Deducciones'} />

      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
      >
        {/* Deducciones Pendientes */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-white text-center mb-3">
            Deducciones Pendientes
          </Text>

          <View className="bg-[#0d6a97] p-5 rounded-2xl shadow">
            <InvoicesCard />

            <View className="mt-6 items-center">
              <ButtonBotton
                title="Pagar"
                onPress={handleConfirm}
                style={{ width: '40%' }}
              />
            </View>
          </View>
        </View>

        {/* Historial de Deducciones */}
        <Text className="text-xl font-bold text-white text-center mb-3">
          Historial de Deducciones
        </Text>

        <View className="bg-white rounded-xl overflow-hidden">
          <DeductionsPaidList 
            data={deductionsPaid} 
            showAll={showAll}
            loading={loading}
            error={error}
            refresh={refresh}
          />
        </View>

        {deductionsPaid?.length > 3 && (
          <View className="mt-4 items-center">
            <ButtonBotton
              title={showAll ? 'Ver menos' : 'Ver más'}
              onPress={() => setShowAll(!showAll)}
              style={{ width: '40%' }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;