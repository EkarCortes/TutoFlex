import { useRouter } from 'expo-router';
import { useState } from 'react';
import { showToast } from '../../components/Toast';
import { registerStudent } from '../../services/RegisterService';

// Hook para manejar el registro de un estudiante 

const useRegisterStudent = (email: string, password: string) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [country, setCountry] = useState<number | null>(null);
  const [university, setUniversity] = useState<number | null>(null);
  const [career, setCareer] = useState<number | null>(null);
  const [telefono, setTelefono] = useState('');

  const setTelefonoValidated = (value: string) => {
    const numeric = value.replace(/\D/g, '').slice(0, 10);
    setTelefono(numeric);
  };

  const handleRegister = async () => {
    if (!name || !lastname || !country || !university || !career || !telefono) {
      showToast('error', 'Por favor completa todos los campos', 'Aviso', 'bottom');
      return;
    }

  
    const userData = {
      nombre: name,
      apellido: lastname,
      email,
      password,
      universidad_id: university!,
      pais_id: country!,
      carrera_id: career!,
      telefono,
    };

    try {
      await registerStudent(userData);
      showToast('success', 'Registro completado con éxito', 'Éxito', 'bottom');
      setTimeout(() => {
        router.push('/loginScreen');
      }, 2000);
    } catch (error: any) {
      // Manejo específico para teléfono duplicado
      if (
        error?.response?.data?.message &&
        error.response.data.message.toLowerCase().includes('teléfono')
      ) {
        showToast('error', 'El número de teléfono ya está registrado. Por favor, ingresa otro.', 'Teléfono duplicado', 'bottom');
      } else {
        showToast('error', error.message || 'Error en el registro', 'Error', 'bottom');
      }
    }
  };

  return {
    name,
    setName,
    lastname,
    setLastName,
    country,
    setCountry,
    university,
    setUniversity,
    career,
    setCareer,
    telefono, // <-- Exportar teléfono y su setter
    setTelefono: setTelefonoValidated,
    campus: "",
    setCampus: () => { },
    facility: "",
    setFacility: () => { },
    handleRegister,
  };
};

export default useRegisterStudent;