import React, { useCallback } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../components/StatusBarComponent";
import HeaderScreens from "../../../components/HeaderScreens";
import ToastComponent from "../../../components/Toast";
import LoadingScreen from "../../../components/LoadingScreen";
import useFinalizedTutorialsScreen from "../../../hooks/qualifications/useFinalizedTutorials";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import ReviewCard from "@/components/ReviewCard";

const FinalizedTutorialsScreen = () => {
  const {
    tutorials,
    loading,
    error,
    refreshTutorials,
    selectedTutoria,
    openReviewModal,
    closeReviewModal,
    formatDate,
    formatTime,
    handleReview,
  } = useFinalizedTutorialsScreen();

  useRefreshOnFocus(refreshTutorials);

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={["left", "right", "bottom"]}>
      <StatusBarComponent />
      <HeaderScreens title="Tutorías Finalizadas" />
      {loading ? (
        <View className="flex-1">
          <LoadingScreen
            fullScreen={true}
            message=""
            backgroundColor="transparent"
            indicatorColor="#FB8400"
          />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-white text-lg text-center mb-4">Error al cargar las tutorías</Text>
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
              <Text className="text-white text-lg mb-2">No tienes tutorías finalizadas</Text>
              <Text className="text-white opacity-70 text-center mb-6">
                Cuando completes una tutoría, podrás dejar tu reseña aquí
              </Text>
            </View>
          ) : (
            <FlatList
              data={tutorials}
              keyExtractor={(item) => item.tutoria_id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              refreshing={loading}
              onRefresh={refreshTutorials}
              renderItem={({ item }) => (
                <ReviewCard
                  item={item}
                  formatDate={formatDate}
                  formatTime={formatTime}
                  openReviewModal={openReviewModal}
                />
              )}
            />
          )}
        </View>
      )}

      <ToastComponent />
      <Modal visible={!!selectedTutoria} 
       transparent 
       animationType="fade"
        hardwareAccelerated
        statusBarTranslucent
       >
        <View className="flex-1 justify-center items-center bg-black/80">
        
          <View className="bg-[#023047] p-6 rounded-lg w-80 shadow-lg">
            {selectedTutoria && (
              <>
                <Image
                  source={{ uri: selectedTutoria.foto_profesor || "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg" }}
                  className=" rounded-full self-center mb-4"
                  style={{ width:80, height: 80,  borderWidth: 2, borderColor: '#FB8400' }}
                />
                <Text className="text-white text-xl font-bold text-center">{selectedTutoria.nombre_profesor}</Text>
                <Text className="text-white text-center mb-2">{selectedTutoria.nombre_tutoria}</Text>
              </>
            )}
            <Text className="text-white text-lg font-bold text-center">¿Desea reseñar la tutoría?</Text>
            <View className="flex-row justify-center mt-4">
              <TouchableOpacity
                className="bg-gray-500 py-2 px-4 rounded-lg mr-2 p-2"
                onPress={closeReviewModal}
              >
                <Text className="text-white text-center">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#FB8500] py-2 px-4 rounded-lg w-1/3"
                onPress={handleReview}
              >
                <Text className="text-white text-center">Sí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FinalizedTutorialsScreen;