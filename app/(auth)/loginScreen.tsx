import React from 'react';
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import '../../global.css';
import InputField from '../../components/InputField';
import SplashScreen from '../../components/SplashScreen';
import LoadingScreen from '../../components/LoadingScreen';
import ToastComponent from '../../components/Toast';
import { Ionicons } from '@expo/vector-icons';
import { useLoginScreen } from '../../hooks/auth/useLoginScreen';

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isPasswordVisible,
    togglePasswordVisibility,
    isSubmitting,
    loading,
    isSplashVisible,
    handleLogin,
    navigateToForgotPassword,
    navigateToRegister
  } = useLoginScreen();

  if (isSplashVisible) {
    return <SplashScreen />;
  }
  
  if (loading) {
    return <LoadingScreen message="Iniciando sesión..." />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#023047]"
    >
      <StatusBar backgroundColor="#023047" />

      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6">
          <View className="items-center mb-8">
            <Image
              source={require('../../assets/images/splash1.png')}
              style={{ width: 260, height: 160 }}
              resizeMode="contain"
            />
          </View>

          <View className="bg-[#0B4D6C] rounded-2xl p-6 mb-6 shadow-lg">
            <Text className="text-white text-center text-xl font-bold mb-6">Iniciar Sesión</Text>

            <InputField
              icon="email"
              placeholder="Correo Electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <View className="relative">
              <InputField
                icon="lock"
                placeholder="Contraseña"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onPress={togglePasswordVisibility}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={24}
                  color="#023147"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="self-end mb-6"
              onPress={navigateToForgotPassword}
            >
              <Text className="text-[#FFB703] text-sm">¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`items-center justify-center rounded-lg ${isSubmitting ? 'bg-gray-500' : 'bg-[#FB8500]'} p-4 h-[50px]`}
              onPress={handleLogin}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoadingScreen
                  fullScreen={false}
                  backgroundColor="transparent"
                  message=""
                  indicatorSize="small"
                />
              ) : (
                <Text className="font-bold text-lg text-white">INICIAR SESIÓN</Text>
              )}
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <View className="flex-row items-center mb-4">
              <Text className="text-white">¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={navigateToRegister}>
                <Text className="text-[#FFB703] font-bold">Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <ToastComponent />
    </KeyboardAvoidingView>
  );
}