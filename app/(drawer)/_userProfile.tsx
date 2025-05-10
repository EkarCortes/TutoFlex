import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import InputField from '../../components/InputField';
import { showToast } from '../../components/Toast';
import useGetUserProfile from "../../hooks/points/useGetUserProfile";
import useUpdateStudent from "../../hooks/useUpdateStudent";
import {
    getCareersForDropdown,
    getCountriesFromUniversities,
    getEnclosuresForDropdown,
    getHeadquartersForDropdown,
    getUniversitiesForDropdown
} from '../../services/catalogsService';
import { Profile } from '../../services/updateStudentService';

const UserProfile = () => {


  const [isUpdating, setIsUpdating] = useState(false);
  const { updateStudent, isLoading, error, isSuccess } = useUpdateStudent();
  const { profile, fetchProfile, loading: profileLoading} = useGetUserProfile();

  // Estados del componente
  const [activeSection, setActiveSection] = useState<'Informacion Personal' | 'Informacion Academica' | 'Cursos Pendientes'>('Informacion Personal');
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState({
    nombre: '',
    apellido: '',
    carnet: '',
    universidad: '',
    carrera: '',
    sede: '',
    recinto: ''
  });

  // Estados para dropdowns
  const [countries, setCountries] = useState<Array<{label: string, value: any}>>([]);
  const [universities, setUniversities] = useState<Array<{label: string, value: any}>>([]);
  const [headquarters, setHeadquarters] = useState<Array<{label: string, value: any}>>([]);
  const [enclosures, setEnclosures] = useState<Array<{label: string, value: any}>>([]);
  const [careers, setCareers] = useState<Array<{label: string, value: any}>>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [selectedHeadquarter, setSelectedHeadquarter] = useState<any>(null);
  const [selectedEnclosure, setSelectedEnclosure] = useState<any>(null);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Cargar perfil al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  // Inicializar datos cuando se abre el modal
  useEffect(() => {
    if (profile && modalVisible) {
      setEditData({
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        carnet: profile.carnet || '',
        universidad: profile.universidad || '',
        carrera: profile.carrera || '',
        sede: profile.sede || '',
        recinto: profile.recinto || ''
      });

      // Inicializar dropdowns si existen valores previos
      if (profile.pais_id) {
        setSelectedCountry({ label: 'País cargado', value: profile.pais_id });
        loadUniversities(profile.pais_id);
      }
      if (profile.universidad_id) {
        setSelectedUniversity({ label: profile.universidad, value: profile.universidad_id });
        loadHeadquarters(profile.universidad_id);
      }
      if (profile.sede_id) {
        setSelectedHeadquarter({ label: profile.sede, value: profile.sede_id });
        loadEnclosures(profile.sede_id);
      }
      if (profile.recinto_id) {
        setSelectedEnclosure({ label: profile.recinto, value: profile.recinto_id });
      }
      if (profile.carrera_id) {
        setSelectedCareer({ label: profile.carrera, value: profile.carrera_id });
      }
    }
  }, [profile, modalVisible]);

  // Cargar países cuando se abre el modal
  useEffect(() => {
    if (modalVisible) {
      loadCountries();
    }
  }, [modalVisible]);

  // Funciones para cargar datos
  const loadCountries = async () => {
    try {
      const countriesData = await getCountriesFromUniversities();
      setCountries(countriesData);
    } catch (error) {
   
      showToast('error', 'No se pudieron cargar los países', 'Error', 'bottom');
 
    }
  };

  const loadUniversities = async (countryId: number) => {
    try {
      const universitiesData = await getUniversitiesForDropdown(countryId);
      setUniversities(universitiesData);
    } catch (error) {
      showToast('error', 'No se pudieron cargar las universidades', 'Error', 'bottom');
    
    }
  };

  const loadHeadquarters = async (universityId: number) => {
    try {
      const headquartersData = await getHeadquartersForDropdown(universityId);
      setHeadquarters(headquartersData);
    } catch (error) {
      showToast('error', 'No se pudieron cargar las sedes', 'Error', 'bottom');
   
    }
  };

  const loadEnclosures = async (headquarterId: number) => {
    try {
      const enclosuresData = await getEnclosuresForDropdown(headquarterId);
      setEnclosures(enclosuresData);
    } catch (error) {
      showToast('error', 'No se pudieron cargar los recintos', 'Error', 'bottom');
    }
  };

  const loadCareers = async (universityId: number, headquarterId?: number) => {
    try {
      const careersData = await getCareersForDropdown(universityId, headquarterId);
      setCareers(careersData);
    } catch (error) {
      showToast('error', 'No se pudieron cargar las carreras', 'Error', 'bottom');
 
    }
  };

  // Handlers
  const handleFieldChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleCountrySelect = (value: any) => {
    setSelectedCountry(value);
    loadUniversities(value.value);
    setSelectedUniversity(null);
    setSelectedHeadquarter(null);
    setSelectedEnclosure(null);
    setSelectedCareer(null);
    handleFieldChange('universidad', '');
    handleFieldChange('sede', '');
    handleFieldChange('recinto', '');
    handleFieldChange('carrera', '');
    closeDropdowns();
  };

  const handleUniversitySelect = (value: any) => {
    setSelectedUniversity(value);
    handleFieldChange('universidad', value.label);
    loadHeadquarters(value.value);
    loadCareers(value.value);
    setSelectedHeadquarter(null);
    setSelectedEnclosure(null);
    setSelectedCareer(null);
    handleFieldChange('sede', '');
    handleFieldChange('recinto', '');
    handleFieldChange('carrera', '');
    closeDropdowns();
  };

  const handleHeadquarterSelect = (value: any) => {
    setSelectedHeadquarter(value);
    handleFieldChange('sede', value.label);
    loadEnclosures(value.value);
    setSelectedEnclosure(null);
    handleFieldChange('recinto', '');
    closeDropdowns();
  };

  const handleEnclosureSelect = (value: any) => {
    setSelectedEnclosure(value);
    handleFieldChange('recinto', value.label);
    closeDropdowns();
  };

  const handleCareerSelect = (value: any) => {
    setSelectedCareer(value);
    handleFieldChange('carrera', value.label);
    closeDropdowns();
  };

  const handleCancel = () => {
    setModalVisible(false);
    if (profile) {
      setEditData({
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        carnet: profile.carnet || '',
        universidad: profile.universidad || '',
        carrera: profile.carrera || '',
        sede: profile.sede || '',
        recinto: profile.recinto || ''
      });
    }
    closeDropdowns();
  };

  const handleSave = async () => {
    try {
      if (!profile) {
        showToast('error', 'No se pudo cargar el perfil actual', 'Error', 'bottom');
        return;
      }
      setIsUpdating(true);
      
      const updatedData: Partial<Profile> = {
        nombre: editData.nombre.trim() || profile.nombre,
        apellido: editData.apellido.trim() || profile.apellido,
        carnet: editData.carnet.trim() || profile.carnet,
        universidad: editData.universidad || profile.universidad,
        carrera: editData.carrera || profile.carrera,
        sede: editData.sede || profile.sede,
        recinto: editData.recinto || profile.recinto,
        ...(selectedCountry && { pais_id: selectedCountry.value }),
        ...(selectedUniversity && { universidad_id: selectedUniversity.value }),
        ...(selectedHeadquarter && { sede_id: selectedHeadquarter.value }),
        ...(selectedEnclosure && { recinto_id: selectedEnclosure.value }),
        ...(selectedCareer && { carrera_id: selectedCareer.value }),
    
     
      };


      const response = await updateStudent(updatedData);

      await Promise.all([
        fetchProfile(), // Recargar los datos
        new Promise(resolve => setTimeout(resolve, 1000)) // Timer mínimo de 1 segundo
      ]);

      if (response) {
        setModalVisible(false);
        fetchProfile();
        showToast("success", "Perfil actualizado correctamente", "¡Éxito!", "bottom");
      }
    } catch (err) {
      showToast('error', 'Ocurrió un error al actualizar el perfil', 'Error', 'bottom');
     
    } finally {
      setIsUpdating(false); // Desactivar loading
      closeDropdowns();
    }
  };

  // Renderizado de dropdowns
  const renderDropdown = (
    label: string,
    selectedItem: any,
    items: Array<{label: string, value: any}>,
    onSelect: (item: any) => void,
    iconName: string,
    dropdownKey: string,
    isLast: boolean = false
  ) => {
    return (
      <View className={`mb-${isLast ? '0' : '4'} z-10`} key={dropdownKey}>
        <Text className="text-white text-lg font-semibold mb-2">{label}</Text>
        <TouchableOpacity
          className="flex-row items-center bg-white/10 rounded-md px-3 py-3 border border-[#086491]"
          onPress={() => toggleDropdown(dropdownKey)}
        >
          <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={20} color="#FB8500" />
          <Text className="text-white ml-2 flex-1">
            {selectedItem?.label || `Seleccionar ${label.toLowerCase()}`}
          </Text>
          <MaterialIcons 
            name={activeDropdown === dropdownKey ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
            size={24} 
            color="#FB8500" 
          />
        </TouchableOpacity>

        {activeDropdown === dropdownKey && (
          <View className="mt-1 bg-[#0B4D6C] rounded-md border border-[#086491] max-h-40">
            <ScrollView nestedScrollEnabled={true}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  className="py-3 px-4 border-b border-[#086491]"
                  onPress={() => onSelect(item)}
                >
                  <Text className="text-white">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  // Función auxiliar para mostrar valores
  const getProfileValue = (value: any) => (value ? value : "No hay datos.");

  if (isUpdating) {
    return (
      <View className="flex-1 bg-[#023047] justify-center items-center">
        <ActivityIndicator size="large" color="#FB8500" />
        <Text className="text-white mt-4">Actualizando perfil...</Text>
      </View>
    );
  }

  // Removed duplicate declaration of 'profile'

  return (
    <View className="flex-1 bg-[#023047]">
      <ScrollView className="flex-1">
        {/* Header del perfil */}
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

        {/* Sección de estadísticas */}
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

        {/* Selector de secciones */}
        <View className="mt-8 flex-row px-5">
          <TouchableOpacity
            onPress={() => setActiveSection('Informacion Personal')}
            className={`flex-1 items-center rounded-xl p-3 ${
              activeSection === 'Informacion Personal' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'
            }`}
          >
            <Text className="font-[Space-Grotesk] font-bold text-white">Personal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveSection('Informacion Academica')}
            className={`ml-2 flex-1 items-center rounded-xl p-3 ${
              activeSection === 'Informacion Academica' ? 'bg-[#FB8500]' : 'bg-[#0B4D6C]'
            }`}
          >
            <Text className="font-[Space-Grotesk] font-bold text-white">Académica</Text>
          </TouchableOpacity>
        </View>

        {/* Sección de Información Personal */}
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

        {/* Sección de Información Académica */}
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

        {/* Sección de Cursos Pendientes */}
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

      {/* Modal de Edición */}
      <Modal
        animationType="fade"
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
                    {/* Campos de texto */}
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
                    
                    <Text className="text-white text-lg font-semibold mb-2 mt-3">Editar Carnet</Text>
                    <InputField 
                      icon="credit-card" 
                      placeholder="Carnet" 
                      value={editData.carnet} 
                      onChangeText={(text: string) => handleFieldChange('carnet', text)} 
                    />
                    
                    {/* Dropdown de País */}
                    {renderDropdown(
                      'País',
                      selectedCountry,
                      countries,
                      handleCountrySelect,
                      'location-on',
                      'country'
                    )}
                    
                    {/* Dropdown de Universidad */}
                    {selectedCountry && renderDropdown(
                      'Universidad',
                      selectedUniversity,
                      universities,
                      handleUniversitySelect,
                      'school',
                      'university'
                    )}
                    
                    {/* Dropdown de Sede */}
                    {selectedUniversity && renderDropdown(
                      'Sede',
                      selectedHeadquarter,
                      headquarters,
                      handleHeadquarterSelect,
                      'business',
                      'headquarter'
                    )}
                    
                    {/* Dropdown de Recinto */}
                    {selectedHeadquarter && renderDropdown(
                      'Recinto',
                      selectedEnclosure,
                      enclosures,
                      handleEnclosureSelect,
                      'meeting-room',
                      'enclosure'
                    )}
                    
                    {/* Dropdown de Carrera */}
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

                {/* Botones del modal */}
                <View className="flex-row justify-between">
                  <TouchableOpacity 
                    className="bg-[#0B4D6C] py-3 px-6 rounded-lg w-5/12" 
                    onPress={handleCancel}
                  >
                    <Text className="text-white text-center font-medium">Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className={`py-3 px-6 rounded-lg w-5/12 ${
                      isLoading ? 'bg-[#FB8500]/70' : 'bg-[#FB8500]'
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