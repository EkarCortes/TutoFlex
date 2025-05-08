import { Slot, useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import { StatusBar, View } from "react-native";

// Componente protector para verificar autenticación en cambios de ruta
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // No hacer nada mientras se carga
    if (loading) return;

    // Primer segmento después del '/'
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Redirigir a login si no está autenticado y no está en el grupo auth
      router.push("/(auth)/loginScreen");
    } else if (isAuthenticated && inAuthGroup) {
      // Redirigir a home si está autenticado pero está en el grupo auth
      router.push("/(drawer)");
    }
  }, [isAuthenticated, segments, loading]);

  if (loading) {
    return <LoadingScreen message="Cargando..." />;
  }

  return <>{children}</>;
}

// Layout principal
export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={{ flex: 1, backgroundColor: "#023047" }}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="#023047"
          translucent={false} 
        />
        <AuthWrapper>
          <Slot />
        </AuthWrapper>
      </View>
    </AuthProvider>
  );
}
