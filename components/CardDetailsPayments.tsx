import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ToastComponent, { showToast } from './Toast';
import LoadingScreen from './LoadingScreen';
import { usePaymentDetails } from '../hooks/usePaymentsDetails';
import { useSearchParams } from 'expo-router/build/hooks';
import { ScrollView } from 'react-native-gesture-handler';
import useUpdatePaymentStatus from '../hooks/useUpdatePaymentStatus ';


export const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};



const CardDetailsPayments = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false); // State for modal visibility
    const [showConfirmModalRejection, setShowConfirmModalRejection] = useState(false);

    const searchParams = useSearchParams(); // Obtiene los parámetros de navegación
    const pagoId = searchParams.get('pagoId'); // Obtiene el ID del pago
    const { selectedPayment, loading } = usePaymentDetails(Number(pagoId)); // Usa el hook para obtener los datos
    const { updateStatus, loading: updating } = useUpdatePaymentStatus();

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

    const managePaymentConfirmation = async () => {
        try {
            await updateStatus(Number(pagoId), 'realizado'); // Actualiza el estado a "realizado"
            showToast('success', 'Pago confirmado correctamente');
            router.push('/(drawer)/receivedPayments');
        } catch (error) {
            showToast('error', 'Error al confirmar el pago');
        }
    };

    const handlePaymentRejection = async () => {
        try {
            await updateStatus(Number(pagoId), 'pendiente'); // Actualiza el estado a "pendiente"
            showToast('success', 'Pago rechazado correctamente');
            router.push('/(drawer)/receivedPayments');
        } catch (error) {
            showToast('error', 'Error al rechazar el pago');
        }
    };

    return (
        <ScrollView>
            <View className='flex-1 bg-[#023047] items-center'>

                <View className="bg-[#086490] rounded-xl p-4 mb-2 mt-1 w-[90%]">
                    <Text className='text-xl text-white mb-4' style={{ fontFamily: "SpaceGrotesk-Bold" }}>Detalles de Pago de Tutoría:</Text>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="account-circle" size={28} color="#FEB602" />
                        <Text className='text-lg text-white' style={{ fontFamily: "SpaceGrotesk-Bold" }}> Estudiante: <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.estudiante_nombre}</Text></Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="book" size={28} color="#FEB602" />
                        <Text className='text-lg text-white' style={{ fontFamily: "SpaceGrotesk-Bold" }}> Materia: <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.nombre_curso}</Text></Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="location-on" size={28} color="#FEB602" />
                        <Text className='text-lg text-white' style={{ fontFamily: "SpaceGrotesk-Bold" }}> Modalidad: <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.modalidad}</Text></Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="attach-money" size={28} color="#FEB602" />
                        <Text className='text-lg text-white' style={{ fontFamily: "SpaceGrotesk-Bold" }}> Monto: <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.monto}</Text></Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="calendar-month" size={28} color="#FEB602" />
                        <Text className='text-lg text-white' style={{ fontFamily: "SpaceGrotesk-Bold" }}> Fecha: <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{formatDate(selectedPayment.fecha_tutoria)}</Text></Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="access-time" size={28} color="#FEB602" />
                        <Text className='text-lg text-white' style={{ fontFamily: "SpaceGrotesk-Bold" }}> Hora Inicio: <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{formatTime(selectedPayment.hora_inicio_tutoria)}</Text></Text>
                    </View>
                    <View className="flex-row items-center mb-2">
                        <MaterialIcons name="access-time" size={28} color="#FEB602" />
                        <Text className='text-lg text-white' style={{ fontFamily: "SpaceGrotesk-Bold" }}> Hora Fin: <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{formatTime(selectedPayment.hora_fin_tutoria)}</Text></Text>
                    </View>
                    <View className="flex-row items-center">
                        <MaterialIcons name="email" size={28} color="#FEB602" />
                        <Text className='text-lg text-white' style={{ fontFamily: "SpaceGrotesk-Bold" }}> Correo: <Text style={{ fontFamily: "SpaceGrotesk-Regular" }}>{selectedPayment.email}</Text></Text>
                    </View>
                </View>
                <View className="bg-gray-200 mb-2 rounded-lg p-4 w-[90%] items-center">
                    <Text className='text-lg text-black mb-2' style={{ fontFamily: "SpaceGrotesk-Bold" }}>Comprobante de Pago:</Text>
                    <View className="w-full h-48 bg-gray-300 rounded-lg overflow-hidden">
                        {/* Aquí se puede cargar la imagen del comprobante */}
                        <Text className='text-center text-gray-500' style={{ fontFamily: "SpaceGrotesk-Regular" }}>Imagen del comprobante</Text>
                    </View>
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
                    onRequestClose={() => setShowConfirmModal(false)}
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

                <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            onPress={() => setShowConfirmModalRejection(true)}
                            className="bg-[#0B4D6D]  rounded-xl py-3 px-6 w-[48%] items-center"

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
                <ToastComponent />
            </View>
        </ScrollView>
    );
};

export default CardDetailsPayments;
