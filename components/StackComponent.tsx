import {  Platform } from "react-native";
import { Stack } from "expo-router";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";

// Usar el mismo color en toda la app
const BG_COLOR = "#023047";

const Layout = () => {
  return (
    <ScreenWrapper backgroundColor={BG_COLOR}>
    
        <Stack 
          screenOptions={{ 
            headerShown: false,
                  ...(Platform.OS === "android" && {
                    contentStyle: { backgroundColor: BG_COLOR },
                    presentation: "transparentModal", 
                  }),
          
            detachPreviousScreen: false,
            freezeOnBlur: true,
            cardStyle: { backgroundColor: BG_COLOR },
            animationTypeForReplace: "pop", 
            gestureEnabled: false,
          }} 
        />
    </ScreenWrapper>
  );
};

export default Layout;