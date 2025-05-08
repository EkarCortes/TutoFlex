import { useState } from "react";
import { updateProfile } from "../services/updateProfesorProfileService";

const useUpdateProfesorProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const updateProfesorProfile = async (fd: FormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateProfile(fd);
      if (!res.success) {
        setError(res.message);
        return false;
      }
      return true;
    } catch (e: any) {
      setError("Error inesperado");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateProfesorProfile };
};

export default useUpdateProfesorProfile;