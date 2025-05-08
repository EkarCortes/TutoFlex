import React from "react";
import { ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, StatusBar, Modal } from "react-native";
import "../../global.css";
import InputField from "../../components/InputField";
import { MaterialIcons } from '@expo/vector-icons';
import ButtonBottom from '../../components/ButtonBottom';
import ToastComponent from "../../components/Toast";
import { useCreateAccountScreen } from "../../hooks/auth/useCreateAccountScreen";

const CreateAccountScreen = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    role,
    setRole,
    termsModalVisible,
    termsAccepted,
    handleNext,
    getButtonClass,
    toggleTermsModal,
    toggleTermsAccepted,
    closeTermsModal,
    navigateToLogin
  } = useCreateAccountScreen();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#023047] justify-center items-center"
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={termsModalVisible}
        onRequestClose={closeTermsModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-xl p-6 w-11/12 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#023047] text-xl font-bold">Términos y Condiciones</Text>
              <TouchableOpacity onPress={closeTermsModal}>
                <MaterialIcons name="close" size={24} color="#023047" />
              </TouchableOpacity>
            </View>
            <ScrollView className="mb-4">
              <Text className="text-[#0B4D6C] mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
              </Text>
              <Text className="text-[#0B4D6C] mb-4">
                Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit.
              </Text>
              <Text className="text-[#0B4D6C]">
                Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere.
              </Text>
            </ScrollView>
            <View className="mb-4">
              <TouchableOpacity 
                className="flex-row items-center" 
                onPress={toggleTermsAccepted}
              >
                <View className={`w-6 h-6 border border-[#FB8500] rounded mr-2 items-center justify-center ${termsAccepted ? 'bg-[#FB8500]' : 'bg-white'}`}>
                  {termsAccepted && <MaterialIcons name="check" size={18} color="white" />}
                </View>
                <Text className="text-[#023047]">Acepto los términos y condiciones</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              className="bg-[#FB8500] py-3 px-6 rounded-lg self-center"
              onPress={closeTermsModal}
            >
              <Text className="text-white font-medium">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar backgroundColor="#023047" />
      <ScrollView 
        className="w-full flex-1" 
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View className="items-center mb-10">
          <Text className="text-white text-3xl font-bold">Crear Cuenta</Text>
          <Text className="text-[#FFB703] text-base mt-2">Forma parte de nuestra comunidad</Text>
        </View>
        <View className="bg-[#0B4D6C] rounded-2xl p-6 shadow-lg w-11/12 max-w-md items-center">

          <Text className="text-white text-lg font-bold mb-4 text-center">Tipo de cuenta</Text>
          <View className="flex-row justify-center mb-6 w-full">
            <TouchableOpacity
              className={getButtonClass(role === "Estudiante")}
              onPress={() => setRole("Estudiante")}
            >
              <View className="flex-row items-center justify-center">
                <MaterialIcons name="book" size={20} color="white" style={{ marginRight: 8 }} />
                <Text className="text-white font-medium">Estudiante</Text>
              </View>
            </TouchableOpacity>
            
            <View style={{ width: 12 }} />
            
            <TouchableOpacity
              className={getButtonClass(role === "Profesor")}
              onPress={() => setRole("Profesor")}
            >
              <View className="flex-row items-center justify-center">
                <MaterialIcons name="school" size={20} color="white" style={{ marginRight: 8 }} />
                <Text className="text-white font-medium">Profesor</Text>
              </View>
            </TouchableOpacity>
          </View>
          

          <Text className="text-white text-lg font-bold mb-4 text-center">Información de cuenta</Text>
          <View className="w-full">
            <InputField
              icon="email"
              placeholder="Correo Electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <InputField
              icon="lock"
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            
            <InputField
              icon="lock"
              placeholder="Confirmar Contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          

          <TouchableOpacity 
            className="mt-4 mb-4 self-center flex-row items-center" 
            onPress={toggleTermsModal}
          >
            <MaterialIcons 
              name={termsAccepted ? "check-circle" : "error"} 
              size={20} 
              color={termsAccepted ? "#FFB703" : "#FFB703"} 
              style={{ marginRight: 8 }}
            />
            <Text className="text-[#FFB703] underline">
              {termsAccepted ? "Términos y Condiciones Aceptados" : "Términos y Condiciones"}
            </Text>
          </TouchableOpacity>
          

          <View className="items-center mt-3 w-full">
            <ButtonBottom 
              title="CONTINUAR" 
              style={{ padding: 16, width: "100%", fontWeight: "bold" }}
              onPress={handleNext} 
            />
          </View>
          
        </View>
        <View className="items-center w-full mt-4">
            <View className="flex-row items-center justify-center">
              <Text className="text-white">¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text className="text-[#FFB703] font-bold">Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
      <ToastComponent />
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;