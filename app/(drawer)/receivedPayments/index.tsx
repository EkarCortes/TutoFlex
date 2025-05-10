import React from 'react'
import PaymentCard from '../../../components/PaymentCard';
import HeaderScreens from '../../../components/HeaderScreens';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={['left', 'right', 'bottom']}>
      <HeaderScreens title="Pagos Recibidos" />
      <PaymentCard></PaymentCard>
    </SafeAreaView>
  )
}

export default index
