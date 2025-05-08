import React from "react";
import HeaderScreens from '../../../components/HeaderScreens';
import ListOfCoupons from "../../../components/ListOfCoupons";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastComponent from "../../../components/Toast";



const ListaCuponesScreen = () => {
  return (
      <SafeAreaView className="flex-1 bg-[#023046]" edges={[ 'left', 'right', 'bottom']}>
      <HeaderScreens title="Lista de Cupones" />
      <ListOfCoupons />
           <ToastComponent />
    </SafeAreaView>
  );
};

export default ListaCuponesScreen;
