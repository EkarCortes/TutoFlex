import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/app/contexts/AuthContext';
import { showToast } from '../../components/Toast';

// Hook para manejar la lógica de la pantalla de inicio de sesión

export function useLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  
  const router = useRouter();
  const { login, loading } = useAuth();

  useEffect(() => {
    setTimeout(() => setIsSplashVisible(false), 3000);
  }, []);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleLogin = async () => {
    if (!email.trim()) {
      showToast('error', 'Por favor ingresa tu correo electrónico', 'Error', 'bottom');
      return;
    }

    if (!password) {
      showToast('error', 'Por favor ingresa tu contraseña', 'Error', 'bottom');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'No se pudo iniciar sesión';
      showToast('error', errorMessage, 'Error', 'bottom');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToForgotPassword = () => router.push('/(auth)/_forgotPasswordScreen');
  
  const navigateToRegister = () => router.push('./_createAccountScreen');

  return {
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
  };
}