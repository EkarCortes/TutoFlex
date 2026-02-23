import React, { useState, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import "../../global.css";
import { useRouter } from "expo-router";
import useRegisterStudent from "../../hooks/auth/useRegisterStudent";
import useRegisterProfessor from "../../hooks/auth/useRegisterProfessor";
import useRenderForm from "../../hooks/auth/useRenderForm";
import ToastComponent from "../../components/Toast";
import { usePendingRegistration } from "../contexts/PendingRegistrationContext";

const SelectRoleScreen = () => {
  const router = useRouter();
  const { pendingRegistration, clearPendingRegistration } = usePendingRegistration();
  const [role, setRole] = useState<"Estudiante" | "Profesor">(
    pendingRegistration?.role ?? "Estudiante"
  );

  useEffect(() => {
    if (!pendingRegistration) {
      router.replace("/(auth)/_createAccountScreen");
      return;
    }
    setRole(pendingRegistration.role);
  }, [pendingRegistration, router]);

  useEffect(() => {
    return () => {
      clearPendingRegistration();
    };
  }, [clearPendingRegistration]);

  const email = pendingRegistration?.email ?? "";
  const password = pendingRegistration?.password ?? "";

  const [campus, setCampus] = useState<string>("");
  const [facility, setFacility] = useState<string>("");

  const registerEstudiante = {
    ...useRegisterStudent(email, password),
    headquarter: "",
    setHeadquarter: () => { },
    enclosure: "",
    setEnclosure: () => { },
    campus,
    setCampus,
    facility,
    setFacility,
  };

  const registerProfesor = {
    ...useRegisterProfessor(email, password),
    headquarter: "",
    setHeadquarter: () => { },
    enclosure: "",
    setEnclosure: () => { },
    campus,
    setCampus,
    facility,
    setFacility,
  };

  const { renderForm } = useRenderForm(role,
    role === "Estudiante" ? registerEstudiante : registerProfesor
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#023047]"
    >
      <StatusBar backgroundColor="#023047" />
      <View className="w-full  px-5 pt-4 ">
        <TouchableOpacity
          className="flex-row items-center w-auto"
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back-ios-new" size={24} color="#fff" className="pt-16" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center ">
        <View className="items-center justify-center mb-6 w-11/12 max-w-md">
          <Text className="text-white text-2xl font-bold text-center">
            {role === "Estudiante" ? "Perfil de Estudiante" : "Perfil de Profesor"}
          </Text>
          <Text className="text-[#FFB703] text-sm text-center">
            Completa tu información personal
          </Text>
        </View>

        <View className="bg-[#0B4D6C] rounded-3xl p-8 shadow-2xl w-11/12 max-w-lg items-center">
          <View className="w-full">
            {renderForm()}
          </View>
        </View>
      </View>

      <ToastComponent />
    </KeyboardAvoidingView>
  );
};

export default SelectRoleScreen;
