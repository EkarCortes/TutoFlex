import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreens from '../../components/HeaderScreens';
import Ranking from "../../components/Ranking";



const ListaCuponesScreen = () => {
  return (
      <SafeAreaView className="flex-1 bg-[#023046]" edges={[ 'left', 'right', 'bottom']}>
      <HeaderScreens title="Ranking de Puntos" />
      <Ranking />
    </SafeAreaView>
  );
};

export default ListaCuponesScreen;
