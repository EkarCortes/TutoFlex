import { useState, useEffect, useMemo } from 'react';
import useClassifications from '../useClassifications';
import { 
  getCountriesFromUniversities,
  getUniversitiesForDropdown,
  getCareersForDropdown 
} from '../../services/catalogsService';

interface DropdownOption {
  label: string;
  value: number | string;
}

export default function useProfesor() {
  // Estados para los datos de catálogo
  const [paises, setPaises] = useState<DropdownOption[]>([]);
  const [universidades, setUniversidades] = useState<DropdownOption[]>([]);
  const [carreras, setCarreras] = useState<DropdownOption[]>([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState<string>('');
  const [universidadSeleccionado, setUniversidadSeleccionado] = useState<string>('');

  // Clasificaciones desde tu endpoint
  const { 
    classifications,
    loading: classificationsLoading,
    error: classificationsError
  } = useClassifications();

  // Cargar países al inicio
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await getCountriesFromUniversities();
        setPaises(countriesData);
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };
    fetchCountries();
  }, []);

  // Cargar universidades cuando cambia el país seleccionado
  useEffect(() => {
    const fetchUniversities = async () => {
      if (!paisSeleccionado) {
        setUniversidades([]);
        return;
      }
      try {
        const paisId = paises.find(p => p.label === paisSeleccionado)?.value;
        if (paisId) {
          const universitiesData = await getUniversitiesForDropdown(paisId);
          setUniversidades(universitiesData);
        }
      } catch (error) {
        console.error("Error al cargar universidades:", error);
      }
    };
    fetchUniversities();
  }, [paisSeleccionado, paises]);

  // Cargar carreras cuando cambia la universidad seleccionada
  useEffect(() => {
    const fetchCareers = async () => {
      if (!universidadSeleccionado) {
        setCarreras([]);
        return;
      }
      try {
        const uniId = universidades.find(u => u.label === universidadSeleccionado)?.value;
        if (uniId) {
          const careersData = await getCareersForDropdown(uniId);
          setCarreras(careersData);
        }
      } catch (error) {
        console.error("Error al cargar carreras:", error);
      }
    };
    fetchCareers();
  }, [universidadSeleccionado, universidades]);

  // Clasificaciones únicas para el dropdown
  const clasificacionesUnicas = useMemo(() => {
    return classifications.map(c => ({
      value: c.nombre,
      label: c.nombre
    }));
  }, [classifications]);

  // Modalidades fijas
  const modalidades = [
    { label: 'Virtual', value: 'virtual' },
    { label: 'Presencial', value: 'presencial' },
    { label: 'Híbrida', value: 'híbrida' },
  ];

  // Estados combinados de carga y error
  const loading = classificationsLoading;
  const error = classificationsError;

  return {
    paises,
    universidades,
    carreras,
    classifications: clasificacionesUnicas,
    modalidades,
    loading,
    error,
    // Para dependencias externas:
    setPaisSeleccionado,
    setUniversidadSeleccionado,
    paisSeleccionado,
    universidadSeleccionado,
  };
}