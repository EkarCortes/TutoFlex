import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ReviewCardProps {
    item: {
        foto_profesor?: string;
        nombre_profesor: string;
        nombre_tutoria: string;
        fecha: string;
        hora_inicio: string;
        hora_fin: string;
    };
    formatDate: (date: string) => string;
    formatTime: (time: string) => string;
    openReviewModal: (item: any) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ item, formatDate, formatTime, openReviewModal }) => {
    return (
        <View
            className="rounded-xl shadow-md my-3 overflow-hidden"
            style={{ backgroundColor: "#0B4D6D" }}
        >
            <View style={{ height: 4, backgroundColor: "#FB8500" }} />
            <View className="p-4">
                <View className="flex-row items-center mb-3">
                    <Image
                        source={{ uri: item.foto_profesor || "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                        style={{ width:60, height: 60, borderRadius: 35, borderWidth: 2, borderColor: '#FB8400' }}
                    />
                    <View className="ml-4 flex-1">
                        <Text className="text-xl font-bold text-white">{item.nombre_profesor}</Text>
                        <Text className="text-white opacity-80">{item.nombre_tutoria}</Text>
                    </View>
                </View>

                <View className="bg-[#2379A1] p-3 rounded-xl mb-3">
                    <View className="flex-row justify-between mb-1">
                        <Text className="text-[#fff] text-sm">Materia:</Text>
                        <Text className="font-bold text-white">{item.nombre_tutoria}</Text>
                    </View>
                    <View className="flex-row justify-between mb-1">
                        <Text className="text-[#fff] text-sm">Fecha:</Text>
                        <Text className="font-bold text-white">{formatDate(item.fecha)}</Text>
                    </View>
                    <View className="flex-row justify-between mb-1">
                        <Text className="text-[#fff] text-sm">Horario:</Text>
                        <Text className="font-bold text-white">
                            {formatTime(item.hora_inicio)} - {formatTime(item.hora_fin)}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    className="bg-[#FB8500] py-2.5 rounded-lg flex-row justify-center items-center"
                    onPress={() => openReviewModal(item)}
                >
                    <MaterialIcons  name="rate-review" size={18} color="white" />
                    <Text className="text-white font-semibold ml-2">Escribir Reseña</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ReviewCard;