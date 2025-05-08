import axiosInstance from '../api/axiosConfig';

export const registerStudent = async (userData: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  universidad_id: number;
  pais_id: number;
  carrera_id: number;
}) => {
  try {
    console.log('Datos enviados al API (Estudiante):', userData);
    const response = await axiosInstance.post('/users/registerStudent', userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error en el registro');
    }
    throw new Error('Error de conexión al servidor');
  }
};

export const registerProfessor = async (userData: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  universidad_id: number;
  carrera_id: number;
  pais_id: number;
  whatsapp?: string; // Hacemos que sea opcional
}) => {
  try {
    // Aseguramos que el campo whatsapp esté vacío si no se proporciona
    const dataToSend = {
      ...userData,
      whatsapp: userData.whatsapp || "", // Si no se proporciona, se envía como cadena vacía
    };

    console.log('Datos enviados al API (Profesor):', dataToSend);
    const response = await axiosInstance.post('/users/registerProfesor', dataToSend);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error en el registro de profesor');
    }
    throw new Error('Error de conexión al servidor');
  }
};