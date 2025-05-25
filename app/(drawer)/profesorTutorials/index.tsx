import TutorialItem from "@/components/TutorialItem";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreens from "../../../components/HeaderScreens";
import LoadingScreen from "../../../components/LoadingScreen";
import ToastComponent from "../../../components/Toast";
import { usePendingTutorials } from "../../../hooks/usePendingTutorials";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";

export default function TutoriasPendientesScreen() {
  const { tutorials, loading, error, refreshTutorials } = usePendingTutorials();
  const navigation = useNavigation();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);

  const handleOpenCancelModal = (tutorial: any) => {
    setSelectedTutorial(tutorial);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    setSelectedTutorial(null);
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
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item }) => (
                <TutorialItem
                  nombre={item.estudiante}
                  curso={item.curso}
                  monto={item.monto}
                  fecha={item.fecha_tutoria}
                  estado={item.modalidad}
                  telefono_estudiante={item.telefono_estudiante}
                  onPress={() => navigation.navigate("_tutorialDetails", { tutorial: item })}
                  onCancel={() => handleOpenCancelModal(item)}
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
            {selectedTutorial && (
              <Text className="text-white text-center mb-4">
                {selectedTutorial.estudiante} - {selectedTutorial.curso}
              </Text>
            )}
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