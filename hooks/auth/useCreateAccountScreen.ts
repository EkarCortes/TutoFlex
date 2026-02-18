import { useState } from "react";
import { useRouter } from "expo-router";
import { showToast } from "../../components/Toast";
import { verifyEmailExists } from "../../services/AuthService";
import { usePendingRegistration } from "../../app/contexts/PendingRegistrationContext";

// Este hook maneja la lógica de la pantalla de creación de cuenta
// y se encarga de validar los datos ingresados por el usuario
// antes de proceder a la siguiente pantalla de selección de rol.

export const useCreateAccountScreen = () => {
  const router = useRouter();
  const { setPendingRegistration } = usePendingRegistration();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"Estudiante" | "Profesor">("Estudiante");
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) => password.length >= 6;

  const handleNext = async () => {
    if (!isValidEmail(email)) {
      showToast('error', 'Por favor ingresa un correo válido', 'Aviso', 'bottom');
      return;
    }
    if (!isValidPassword(password)) {
      showToast('error', 'La contraseña minimo debe tener 6 caracteres .', 'Aviso', 'bottom');
      return;
    }
    if (password !== confirmPassword) {
      showToast('error', 'Las contraseñas no coinciden.', 'Aviso', 'bottom');
      return;
    }
    if (!termsAccepted) {
      showToast('error', 'Debes aceptar los términos y condiciones para continuar.', 'Aviso', 'bottom');
      return;
    }

    try {
      const emailExists = await verifyEmailExists(email);
      
      if (emailExists) {
        showToast('error', 'Este correo electrónico ya está registrado.', 'Aviso', 'bottom');
        return;
      }

      setPendingRegistration({
        email: email.trim(),
        password,
        role,
      });

      router.push("/(auth)/_selectRole");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error al verificar el correo electrónico.';
      showToast('error', message, 'Aviso', 'bottom');
    }
  };

  const toggleTermsModal = () => setTermsModalVisible(!termsModalVisible);
  const toggleTermsAccepted = () => setTermsAccepted(!termsAccepted);
  const closeTermsModal = () => setTermsModalVisible(false);
  const navigateToLogin = () => router.push('./loginScreen');

  const getButtonClass = (isActive: boolean) =>
    `flex-1 items-center justify-center rounded-lg px-4 py-3 ${
      isActive ? "bg-[#FB8500]" : "bg-[#023047]"
    }`;

  return {
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
  };
};
