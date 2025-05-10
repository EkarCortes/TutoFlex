import React from "react";
import { ActivityIndicator, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
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

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={["left", "right", "bottom"]}>
      <HeaderScreens title={"Pagos Pendientes"} />

      {loading ? (
        <View className="flex-1">
          <ActivityIndicator
            size="large"
            color="#FB8500"
            className="flex-1 justify-center items-center"
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
        <View className="pb-2 pr-3 pl-3 pt-3 flex-1">
          {tutorials.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-lg mb-2">No tienes pagos pendientes</Text>
              <Text className="text-white opacity-70 text-center mb-6">
                Cuando tengas pagos pendientes, aparecerán aquí.
              </Text>
            </View>
          ) : (
            <FlatList
              data={tutorials}
              refreshing={loading}
              onRefresh={refreshTutorials}
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

      <ToastComponent />
    </SafeAreaView>
  );
}