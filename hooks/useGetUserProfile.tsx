import { useState, useEffect } from "react";
import { Profile, getProfile } from "../services/GetUserProfileService";

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
