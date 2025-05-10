import { useState } from "react";
import { updateProfile } from "../../services/updateProfesorProfileService";

// Este hook se utiliza para actualizar el perfil del profesor
// en la pantalla de edición de perfil. Permite gestionar la carga de la foto,
// la descripción y otros datos del perfil.

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