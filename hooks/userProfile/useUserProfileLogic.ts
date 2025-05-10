import { useCallback, useEffect, useState } from "react";
import { showToast } from "../../components/Toast";
import useGetUserProfile from "../points/useGetUserProfile";
import useUpdateStudent from "./useUpdateStudent";
import { useUniversityCatalogs } from "../useCatalogsService";

// Este hook se utiliza en la pantalla de edición de perfil del estudiante
// y permite gestionar la información del perfil, incluyendo la foto, descripción,

export default function useUserProfileLogic() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateStudent, isLoading } = useUpdateStudent();
  const { profile, fetchProfile, loading: profileLoading } = useGetUserProfile();

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

  const [countries, setCountries] = useState<Array<{ label: string, value: any }>>([]);
  const [universities, setUniversities] = useState<Array<{ label: string, value: any }>>([]);
  const [headquarters, setHeadquarters] = useState<Array<{ label: string, value: any }>>([]);
  const [enclosures, setEnclosures] = useState<Array<{ label: string, value: any }>>([]);
  const [careers, setCareers] = useState<Array<{ label: string, value: any }>>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const [selectedHeadquarter, setSelectedHeadquarter] = useState<any>(null);
  const [selectedEnclosure, setSelectedEnclosure] = useState<any>(null);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const {
    getCountriesFromUniversities,
    getUniversitiesForDropdown,
    getHeadquartersForDropdown,
    getEnclosuresForDropdown,
    getCareersForDropdown,
  } = useUniversityCatalogs();

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
    // eslint-disable-next-line
  }, [profile, modalVisible]);

  useEffect(() => {
    if (modalVisible) {
      loadCountries();
    }
    // eslint-disable-next-line
  }, [modalVisible]);

  const loadCountries = async () => {
    try {
      const countriesData = await getCountriesFromUniversities();
      setCountries(countriesData);
    } catch {
      showToast('error', 'No se pudieron cargar los países', 'Error', 'bottom');
    }
  };

  const loadUniversities = async (countryId: number) => {
    try {
      const universitiesData = await getUniversitiesForDropdown(countryId);
      setUniversities(universitiesData);
    } catch {
      showToast('error', 'No se pudieron cargar las universidades', 'Error', 'bottom');
    }
  };

  const loadHeadquarters = async (universityId: number) => {
    try {
      const headquartersData = await getHeadquartersForDropdown(universityId);
      setHeadquarters(headquartersData);
    } catch {
      showToast('error', 'No se pudieron cargar las sedes', 'Error', 'bottom');
    }
  };

  const loadEnclosures = async (headquarterId: number) => {
    try {
      const enclosuresData = await getEnclosuresForDropdown(headquarterId);
      setEnclosures(enclosuresData);
    } catch {
      showToast('error', 'No se pudieron cargar los recintos', 'Error', 'bottom');
    }
  };

  const loadCareers = async (universityId: number, headquarterId?: number) => {
    try {
      const careersData = await getCareersForDropdown(universityId, headquarterId);
      setCareers(careersData);
    } catch {
      showToast('error', 'No se pudieron cargar las carreras', 'Error', 'bottom');
    }
  };

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

      const updatedData: any = {
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
        fetchProfile(),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);

      if (response) {
        setModalVisible(false);
        fetchProfile();
        showToast("success", "Perfil actualizado correctamente", "¡Éxito!", "bottom");
      }
    } catch {
      showToast('error', 'Ocurrió un error al actualizar el perfil', 'Error', 'bottom');
    } finally {
      setIsUpdating(false);
      closeDropdowns();
    }
  };

  const getProfileValue = (value: any) => (value ? value : "No hay datos.");

  return {
    isUpdating,
    isLoading,
    profile,
    profileLoading,
    activeSection,
    setActiveSection,
    modalVisible,
    setModalVisible,
    editData,
    setEditData,
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
    setActiveDropdown,
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
  };
}