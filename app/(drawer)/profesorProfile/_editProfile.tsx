import React from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";
import CustomDropdown from "../../../components/CustomDropdown";
import ToastComponent from '../../../components/Toast';
import UploadImage from "../../../components/EditImageProfesor";
import useEditProfile from "../../../hooks/profesorProfile/useEditProfile";

const EditProfile = () => {
  const {
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
  } = useEditProfile();

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
          <Text className="text-white mb-2">Teléfono</Text>
          <TextInput
            className="bg-white rounded-lg p-3 shadow-md"
            placeholder="Teléfono"
            value={formData.telefono_profesor}
            onChangeText={(t) => handleInputChange("telefono_profesor", t)}
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
