import { View, Text, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useCouponForm } from '../hooks/coupons/useCouponForm';
import CalendarModal from './CalendarModal';

const AddCouponScreen = () => {
    const {
        nombre, codigo, descuento, fechaInicio, fechaExpiracion, puntosRequeridos,
        startDateModalVisible, endDateModalVisible,
        setNombre, setCodigo, setDescuento, setPuntosRequeridos,
        setStartDateModalVisible, setEndDateModalVisible,
        handleFechaInicioChange, handleFechaExpiracionChange, handleSaveCoupon,
        formatDisplayDate
    } = useCouponForm();

    return (
        <SafeAreaView className="flex-1 bg-[#023046]">
            <ScrollView className="flex-1">
                <View className="p-4">
                    <View className="bg-[#0C6A97] rounded-2xl shadow-md p-5 mb-4">
                        <View className="mb-5">
                            <Text className="text-[#fff] font-semibold mb-2">Nombre del Cupón</Text>
                            <TextInput
                                className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-base"
                                placeholder="Ingrese el Nombre del Cupón"
                                placeholderTextColor="#9ca3af"
                                value={nombre}
                                onChangeText={setNombre}
                            />
                        </View>

                        <View className="mb-5">
                            <Text className="text-[#ffff] font-semibold mb-2">Código del Cupón</Text>
                            <TextInput
                                className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-base"
                                placeholder="Ej: DESC10"
                                placeholderTextColor="#9ca3af"
                                value={codigo}
                                onChangeText={setCodigo}
                                autoCapitalize="characters"
                            />
                        </View>

                        <View className="mb-5">
                            <Text className="text-[#fff] font-semibold mb-2">
                                Porcentaje de Descuento <Text className="text-gray-300 text-xs">(0-100%)</Text>
                            </Text>
                            <TextInput
                                className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-base"
                                placeholder="Ej: 15"
                                placeholderTextColor="#9ca3af"
                                keyboardType="numeric"
                                value={descuento}
                                onChangeText={setDescuento} // Ahora setDescuento es la función validatePercentageInput
                                maxLength={5} // Limitar longitud para evitar números muy largos
                            />
                        </View>

                        <View className="mb-5">
                            <Text className="text-[#fff] font-semibold mb-2">Fecha de Inicio</Text>
                            <TouchableOpacity
                                className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex-row items-center justify-between"
                                onPress={() => setStartDateModalVisible(true)}
                            >
                                <Text className={`text-base ${fechaInicio ? 'text-black' : 'text-gray-400'}`}>
                                    {fechaInicio ? formatDisplayDate(fechaInicio) : 'Seleccionar fecha de inicio'}
                                </Text>
                                <Ionicons name="calendar-outline" size={20} color="#0d6a97" />
                            </TouchableOpacity>
                        </View>

                        <View className="mb-5">
                            <Text className="text-[#fff] font-semibold mb-2">Fecha de Expiración</Text>
                            <TouchableOpacity
                                className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex-row items-center justify-between"
                                onPress={() => setEndDateModalVisible(true)}
                            >
                                <Text className={`text-base ${fechaExpiracion ? 'text-black' : 'text-gray-400'}`}>
                                    {fechaExpiracion ? formatDisplayDate(fechaExpiracion) : 'Seleccionar fecha de expiración'}
                                </Text>
                                <Ionicons name="calendar-outline" size={20} color="#0d6a97" />
                            </TouchableOpacity>
                        </View>

                        <View className="mb-3">
                            <Text className="text-[#fff] font-semibold mb-2">Puntos Requeridos</Text>
                            <TextInput
                                className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-base"
                                placeholder="Ej: 1500"
                                placeholderTextColor="#9ca3af"
                                keyboardType="numeric"
                                value={puntosRequeridos}
                                onChangeText={setPuntosRequeridos}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Botón fijo en la parte inferior */}
            <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
                <TouchableOpacity
                    className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-md"
                    onPress={handleSaveCoupon}
                >
                    <Text className="text-white font-bold text-lg ml-2">Guardar Cupón</Text>
                </TouchableOpacity>
            </View>

            {/* Modal para Fecha de Inicio */}
            <CalendarModal
                visible={startDateModalVisible}
                onClose={() => setStartDateModalVisible(false)}
                onDateSelect={handleFechaInicioChange}
                selectedDate={fechaInicio}
                title="Seleccionar Fecha de Inicio"
                selectedColor="#FB8500"
            />

            {/* Modal para Fecha de Expiración */}
            <CalendarModal
                visible={endDateModalVisible}
                onClose={() => setEndDateModalVisible(false)}
                onDateSelect={handleFechaExpiracionChange}
                selectedDate={fechaExpiracion}
                minDate={fechaInicio}
                title="Seleccionar Fecha de Expiración"
                selectedColor="#FF5F5F"
            />
        </SafeAreaView>
    );
};

export default AddCouponScreen;