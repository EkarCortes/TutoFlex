import React from "react";
import HeaderScreens from "../../../components/HeaderScreens";
import CardCreateCoupon from '../../../components/CardCreateCoupon';
import { SafeAreaView } from "react-native-safe-area-context";
import ToastComponent from "../../../components/Toast";

const CrearCuponScreen = () => {
  

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={[ 'left', 'right', 'bottom']}>

      <HeaderScreens title="Nuevo Cupón" />
      <CardCreateCoupon />
      <ToastComponent />
    </SafeAreaView>
  );
};

export default CrearCuponScreen;
