import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Image, Alert, } from "react-native";
import useGetProfesorProfile from "../../../hooks/useGetProfesorProfile";
import useUpdateProfesorProfile from "../../../hooks/useUpdateProfesorProfile";
import { router } from "expo-router";
import { getUniversitiesForDropdown, getHeadquartersForDropdown, getEnclosuresForDropdown, getCareersForDropdown, } from "../../../services/catalogsService";
import CustomDropdown from "../../../components/CustomDropdown";
import { showToast } from "../../../components/Toast";
import ToastComponent from '../../../components/Toast';
import UploadImage from "../../../components/EditImageProfesor";
type Asset = {
  uri: string;
  fileName?: string;
  type?: string;
};

const EditProfile = () => {
  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);
  const { profile, loading: loadingProfile } = useGetProfesorProfile();
  const {
    loading: saving,
    error,
    updateProfesorProfile,
  } = useUpdateProfesorProfile();

  const [formData, setFormData] = useState<{
    whatsapp: string;
    foto: Asset | null;
    descripcion: string;
    nombre: string;
    apellido: string;
    universidad_id: string;
    sede_id: string;
    recinto_id: string;
    carrera_id: string;
  }>({
    whatsapp: "",
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
        whatsapp: profile.whatsapp,
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
    fd.append("whatsapp", formData.whatsapp);
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

  if (loadingProfile || !profile) {
    return (
      <View className="flex-1 bg-[#023047] justify-center items-center">
        <Text className="text-white text-lg text-center">Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#023047]">
      <View className="bg-[#086491] rounded-b-3xl p-5 items-center">
        <Text className="text-3xl font-bold text-white">Editar Perfil</Text>
      </View>
      <ScrollView className="flex-1 mt-6 px-6">
        <UploadImage
          comprobante={comprobanteUri}
          onPickImage={(uri) => {
            setComprobanteUri(uri);
            setFormData((f) => ({
              ...f,
              foto: {
                uri,
                fileName: "comprobante.jpg",
                type: "image/jpeg",
              },
            }));
          }}
          onChangeImage={() => {
            setComprobanteUri(null);
            setFormData((f) => ({ ...f, foto: null }));
          }}
        />

        <View className="mb-4">
          <Text className="text-white mb-2">Nombre</Text>
          <TextInput
            className="bg-white rounded-lg p-3 shadow-md"
            value={formData.nombre}
            onChangeText={(t) => handleInputChange("nombre", t)}
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Apellido</Text>
          <TextInput
            className="bg-white rounded-lg p-3 shadow-md"
            placeholder="Apellido"
            value={formData.apellido}
            onChangeText={(t) => handleInputChange("apellido", t)}
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">WhatsApp</Text>
          <TextInput
            className="bg-white rounded-lg p-3 shadow-md"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChangeText={(t) => handleInputChange("whatsapp", t)}
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Descripción</Text>
          <TextInput
            className="bg-white rounded-lg p-3 shadow-md"
            placeholder="Descripción"
            value={formData.descripcion}
            onChangeText={(t) => handleInputChange("descripcion", t)}
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Universidad</Text>
          <CustomDropdown
            data={universityOptions}
            value={formData.universidad_id ? +formData.universidad_id : null}
            onChange={(v) => handleInputChange("universidad_id", String(v))}
            placeholder={profile.universidad}
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Sede</Text>
          <CustomDropdown
            data={headquarterOptions}
            value={formData.sede_id ? +formData.sede_id : null}
            onChange={(v) => handleInputChange("sede_id", String(v))}
            placeholder={
              formData.universidad_id ? "Seleccione una sede" : profile.sede
            }
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Recinto</Text>
          <CustomDropdown
            data={enclosureOptions}
            value={formData.recinto_id ? +formData.recinto_id : null}
            onChange={(v) => handleInputChange("recinto_id", String(v))}
            placeholder={
              formData.universidad_id
                ? "Seleccione un recinto"
                : profile.recinto
            }
          />
        </View>

        <View className="mb-4">
          <Text className="text-white mb-2">Carrera</Text>
          <CustomDropdown
            data={careerOptions}
            value={formData.carrera_id ? +formData.carrera_id : null}
            onChange={(v) => handleInputChange("carrera_id", String(v))}
            placeholder={
              formData.universidad_id
                ? "Seleccione una carrera"
                : profile.carrera
            }
          />
        </View>

        <ToastComponent />

      </ScrollView>

      <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
        <View className="">
          <TouchableOpacity
            className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
            onPress={() => handleSaveChanges()}
            disabled={saving}
          >
            <Text className="text-white font-bold text-lg ml-2">
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
