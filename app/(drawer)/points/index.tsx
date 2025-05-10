import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreens from '../../../components/HeaderScreens';
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
