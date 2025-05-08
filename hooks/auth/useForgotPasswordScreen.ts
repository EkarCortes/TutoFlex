import { useState } from 'react';
import { useRouter } from 'expo-router';
import { showToast } from '../../components/Toast';
import { requestPasswordReset } from '../../services/PasswordResetService';

// Este hook maneja la lógica de la pantalla de recuperación de contraseña
// y se encarga de enviar la solicitud de restablecimiento de contraseña al servidor.

export function useForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleRequestReset = async () => {
    if (!email.trim()) {
      showToast('error', 'Por favor ingresa tu correo electrónico', 'Error', 'bottom');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await requestPasswordReset(email.trim());
      if (result.success) {
        showToast(
          'success', 
          'Te hemos enviado un correo con instrucciones para restablecer tu contraseña', 
          'Éxito', 
          'bottom'
        );
      } else {
        showToast('error', result.message, 'Error', 'bottom');
      }
    } catch (error) {
      showToast('error', 'Ocurrió un error inesperado', 'Error', 'bottom');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateBack = () => router.back();

  return {
    email,
    setEmail,
    isSubmitting,
    handleRequestReset,
    navigateBack
  };
}