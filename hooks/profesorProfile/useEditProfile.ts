import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import { router } from "expo-router";
import { showToast } from "../../components/Toast";
import useGetProfesorProfile from "./useGetProfesorProfile";
import useUpdateProfesorProfile from "./useUpdateProfesorProfile";
import {
  getUniversitiesForDropdown,
  getHeadquartersForDropdown,
  getEnclosuresForDropdown,
  getCareersForDropdown,
} from "../../services/catalogsService";

// Este hook se utiliza en la pantalla de edición de perfil del profesor
// y permite gestionar la información del perfil, incluyendo la foto, descripción,

type Asset = {
  uri: string;
  fileName?: string;
  type?: string;
};

export default function useEditProfile() {
  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);
  const { profile, loading: loadingProfile } = useGetProfesorProfile();
  const {
    loading: saving,
    error,
    updateProfesorProfile,
  } = useUpdateProfesorProfile();

  const [formData, setFormData] = useState<{
    telefono_profesor: string;
    foto: Asset | null;
    descripcion: string;
    nombre: string;
    apellido: string;
    universidad_id: string;
    sede_id: string;
    recinto_id: string;
    carrera_id: string;
  }>({
    telefono_profesor: "",
    foto: null,
    descripcion: "",
    nombre: "",
    apellido: "",
    universidad_id: "",
    sede_id: "",
    recinto_id: "",
    carrera_id: "",
  });

  const [universityOptions, setUniversityOptions] = useState<{ label: string; value: number }[]>([]);
  const [headquarterOptions, setHeadquarterOptions] = useState<{ label: string; value: number }[]>([]);
  const [enclosureOptions, setEnclosureOptions] = useState<{ label: string; value: number }[]>([]);
  const [careerOptions, setCareerOptions] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    if (profile) {
      setFormData({
        telefono_profesor: profile.telefono_profesor,
        foto: null,
        descripcion: profile.descripcion,
        nombre: profile.nombre,
        apellido: profile.apellido,
        universidad_id: "",
        sede_id: "",
        recinto_id: "",
        carrera_id: "",
      });
    }
  }, [profile]);

  useEffect(() => {
    getUniversitiesForDropdown().then(setUniversityOptions);
  }, []);

  useEffect(() => {
    const universidadId = formData.universidad_id || profile?.universidad_id;
    if (universidadId) {
      getHeadquartersForDropdown(+universidadId).then(setHeadquarterOptions);
    } else {
      setHeadquarterOptions([]);
    }
  }, [formData.universidad_id, profile?.universidad_id]);

  useEffect(() => {
    const sedeId = formData.sede_id || profile?.sede_id;
    if (sedeId) {
      getEnclosuresForDropdown(+sedeId).then(setEnclosureOptions);
    } else {
      setEnclosureOptions([]);
    }
  }, [formData.sede_id, profile?.sede_id]);

  useEffect(() => {
    const universidadId = formData.universidad_id || profile?.universidad_id;
    if (universidadId) {
      getCareersForDropdown(+universidadId).then(setCareerOptions);
    } else {
      setCareerOptions([]);
    }
  }, [formData.universidad_id, profile?.universidad_id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((f) => ({ ...f, [field]: value }));
  };

  const handleSaveChanges = async () => {
    if (
      formData.universidad_id &&
      (!formData.sede_id || !formData.recinto_id || !formData.carrera_id)
    ) {
      return Alert.alert(
        "Campos incompletos",
        "Seleccione sede, recinto y carrera al cambiar universidad."
      );
    }
    const fd = new FormData();
    fd.append("telefono", formData.telefono_profesor);
    fd.append("descripcion", formData.descripcion);
    fd.append("nombre", formData.nombre);
    fd.append("apellido", formData.apellido);

    fd.append(
      "universidad_id",
      formData.universidad_id || String(profile?.universidad_id || "")
    );
    fd.append("sede_id", formData.sede_id || String(profile!.sede_id));
    fd.append("recinto_id", formData.recinto_id || String(profile!.recinto_id));
    fd.append("carrera_id", formData.carrera_id || String(profile!.carrera_id));

    if (formData.foto) {
      if (Platform.OS === "web") {
        const blob = await fetch(formData.foto.uri).then((r) => r.blob());
        const file = new File([blob], formData.foto.fileName || "photo.jpg", {
          type: formData.foto.type || "image/jpeg",
        });
        fd.append("foto", file);
      } else {
        fd.append("foto", {
          uri: formData.foto.uri,
          name: formData.foto.fileName || "photo.jpg",
          type: formData.foto.type || "image/jpeg",
        } as any);
      }
    }

    const ok = await updateProfesorProfile(fd);
    if (ok) {
      showToast('success', 'Perfil actualizado correctamente.', "Éxito", "top");
      setTimeout(() => {
        router.dismissTo("/profesorProfile");
      }, 2000);
    } else {
      showToast('error', error || 'No se pudo actualizar el perfil.');
    }
  };

  return {
    comprobanteUri,
    setComprobanteUri,
    profile,
    loadingProfile,
    saving,
    formData,
    setFormData,
    universityOptions,
    headquarterOptions,
    enclosureOptions,
    careerOptions,
    handleInputChange,
    handleSaveChanges,
  };
}