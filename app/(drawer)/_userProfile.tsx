import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import InputField from '../../components/InputField';
import useUserProfileLogic from '../../hooks/userProfile/useUserProfileLogic';

const UserProfile = () => {
  const logic = useUserProfileLogic();
  const {
    isUpdating,
    isLoading,
    profile,
    profileLoading,
    activeSection,
    setActiveSection,
    modalVisible,
    setModalVisible,
    editData,
    countries,
    universities,
    headquarters,
    enclosures,
    careers,
    selectedCountry,
    selectedUniversity,
    selectedHeadquarter,
    selectedEnclosure,
    selectedCareer,
    activeDropdown,
    handleFieldChange,
    toggleDropdown,
    closeDropdowns,
    handleCountrySelect,
    handleUniversitySelect,
    handleHeadquarterSelect,
    handleEnclosureSelect,
    handleCareerSelect,
    handleCancel,
    handleSave,
    getProfileValue,
  } = logic;

  // Renderizado de dropdowns
  const renderDropdown = (
    label: string,
    selectedItem: any,
    items: Array<{ label: string, value: any }>,
    onSelect: (item: any) => void,
    iconName: string,
    dropdownKey: string,
    isLast: boolean = false
  ) => {
    return (
      <View className={`mb-${isLast ? '0' : '4'} z-10`} key={dropdownKey}>
        <Text className="text-white text-lg font-semibold mb-2">{label}</Text>
        <TouchableOpacity
          className="flex-row items-center bg-white rounded-md px-3 py-3 border border-[#086491]"
          onPress={() => toggleDropdown(dropdownKey)}
        >
          <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={20} color="#023047" />
          <Text className="text-[#023047] ml-2 flex-1">
            {selectedItem?.label || `Seleccionar ${label.toLowerCase()}`}
          </Text>
          <MaterialIcons
            name={activeDropdown === dropdownKey ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#023047"
          />
        </TouchableOpacity>

        {activeDropdown === dropdownKey && (
          <View className="mt-1 bg-[#FFF] rounded-md max-h-40">
            <ScrollView nestedScrollEnabled={true}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  className="py-3 px-4 border-b border-[#086491]"
                  onPress={() => onSelect(item)}
                >
                  <Text className="text-[#023047]">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  if (isUpdating) {
    return (
      <View className="flex-1 bg-[#023047] justify-center items-center">
        <ActivityIndicator size="large" color="#FB8500" />
        <Text className="text-white mt-4">Actualizando perfil...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#023047]">

      <View className="bg-[#086491] rounded-b-3xl items-center shadow-md">
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <Text className="text-2xl font-bold text-white mt-2">
          {getProfileValue(profile?.nombre)} {getProfileValue(profile?.apellido)}
        </Text>
        <Text className="text-white text-lg opacity-80">{getProfileValue(profile?.email)}</Text>
        <View className="flex-row mt-3 mb-6">
          <TouchableOpacity
            className="bg-[#FB8500] py-1.5 px-3 rounded-full"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white text-sm font-bold">Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView className="flex-1">
        <View className="mt-8 w-full px-5">
          <View className="flex-row justify-around rounded-xl bg-white p-3 shadow-md">
            <View className="items-center">
              <Text className="font-[Space-Grotesk] text-gray-500">Total</Text>
              <View className="flex-row items-center space-x-1">
                <MaterialIcons name="star" size={24} color="#FEB702" />
                <Text className="font-[Young-Serif] text-xl font-bold text-gray-800">
                  {getProfileValue(profile?.total_puntos)}
                </Text>
              </View>
              <Text className="font-[Space-Grotesk] text-sm text-gray-400">Puntos</Text>
            </View>
            <View className="w-[1px] bg-gray-300" />
            <View className="items-center">
              <Text className="font-[Space-Grotesk] text-gray-500">Tutorías</Text>
              <Text className="font-[Young-Serif] text-xl font-bold text-gray-800">
                {getProfileValue(profile?.total_cursos_recibidos)}
              </Text>
              <Text className="font-[Space-Grotesk] text-sm text-gray-400">Recibidas</Text>
            </View>
          </View>
        </View>

        <View className="mt-8 flex-row px-5">
          <TouchableOpacity
            onPress={() => setActiveSection('Informacion Personal')}
            className={`flex-1 items-center rounded-xl p-3 ${activeSection === 'Informacion Personal' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'
              }`}
          >
            <Text className="font-[Space-Grotesk] font-bold text-white">Personal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveSection('Informacion Academica')}
            className={`ml-2 flex-1 items-center rounded-xl p-3 ${activeSection === 'Informacion Academica' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'
              }`}
          >
            <Text className="font-[Space-Grotesk] font-bold text-white">Académica</Text>
          </TouchableOpacity>
        </View>

        {activeSection === 'Informacion Personal' && (
          <View className="px-6 mt-6">
            <Text className="text-2xl font-bold text-white mb-6 text-center">Información Personal</Text>
            <View className="bg-[#0d6a97] p-6 rounded-2xl shadow-lg">
              <View className="mb-4">
                <Text className="text-white text-lg font-semibold">Nombre Completo:</Text>
                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                  {getProfileValue(profile?.nombre)} {getProfileValue(profile?.apellido)}
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-white text-lg font-semibold">Carnet:</Text>
                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                  {getProfileValue(profile?.carnet)}
                </Text>
              </View>
              <View>
                <Text className="text-white text-lg font-semibold">Correo Electrónico:</Text>
                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                  {getProfileValue(profile?.email)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {activeSection === 'Informacion Academica' && (
          <View className="px-6 mt-6">
            <Text className="text-2xl font-bold text-white mb-6 text-center">Información Académica</Text>
            <View className="bg-[#0d6a97] p-6 rounded-2xl shadow-lg">
              <View className="mb-4">
                <Text className="text-white text-lg font-semibold">Universidad:</Text>
                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                  {getProfileValue(profile?.universidad)}
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-white text-lg font-semibold">Sede:</Text>
                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                  {getProfileValue(profile?.sede)}
                </Text>
              </View>
              <View className="mb-4">
                <Text className="text-white text-lg font-semibold">Recinto:</Text>
                <Text className="bg-white/10 text-lg py-2 px-4 rounded-md text-white opacity-90 mt-2">
                  {getProfileValue(profile?.recinto)}
                </Text>
              </View>
              <View>
                <Text className="text-white text-lg font-semibold">Carrera:</Text>
                <Text className="bg-white/10 text-lg py-2 px-2 rounded-md text-white opacity-90 mt-2">
                  {getProfileValue(profile?.carrera)}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View className="px-6 mt-6 mb-8">
          <Text className="text-2xl font-bold text-white mb-6 text-center">Cursos Pendientes</Text>
          <View className="bg-[#0d6a97] p-6 rounded-2xl shadow-lg">
            {profile?.mis_cursos && profile.mis_cursos.length > 0 ? (
              profile.mis_cursos.map((curso: string, index: number) => (
                <View
                  key={index}
                  className="flex-row items-center bg-white/10 p-4 rounded-lg mb-3"
                >
                  <MaterialIcons name="book" size={24} color="#FEB702" className="mr-3" />
                  <Text className="text-white text-lg font-medium">{curso}</Text>
                </View>
              ))
            ) : (
              <Text className="text-white text-lg font-medium text-center">
                No hay cursos pendientes.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        transparent
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <TouchableWithoutFeedback onPress={closeDropdowns}>
          <View className="flex-1 justify-center items-center bg-black/80">
            <TouchableWithoutFeedback>
              <View className="bg-[#023047] w-11/12 max-w-md rounded-xl p-4 shadow-lg">
                <Text className="text-white text-2xl font-bold text-center mb-4">Editar Perfil</Text>

                <ScrollView className="max-h-[70vh]">
                  <View className="bg-[#0B4D6C] rounded-lg p-4 mb-4">

                    <Text className="text-white text-lg font-semibold mb-2">Editar Nombre</Text>
                    <InputField
                      icon="account-circle"
                      placeholder="Nombre"
                      value={editData.nombre}
                      onChangeText={(text: string) => handleFieldChange('nombre', text)}
                    />

                    <Text className="text-white text-lg font-semibold mb-2 mt-3">Editar Apellido</Text>
                    <InputField
                      icon="account-circle"
                      placeholder="Apellido"
                      value={editData.apellido}
                      onChangeText={(text: string) => handleFieldChange('apellido', text)}
                    />
                    <Text className="text-white text-lg font-semibold mb-2 mt-3">Editar Teléfono</Text>

                    
                    <InputField
                      icon="phone"
                      placeholder="Teléfono"
                      value={""}
                      onChangeText={(text: string) => handleFieldChange('telefono', text)}
                      keyboardType="phone-pad"
                    />

                    <Text className="text-white text-lg font-semibold mb-2 mt-3">Editar Carnet</Text>
                    <InputField
                      icon="credit-card"
                      placeholder="Carnet"
                      value={editData.carnet}
                      onChangeText={(text: string) => handleFieldChange('carnet', text)}
                    />


                    {renderDropdown(
                      'País',
                      selectedCountry,
                      countries,
                      handleCountrySelect,
                      'location-on',
                      'country'
                    )}

                    {selectedCountry && renderDropdown(
                      'Universidad',
                      selectedUniversity,
                      universities,
                      handleUniversitySelect,
                      'school',
                      'university'
                    )}
                    {selectedUniversity && renderDropdown(
                      'Sede',
                      selectedHeadquarter,
                      headquarters,
                      handleHeadquarterSelect,
                      'business',
                      'headquarter'
                    )}

                    {selectedHeadquarter && renderDropdown(
                      'Recinto',
                      selectedEnclosure,
                      enclosures,
                      handleEnclosureSelect,
                      'meeting-room',
                      'enclosure'
                    )}

                    {selectedUniversity && renderDropdown(
                      'Carrera',
                      selectedCareer,
                      careers,
                      handleCareerSelect,
                      'menu-book',
                      'career',
                      true
                    )}
                  </View>
                </ScrollView>
                <View className="flex-row justify-between">
                  <TouchableOpacity
                    className="bg-[#0B4D6C] py-3 px-6 rounded-lg w-5/12"
                    onPress={handleCancel}
                  >
                    <Text className="text-white text-center font-medium">Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`py-3 px-6 rounded-lg w-5/12 ${isLoading ? 'bg-[#FB8500]/70' : 'bg-[#FB8500]'
                      }`}
                    onPress={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white text-center font-medium">Guardar</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default UserProfile;