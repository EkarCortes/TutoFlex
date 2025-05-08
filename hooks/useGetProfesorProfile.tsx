// hooks/useGetProfesorProfile.ts
import { useState, useEffect, useCallback } from "react";
import { getProfile, Profile } from "../services/getProfesorProfileService";

const useGetProfesorProfile = () => {
  const [profile, setProfile]   = useState<Profile | null>(null);
  const [loading, setLoading]   = useState<boolean>(true);
  const [error, setError]       = useState<string | null>(null);

  // 1) Función que carga el perfil
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await getProfile();
      if (resp?.data) {
        setProfile(resp.data);
      } else {
        setError("No se recibieron datos.");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Error al cargar perfil");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2) Ejecutar la primera vez
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // 3) Devolver todo, incluido fetchProfile
  return { profile, loading, error, fetchProfile };
};

export default useGetProfesorProfile;
