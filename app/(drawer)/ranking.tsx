import React from "react";
import { View } from "react-native";
import HeaderScreens from '../../components/HeaderScreens';
import Ranking from "../../components/Ranking";
import { SafeAreaView } from "react-native-safe-area-context";



const ListaCuponesScreen = () => {
  return (
      <SafeAreaView className="flex-1 bg-[#023046]" edges={[ 'left', 'right', 'bottom']}>
      <HeaderScreens title="Ranking de Puntos" />
      <Ranking />
    </SafeAreaView>
  );
};

export default ListaCuponesScreen;
