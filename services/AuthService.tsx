import axios from 'axios';
import axiosInstance from '../api/axiosConfig';

// Response type for login
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol_id: number;
  };
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/users/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    }
    throw new Error('Error de conexión al servidor');
  }
};

// Add new function to verify if an email exists
export const verifyEmailExists = async (email: string): Promise<boolean> => {
  try {
    console.log(`Checking if email exists: ${email}`);
    const response = await axiosInstance.post('/users/verifyExistingEmail', {
      email
    });
    console.log('API response:', response.data);
    
    // If disponible is true, email is available (not registered)
    // If disponible is false, email is already registered
    if (response.data.disponible !== undefined) {
      // When disponible is false, we should return true (email exists)
      // When disponible is true, we should return false (email doesn't exist)
      return !response.data.disponible;
    }
    
    // Default fallback if disponible field is not present
    return false;
  } catch (error) {
    console.error('Error verifying email:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al verificar el email');
    }
    throw new Error('Error de conexión al servidor');
  }
};