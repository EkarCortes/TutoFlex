import { useRouter } from 'expo-router';
import { useState } from 'react';
import { showToast } from '../../components/Toast';
import { registerProfessor } from '../../services/RegisterService';

// Hook para manejar el registro de un estudiante 

const useRegisterProfessor = (email: string, password: string) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [country, setCountry] = useState<number | null>(null);
  const [university, setUniversity] = useState<number | null>(null);
  const [career, setCareer] = useState<number | null>(null);
  const [telefono, setTelefono] = useState(''); // <-- Nuevo estado

  const handleRegister = async () => {
    if (!name || !lastname || !country || !university || !career || !telefono) {
      console.log('estoso son los datos' + name + lastname + country + university + career + telefono);
      showToast('error', 'Por favor completa todos los campos', 'Aviso', 'bottom');

      return;
    }

    const userData = {
      nombre: name,
      apellido: lastname,
      email,
      password,
      universidad_id: university!,
      carrera_id: career!,
      pais_id: country!,
      telefono, // <-- Nuevo campo
    };

    try {
      await registerProfessor(userData);
      showToast('success', 'Registro completado con éxito', 'Éxito', 'bottom');
      setTimeout(() => {
      router.push('/loginScreen');
      }
      , 2000);
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
    telefono,
    setTelefono,
    handleRegister,
  };
};

export default useRegisterProfessor;