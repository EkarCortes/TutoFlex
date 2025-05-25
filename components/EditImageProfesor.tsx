import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import useGetProfesorProfile from "../hooks/profesorProfile/useGetProfesorProfile";
import { useFocusEffect } from "expo-router";

interface ImageUploadProps {
    comprobante: string | null;
    onPickImage: (uri: string) => void;
    onChangeImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    comprobante,
    onPickImage,
}) => {
    const { profile, fetchProfile } = useGetProfesorProfile();

    useFocusEffect(
        useCallback(() => {
            fetchProfile();
        }, [])
    );

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            onPickImage(asset.uri);
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-[#023047]">
            <TouchableOpacity
                onPress={pickImage}
                className={`w-48 h-48 rounded-full justify-center items-center overflow-hidden border-2  border-[#FB8500] ${comprobante ? "bg-transparent" : "bg-gray-200"
                    }`}
            >
                <Image
                    source={{
                        uri: comprobante || profile?.foto || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    }}
                    className="w-full h-full rounded-full"
                />
            </TouchableOpacity>
        </View>
    );
};

export default ImageUpload;
