import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import CardDetailsPayments from '../../../components/CardDetailsPayments';
import HeaderScreens from '../../../components/HeaderScreens';

const _detailsPayments = () => {
  return (
    
    <SafeAreaView className="flex-1 overflow-scroll bg-[#023047]">
      <HeaderScreens title="Detalles de Pago" />
      <CardDetailsPayments />
    </SafeAreaView>
  )
}

export default _detailsPayments