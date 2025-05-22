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
            <ScrollView>
                <View className="flex-1 bg-[#023047] items-center">
                    <View className="rounded-2xl shadow-xl my-3 overflow-hidden w-[90%]" style={{ backgroundColor: "#0B4C6C" }}>
                        <View style={{ height: 4, backgroundColor: '#FB8500' }} />
                        <View className="bg-[#0B4D6D] rounded-3xl p-6 shadow-xl">
                            <View className="flex-row items-center justify-between mb-4">
                                <View className="flex-row items-center">
                                    <MaterialIcons name="account-circle" size={28} color="#FEB602" />
                                    <Text className="text-2xl text-white ml-3 font-bold" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                                        {selectedPayment.estudiante_nombre}
                                    </Text>
                                </View>
                                <View className="flex-row items-center rounded-full">
                                    <View className="bg-[#FB8500] px-4 py-1 rounded-full mr-2">
                                        <Text className="text-white text-xs font-bold">
                                            {selectedPayment.modalidad.charAt(0).toUpperCase() + selectedPayment.modalidad.slice(1)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View className="flex-row justify-between items-center mb-4">
                                    <View className="flex-row items-center">
                                        <MaterialIcons name="attach-money" size={22} color="#FEB602" />
                                        <Text className="text-lg text-white font-bold ml-1" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                                            {selectedPayment.monto}
                                        </Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <MaterialIcons name="calendar-month" size={22} color="#FEB602" />
                                        <Text className="text-base text-white font-bold ml-1" style={{ fontFamily: "SpaceGrotesk-Bold" }}>
                                            {selectedPayment.fecha_tutoria.split("T")[0].split("-").reverse().join("/")}
                                        </Text>
                                    </View>
                                </View>
                                <View className="h-0.5 bg-[#fff] opacity-60 mb-4 rounded-full" />
                                <View className="mb-3 flex-row items-center">
                                    <MaterialIcons name="book" size={22} color="#FEB602" />
                                    <Text className="text-base text-white ml-2 font-semibold" style={{ fontFamily: "SpaceGrotesk-Regular" }}>
                                        {selectedPayment.nombre_curso}
                                    </Text>
                                </View>
                                <View className="mb-3 flex-row items-center">
                                    <MaterialIcons name="access-time" size={22} color="#FEB602" />
                                    <Text className="text-base text-white ml-2 font-semibold" style={{ fontFamily: "SpaceGrotesk-Regular" }}>
                                        {formatTime(selectedPayment.hora_inicio_tutoria)} - {formatTime(selectedPayment.hora_fin_tutoria)}
                                    </Text>
                                </View>
                                <View className="mb-3 flex-row items-center">
                                    <MaterialIcons name="email" size={22} color="#FEB602" />
                                    <Text className="text-base text-white ml-2 font-semibold" style={{ fontFamily: "SpaceGrotesk-Regular" }}>
                                        {selectedPayment.email}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className=" bg-[#0B4C6C] mb-2 rounded-lg p-4 w-[90%] items-center">
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
                            <View className="flex-1 justify-start items-center bg-black/80" style={{ paddingTop: 60 }}>
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
            </ScrollView>
            <View className="bg-[#023046]  px-5 py-4 border-t border-[#FFF]/30">
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