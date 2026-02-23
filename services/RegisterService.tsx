import axios from 'axios';
import axiosInstance from '../api/axiosConfig';

interface RegisterPayload {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  universidad_id: number;
  pais_id: number;
  carrera_id: number;
  telefono: string;
}

const extractApiError = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error) && error.response) {
    const message = (error.response.data as { message?: string })?.message;
    return message || fallback;
  }
  return fallback;
};

export const registerStudent = async (userData: RegisterPayload) => {
  try {
    return await axiosInstance.post('/users/registerStudent', userData);
  } catch (error) {
    throw new Error(extractApiError(error, 'Error al registrar estudiante'));
  }
};

export const registerProfessor = async (userData: RegisterPayload) => {
  try {
    return await axiosInstance.post('/users/registerProfesor', userData);
  } catch (error) {
    throw new Error(extractApiError(error, 'Error al registrar profesor'));
  }
};
