import React from "react";
import HeaderScreens from '../../../components/HeaderScreens';
import { SafeAreaView } from "react-native-safe-area-context";
import Points from "../../../components/Points";



const MyPoints = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={['left', 'right', 'bottom']}>
      <HeaderScreens title="Mis Puntos" />
      <Points></Points>
    </SafeAreaView>
  );
};

export default MyPoints;
