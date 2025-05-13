import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import LoadingScreen from "./LoadingScreen";
import ToastComponent from "./Toast";
import useCardDetailsPayments from "../hooks/receivedPayment/useCardDetailsPayments";
import { formatTime } from '../hooks/receivedPayment/useCardDetailsPayments';

const CardDetailsPayments = () => {
    const {
        showConfirmModal,
        setShowConfirmModal,
        showConfirmModalRejection,
        setShowConfirmModalRejection,
        showComprobanteModal,
        setShowComprobanteModal,
        selectedPayment,
        loading,
        updating,
        managePaymentConfirmation,
        handlePaymentRejection,
    } = useCardDetailsPayments();



    if (loading) {
        return <LoadingScreen message="Cargando detalles del pago..." />;
    }

    if (!selectedPayment) {
        return (
            <View className="flex-1 justify-center items-center bg-[#023047]">
                <Text className="text-white text-lg">No se encontraron detalles del pago.</Text>
            </View>
        );
    }

    return (
        <>
            <View className="flex-1 bg-[#023047] items-center">
                <View className="bg-[#086490] rounded-xl p-4 mb-2 mt-1 w-[90%]">
                    <Text className="text-xl text-white mb-4" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                        Detalles de Pago de Tutoría:
                    </Text>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="account-circle" size={28} color="#FEB602" />
                        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                            Estudiante:{" "}
                            <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.estudiante_nombre}</Text>
                        </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="book" size={28} color="#FEB602" />
                        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                            Materia:{" "}
                            <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.nombre_curso}</Text>
                        </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="location-on" size={28} color="#FEB602" />
                        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                            Modalidad:{" "}
                            <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.modalidad}</Text>
                        </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="attach-money" size={28} color="#FEB602" />
                        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                            Monto:{" "}
                            <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.monto}</Text>
                        </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="calendar-month" size={28} color="#FEB602" />
                        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                            Fecha:{" "}
                            <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>
                                {(selectedPayment.fecha_tutoria.split("T")[0].split("-").reverse().join("/"))}
                            </Text>
                        </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="access-time" size={28} color="#FEB602" />
                        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                            Hora Inicio:{" "}
                            <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>
                                {formatTime(selectedPayment.hora_inicio_tutoria)}
                            </Text>
                        </Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="access-time" size={28} color="#FEB602" />
                        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                            Hora Fin:{" "}
                            <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>
                                {formatTime(selectedPayment.hora_fin_tutoria)}
                            </Text>
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialIcons name="email" size={28} color="#FEB602" />
                        <Text className="text-lg text-white" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                            Correo:{" "}
                            <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.email}</Text>
                        </Text>
                    </View>
                </View>
                <View className=" bg-[#086490] 
                 mb-2 rounded-lg p-4 w-[90%] items-center">
                    <Text className="text-lg text-white mb-2" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                        Comprobante de Pago:
                    </Text>
                    <TouchableOpacity
                        className="bg-[#FB8500] py-2 px-4 rounded-lg"
                        onPress={() => setShowComprobanteModal(true)}
                    >
                        <Text className="text-white font-bold">Ver detalles del comprobante</Text>
                    </TouchableOpacity>

                    {/* Modal para mostrar la imagen */}

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showComprobanteModal}
                        onRequestClose={() => setShowComprobanteModal(false)}
                    >
                        <View className="flex-1 justify-center pt-48 items-center bg-black/80">
                            <ScrollView>
                                <View className="bg-white w-full max-w-[600px] rounded-lg p-4 shadow-lg mx-2">
                                    <Text className="text-lg font-bold text-center mb-4">Comprobante de Pago</Text>
                                    <View className="w-full h-[420px] bg-gray-300 rounded-lg overflow-hidden">
                                        <Image
                                            source={{ uri: selectedPayment.comprobante }}
                                            style={{ width: "100%", height: "100%", borderRadius: 12 }}
                                            resizeMode="cover" />
                                    </View>
                                    <TouchableOpacity
                                        className="bg-[#FB8500] py-2 px-4 rounded-lg mt-4"
                                        onPress={() => setShowComprobanteModal(false)}
                                    >
                                        <Text className="text-white font-bold text-center">Cerrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>

                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showConfirmModal}
                    onRequestClose={() => setShowConfirmModal(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black/80">
                        <View className="bg-[#023047] w-11/12 rounded-xl p-4 shadow-lg">
                            <Text className="text-white text-xl font-bold text-center mb-4">
                                ¿Realmente deseas confirmar el pago?
                            </Text>
                            <View className="flex-row justify-between">
                                <TouchableOpacity
                                    className="bg-[#2D81AD] py-3 px-6 rounded-lg w-5/12"
                                    onPress={() => setShowConfirmModal(false)}
                                >
                                    <Text className="text-white text-center font-medium">Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-[#FB8500] py-3 px-6 rounded-lg w-5/12"
                                    onPress={() => {
                                        setShowConfirmModal(false);
                                        managePaymentConfirmation();
                                    }}
                                    disabled={updating}
                                >
                                    <Text className="text-white text-center font-medium">Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showConfirmModalRejection}
                    onRequestClose={() => setShowConfirmModalRejection(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black/80">
                        <View className="bg-[#023047] w-11/12 rounded-xl p-4 shadow-lg">
                            <Text className="text-white text-xl font-bold text-center mb-4">
                                ¿Realmente deseas rechazar el pago?
                            </Text>
                            <View className="flex-row justify-between">
                                <TouchableOpacity
                                    className="bg-[#2D81AD] py-3 px-6 rounded-lg w-5/12"
                                    onPress={() => setShowConfirmModalRejection(false)}
                                >
                                    <Text className="text-white text-center font-medium">Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-[#FB8500] py-3 px-6 rounded-lg w-5/12"
                                    onPress={() => {
                                        setShowConfirmModalRejection(false);
                                        handlePaymentRejection();
                                    }}
                                    disabled={updating}
                                >
                                    <Text className="text-white text-center font-medium">Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ToastComponent />
            </View>
            <View className="bg-[#023046] mt-24 px-5 py-4 border-t border-[#FFF]/30">
                <View className="flex-row justify-between">
                    <TouchableOpacity
                        onPress={() => setShowConfirmModalRejection(true)}
                        className="bg-[#0B4D6D] rounded-xl py-3 px-6 w-[48%] items-center"
                    >
                        <Text className="text-white font-semibold">Rechazar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowConfirmModal(true)}
                        className="bg-[#FB8500] rounded-xl py-3 px-6 w-[48%] items-center"
                    >
                        <Text className="text-white font-semibold">Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>

    );
};

export default CardDetailsPayments;