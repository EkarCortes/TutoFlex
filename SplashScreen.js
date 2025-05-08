import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export default function SplashScreenComponent({ onReady }) {
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Simular carga de datos (puedes hacer una petición aquí)
        setTimeout(() => {
          onReady(); // Llamar cuando la app esté lista
        }, 2000);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gestor de Tareas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC0CB",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});
