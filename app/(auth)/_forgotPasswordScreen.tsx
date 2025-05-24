import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import InputField from '../../components/InputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToastComponent from '../../components/Toast';
import { useForgotPasswordScreen } from '../../hooks/auth/useForgotPasswordScreen';
import '../../global.css';

const ForgotPasswordScreen = () => {
    const {
        email,
        setEmail,
        isSubmitting,
        handleRequestReset,
        navigateBack
    } = useForgotPasswordScreen();

    return (
        <SafeAreaView className="flex-1 bg-[#023047]" edges={["top", "bottom", "left", "right"]}>
            <StatusBar barStyle="light-content" backgroundColor="#023047" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="w-full px-6 pt-6">
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={navigateBack}
                        >
                            <MaterialIcons name="arrow-back-ios-new" size={24} color="#fff" />

                        </TouchableOpacity>
                    </View>

                    <View className="flex-1 px-6 pt-8 pb-6 mt-8">
                        <View className="mb-10">
                            <Text className="text-white text-3xl font-bold text-center mb-3">
                                Recuperar Contraseña
                            </Text>

                        </View>

                        <View className="bg-[#0B4D6C] rounded-3xl p-7 mt-2 shadow-lg">
                            <View className="items-center mb-7">
                                <View className="bg-[#FB8500] rounded-full p-5 mb-6">
                                    <Ionicons name="mail-outline" size={34} color="white" />
                                </View>
                                <Text className="text-white text-center text-xl font-bold mb-2">
                                    Ingresa tu correo electrónico
                                </Text>
                                <Text className="text-gray-300 text-center text-base px-3">
                                    Enviaremos un enlace a tu correo para crear una nueva contraseña
                                </Text>
                            </View>

                            <View className="mb-2">
                                <InputField
                                    icon="email"
                                    placeholder="Correo Electrónico"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <TouchableOpacity
                                className={`items-center justify-center rounded-xl ${isSubmitting ? 'bg-gray-500' : 'bg-[#FB8500]'} p-3 h-[45px] shadow-md`}
                                onPress={handleRequestReset}
                                disabled={isSubmitting}
                            >
                                <Text className="text-white font-bold text-lg">
                                    {isSubmitting ? 'Enviando...' : 'Enviar Instrucciones'}
                                </Text>
                            </TouchableOpacity>

                            <Text className="text-gray-300 text-center text-xs mt-4 px-2">
                                Si no recibes el correo en unos minutos, revisa tu carpeta de spam o solicita un nuevo enlace.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <ToastComponent />
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;