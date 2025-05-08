import axiosInstance from '../api/axiosConfig';

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await axiosInstance.post('/users/requestPasswordReset', { email });
    return { 
      success: true, 
      message: response.data.message || 'Solicitud enviada correctamente' 
    };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Error al solicitar restablecimiento' 
    };
  }
};
