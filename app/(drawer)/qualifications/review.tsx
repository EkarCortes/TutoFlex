import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../components/StatusBarComponent";
import HeaderScreens from "../../../components/HeaderScreens";
import ToastComponent from "../../../components/Toast";
import { useReviewTutorialScreen } from "../../../hooks/qualifications/useReviewTutorialScreen";

const ReviewTutorialScreen = () => {
  const {
    params: { profesor, curso, foto_profesor },
    review,
    setReview,
    rating,
    setRating,
    submitting,
    submitReview,
  } = useReviewTutorialScreen();

  return (
    <SafeAreaView className="flex-1 bg-[#023046]" edges={['left', 'right', 'bottom']}>
      <StatusBarComponent />
      <HeaderScreens title="Reseñar Tutoría" />
      
      <ScrollView className="flex-1 px-5">
        <View className="bg-[#0d6a97] rounded-2xl p-4 my-4 flex-row items-center">
            <Image
            source={{ uri:foto_profesor || "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg" }}
            className="h-14 w-14 rounded-full mr-3"
            style={{ backgroundColor: "#FB8500" }}
            />
          <View className="flex-1">
            <Text className="text-white text-lg font-bold">{curso}</Text>
            <Text className="text-white opacity-80">Tutor: {profesor}</Text>
          </View>
        </View>

        <View className="items-center my-4">
          <Text className="text-white text-lg font-bold mb-2">¿Cómo calificarías esta tutoría?</Text>
          <View className="flex-row justify-center my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => setRating(star)}
                className="px-2"
              >
                <Text className={`text-5xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-white text-sm">
            {rating === 0 ? "Selecciona una calificación" : 
             rating === 1 ? "Muy mala" :
             rating === 2 ? "Mala" :
             rating === 3 ? "Regular" :
             rating === 4 ? "Buena" : "Excelente"}
          </Text>
        </View>

        <View className="bg-[#0d6a97] rounded-2xl p-5 mb-6 shadow-lg">
          <Text className="text-white text-lg font-bold mb-2">
            <MaterialIcons name="rate-review" size={20} color="white" /> Escribe tu reseña:
          </Text>
          
          <TextInput
            className="bg-white text-black p-4 rounded-xl h-32 text-base"
            multiline
            value={review}
            onChangeText={setReview}
            placeholder="Describe tu experiencia con esta tutoría..."
            textAlignVertical="top"
            style={{ elevation: 1 }}
          />
          
          <View className="border-t border-[#4194C4] my-4"></View>
          
          <Text className="text-white text-sm mb-2 opacity-80">
            Tu reseña ayudará a otros estudiantes a elegir mejor sus tutorías.
          </Text>
        </View>
      </ScrollView>
     
     <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <View className="">
          <TouchableOpacity
            className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
            onPress={submitReview}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-bold text-lg ml-2">Enviar Reseña</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <ToastComponent />
    </SafeAreaView>
  );
};

export default ReviewTutorialScreen;