import axiosInstance from '../api/axiosConfig';

export const registerStudent = async (userData: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  universidad_id: number;
  pais_id: number;
  carrera_id: number;
  telefono: string; 
}) => {
  try {
    
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
  telefono: string;
}) => {
  try {
    
    const response = await axiosInstance.post('/users/registerProfesor', userData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error en el registro de profesor');
    }
    throw new Error('Error de conexión al servidor');
  }
};