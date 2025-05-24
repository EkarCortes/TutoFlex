import { useState } from 'react';
import { useRouter } from 'expo-router';
import { registerStudent } from '../../services/RegisterService';
import { showToast } from '../../components/Toast';

// Hook para manejar el registro de un estudiante 

const useRegisterStudent = (email: string, password: string) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [country, setCountry] = useState<number | null>(null);
  const [university, setUniversity] = useState<number | null>(null);
  const [career, setCareer] = useState<number | null>(null);
  const [telefono, setTelefono] = useState(''); // <-- Nuevo estado para teléfono

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
      console.log('Error', error.message || 'Error en el registro');
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
    setTelefono,
    campus: "",
    setCampus: () => { },
    facility: "",
    setFacility: () => { },
    handleRegister,
  };
};

export default useRegisterStudent;