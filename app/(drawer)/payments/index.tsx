import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreens from "../../../components/HeaderScreens";
import LoadingScreen from "../../../components/LoadingScreen";
import PagoItem from "../../../components/PagoItem";
import ToastComponent from "../../../components/Toast";
import usePendingPaymentsScreen from "../../../hooks/payments/usePendingPaymentsScreen";

export default function PagosPendientesScreen() {
  const {
    tutorials,
    loading,
    error,
    refreshTutorials,
    showCancelModal,
    setShowCancelModal,
    selectedTutoriaId,
    setSelectedTutoriaId,
    confirmCancel,
    navigateToConfirmPayment,
  } = usePendingPaymentsScreen();

  const [filtro, setFiltro] = useState<"pendiente" | "en revision">("pendiente");

  // Filtrar las tutorías según el filtro seleccionado
  const tutorialsFiltrados = tutorials.filter(t =>
    filtro === "en revision"
      ? t.estado?.toLowerCase() === "en revision"
      : t.estado?.toLowerCase() === "pendiente"
  );

  // Función para alternar el filtro
  const toggleFiltro = () => {
    setFiltro(filtro === "pendiente" ? "en revision" : "pendiente");
  };

  useRefreshOnFocus(refreshTutorials);

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={["left", "right", "bottom"]}>
      <HeaderScreens title={"Pagos Pendientes"} />

      {loading ? (
        <View className="flex-1">
          <LoadingScreen
            message=""
            fullScreen={true}
            backgroundColor="#023047"
            indicatorColor="#FB8500"
            textColor="white"
            indicatorSize="large"
          />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-white text-lg text-center mb-4">Error al cargar los pagos pendientes</Text>
          <Text className="text-white opacity-70 text-center mb-6">{error}</Text>
          <TouchableOpacity
            className="bg-[#FB8500] py-3 px-6 rounded-lg"
            onPress={refreshTutorials}
          >
            <Text className="text-white font-semibold">Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="pb-2 pr-3 pl-3  flex-1">
          {tutorialsFiltrados.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-lg mb-2">No tienes pagos pendientes</Text>
              <Text className="text-white opacity-70 text-center mb-6">
                Cuando tengas pagos pendientes, aparecerán aquí.
              </Text>
            </View>
          ) : (
            <FlatList
              data={tutorialsFiltrados}
              refreshing={loading}
              onRefresh={refreshTutorials}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.pago_id.toString()}
              renderItem={({ item }) => (
                <PagoItem
                  nombre={item.Nombre_Profesor}
                  telefono={item.whatsapp}
                  materia={item.nombre}
                  monto={`₡ ${item.monto}`}
                  fecha={`${item.fecha_tutoria.split("T")[0].split("-").reverse().join("/")}`}
                  estado={item.estado}
                  onPress={() =>
                    navigateToConfirmPayment({
                      pago_id: item.pago_id,
                      tutoria_id: item.tutoria_id,
                      profesor_id: item.profesor_id,
                      Nombre_Profesor: item.Nombre_Profesor,
                      Nombre_Curso: item.nombre,
                      modalidad: item.modalidad,
                      fecha: item.fecha_tutoria,
                      hora_inicio: item.hora_inicio_tutoria,
                      hora_fin: item.hora_fin_tutoria,
                      monto_total: item.monto,
                      telefono: item.whatsapp,
                    })
                  }
                  onCancel={() => {
                    setSelectedTutoriaId(item.tutoria_id);
                    setShowCancelModal(true);
                  }}
                />
              )}
              contentContainerStyle={{ padding: 3, paddingBottom: 5 }}
            />
          )}
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCancelModal}
        hardwareAccelerated={true}
        statusBarTranslucent={true}
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/80">
          <View className="bg-[#023047] w-11/12 rounded-xl p-4 shadow-lg">
            <Text className="text-white text-xl font-bold text-center mb-4">
              ¿Estás seguro de que deseas cancelar esta tutoría?
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-[#2D81AD] py-3 px-6 rounded-lg w-5/12"
                onPress={() => setShowCancelModal(false)}
              >
                <Text className="text-white text-center font-medium">No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#FB8500] py-3 px-6 rounded-lg w-5/12"
                onPress={confirmCancel}
              >
                <Text className="text-white text-center font-medium">Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* FAB para filtro */}
      <View
        style={{
          position: "absolute",
          bottom: 32,
          right: 24,
          alignItems: "center",
        }}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          onPress={toggleFiltro}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#096491",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 32,
            width: 56,
            height: 56,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Ionicons
            name={filtro === "pendiente" ? "time-outline" : "eye-outline"}
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={{ color: "#fff", marginTop: 6, fontSize: 13, opacity: 0.8 }}>
          {filtro === "pendiente" ? "Pendiente" : "Revisión"}
        </Text>
      </View>

      <ToastComponent />
    </SafeAreaView>
  );
}