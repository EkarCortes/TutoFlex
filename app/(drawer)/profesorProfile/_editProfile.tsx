import HeaderScreens from "@/components/HeaderScreens";
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomDropdown from "../../../components/CustomDropdown";
import UploadImage from "../../../components/EditImageProfesor";
import ToastComponent from '../../../components/Toast';
import useEditProfile from "../../../hooks/profesorProfile/useEditProfile";
import LoadingScreen from "@/components/LoadingScreen";

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

  return (
    <SafeAreaView className="flex-1 bg-[#023047]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <HeaderScreens title={"Editar Perfil"} />
        {loadingProfile || !profile ? (
          <LoadingScreen
            message=""
            fullScreen={true}
            backgroundColor="#023047"
            indicatorColor="#FB8500"
            textColor="white"
            indicatorSize="large"
          />
        ) : (
          <>
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="mb-8 items-center">
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
              </View>

              <View className="mb-8 rounded-2xl shadow-lg p-6" style={{ backgroundColor: "#0B4C6C" }}>
                <Text className="text-xl font-bold text-white mb-4 tracking-wide">
                  Datos Personales
                </Text>
                <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                  <MaterialIcons name="person" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                  <TextInput
                    className="flex-1 text-base py-2"
                    style={{ color: "#fff" }}
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChangeText={(t) => handleInputChange("nombre", t)}
                    placeholderTextColor="#fff"
                    selectionColor="#FB8500"
                  />
                </View>
                <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                  <MaterialIcons name="person" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                  <TextInput
                    className="flex-1 text-base py-2"
                    style={{ color: "#fff" }}
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChangeText={(t) => handleInputChange("apellido", t)}
                    placeholderTextColor="#fff"
                    selectionColor="#FB8500"
                  />
                </View>
                <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                  <MaterialIcons name="call" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                  <TextInput
                    className="flex-1 text-base py-2"
                    style={{ color: "#fff" }}
                    placeholder="Teléfono"
                    keyboardType="phone-pad"
                    value={formData.telefono_profesor}
                    onChangeText={(t) => handleInputChange("telefono_profesor", t.replace(/[^0-9]/g, ""))}
                    placeholderTextColor="#fff"
                    maxLength={15}
                    selectionColor="#FB8500"
                  />
                </View>
                <View className="mb-2 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                  <MaterialIcons name="info" size={22} color="#8FCBE6" style={{ marginRight: 8 }} />
                  <TextInput
                    className="flex-1 text-base py-2"
                    style={{ color: "#fff" }}
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChangeText={(t) => handleInputChange("descripcion", t)}
                    placeholderTextColor="#fff"
                    multiline
                    numberOfLines={2}
                    maxLength={200}
                    selectionColor="#FB8500"
                  />
                </View>
              </View>

              <View className=" rounded-2xl shadow-lg p-6" style={{ backgroundColor: "#0B4C6C" }}>
                <Text className="text-xl font-bold text-white mb-4 tracking-wide">
                  Datos Académicos
                </Text>
                <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                  <View style={{ flex: 1 }}>
                    <CustomDropdown
                      data={universityOptions}
                      value={formData.universidad_id ? +formData.universidad_id : null}
                      onChange={(v) => handleInputChange("universidad_id", String(v))}
                      placeholder={profile.universidad || "Universidad"}
                      borderColor="transparent"
                      textColor="#fff"
                      iconName="school"
                      placeholderTextColor="#fff"
                    />
                  </View>
                </View>
                <View className="mb-4 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                  <View style={{ flex: 1 }}>
                    <CustomDropdown
                      data={headquarterOptions}
                      value={formData.sede_id ? +formData.sede_id : null}
                      onChange={(v) => handleInputChange("sede_id", String(v))}
                      placeholder={
                        formData.universidad_id ? "Seleccione una sede" : profile.sede
                      }
                      borderColor="transparent"
                      textColor="#fff"
                      iconName="business"
                      placeholderTextColor="#fcd19c"
                    />
                  </View>
                </View>
                <View className="mb-3 flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                  <View style={{ flex: 1 }}>
                    <CustomDropdown
                      data={enclosureOptions}
                      value={formData.recinto_id ? +formData.recinto_id : null}
                      onChange={(v) => handleInputChange("recinto_id", String(v))}
                      placeholder={
                        formData.universidad_id
                          ? "Seleccione un recinto"
                          : profile.recinto
                      }
                      borderColor="transparent"
                      textColor="#fff"
                      iconName="location-on"
                      placeholderTextColor="#fcd19c"
                    />
                  </View>
                </View>
                <View className="flex-row items-center border-b-2" style={{ borderColor: "#2379A1" }}>
                  <View style={{ flex: 1 }}>
                    <CustomDropdown
                      data={careerOptions}
                      value={formData.carrera_id ? +formData.carrera_id : null}
                      onChange={(v) => handleInputChange("carrera_id", String(v))}
                      placeholder={
                        formData.universidad_id
                          ? "Seleccione una carrera"
                          : profile.carrera
                      }
                      borderColor="transparent"
                      textColor="#fff"
                      iconName="school"
                      placeholderTextColor="#fcd19c"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            <View className="bg-[#023046] px-5 py-4 border-t border-[#FFF]/30">
              <TouchableOpacity
                className="bg-[#FB8500] h-14 rounded-xl items-center justify-center flex-row shadow-lg"
                onPress={handleSaveChanges}
                disabled={saving}
              >
                <Text className="text-white font-bold text-lg ml-2">
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
      <ToastComponent />
    </SafeAreaView>
  );
};

export default EditProfile;