import React from 'react';
import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  backgroundColor?: string;
  indicatorColor?: string;
  textColor?: string; 
indicatorSize?: "small" | "large" ;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Cargando...",
  fullScreen = true,
  backgroundColor = "#023047",
  indicatorColor = "#FB8500",
  textColor = "white",
  indicatorSize = "large"
}) => {
  const Container = fullScreen ? SafeAreaView : View;
  
  return (
    <Container className={`${fullScreen ? 'flex-1' : ''} justify-center items-center`} 
      style={{ backgroundColor }}>
      <View className="items-center">
        <ActivityIndicator size={indicatorSize} color={indicatorColor} />
        {message && (
          <Text className="mt-4 text-center text-lg font-medium" 
            style={{ color: textColor, fontFamily: "SpaceGrotesk-Medium" }}>
            {message}
          </Text>
        )}
      </View>
    </Container>
  );
};

export default LoadingScreen;