import { useState } from 'react';
import { Profile, updateProfile } from '../../services/updateStudentService';

const useUpdateStudent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateStudent = async (profileData: Partial<Profile>) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      const response = await updateProfile(profileData);
      if (response) {
        setIsSuccess(true);
        return response;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el perfil');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateStudent,
    isLoading,
    error,
    isSuccess,
    reset: () => {
      setError(null);
      setIsSuccess(false);
    }
  };
};

export default useUpdateStudent;