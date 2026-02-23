import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  backgroundColor?: string;
  indicatorColor?: string;
  textColor?: string;
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
    <Container
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
        { backgroundColor },
      ]}
    >
      <View style={styles.content}>
        <ActivityIndicator size={indicatorSize} color={indicatorColor} />
        {message && (
          <Text
            style={[styles.message, { color: textColor, fontFamily: "SpaceGrotesk-Medium" }]}>
            {message}
          </Text>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  message: {
    marginTop: 16,
  },
});

export default LoadingScreen;
