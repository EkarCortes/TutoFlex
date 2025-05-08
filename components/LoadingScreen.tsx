import React from 'react';
import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoadingScreenProps {
  /**
   * Custom message to display during loading
   */
  message?: string;
  
  /**
   * Whether to make the loading screen fullscreen or not
   */
  fullScreen?: boolean;
  
  /**
   * Custom background color
   */
  backgroundColor?: string;
  
  /**
   * Custom loading indicator color
   */
  indicatorColor?: string;
  
  /**
   * Custom text color
   */
  textColor?: string;
  
  /**
   * Size of the activity indicator
   */
  indicatorSize?: "small" | "large";
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
      <View className="p-6 rounded-xl items-center">
        <StatusBar barStyle="light-content" translucent={true} />
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