import { useEffect, useState } from "react";
import { Profile, getProfile } from "../../services/GetUserProfileService";

// Este hook se encarga de manejar la lógica de obtención de los puntos del perfil del usuario.

const useGetUserProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await getProfile();
            console.log("Datos recibidos de la API de useGetUserProfile:", response);

            if (response) {
                setProfile(response.data);
            } else {
                setProfile(null);
            }
        } catch (err) {
            console.error("Error al obtener el perfil:", err);
            setError("No se pudo obtener el perfil del usuario");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProfile();
    }, []);

    return { profile, loading, error, fetchProfile };
};



export default useGetUserProfile;
