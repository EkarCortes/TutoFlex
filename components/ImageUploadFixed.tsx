import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

interface ImageUploadProps {
  comprobante: string | null;
  onPickImage: (uri: string) => void;
  onChangeImage: () => void;
}

const ImageUploadFixed: React.FC<ImageUploadProps> = ({ comprobante, onPickImage, onChangeImage }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['Images'], // ✅ USO RECOMENDADO AHORA
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onPickImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 justify-center items-center"
    >
      {comprobante ? (
        <View className="w-full h-48 rounded-2xl overflow-hidden">
          <Image
            source={{ uri: comprobante }}
            className="w-full h-full object-cover"
          />
          <TouchableOpacity
            onPress={onChangeImage}
            className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-full"
          >
            <Text className="text-white text-sm font-medium">Cambiar comprobante</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View className="w-16 h-16 rounded-full bg-gray-200 justify-center items-center">
            <Ionicons name="cloud-upload" size={32} color="#6B7280" />
          </View>
          <Text className="text-lg font-semibold text-gray-800">
            Subir comprobante
          </Text>
          <Text className="text-sm text-gray-500">
            Toca aquí para seleccionar una imagen
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default ImageUploadFixed;
