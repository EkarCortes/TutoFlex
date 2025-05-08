import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import useGetTutorials from './useGetTutorial';
import useClassifications from './useClassifications';
import { useUniversityCatalogs } from '../hooks/useCatalogsService';
import { 
  getCountriesFromUniversities,
  getUniversitiesForDropdown,
  getCareersForDropdown 
} from '../services/catalogsService';

interface DropdownOption {
  label: string;
  value: number | string;
}

interface FilterState {
  pais: string;
  universidad: string;
  carrera: string;
  clasificacion: string;
  fecha: string;
  modalidad: string;
}

export default function useProfesor() {
  // Obtener datos de tutoriales
  const { 
    tutorials, 
    loading: tutorialsLoading, 
    error: tutorialsError,
    refetch: fetchTutorials 
  } = useGetTutorials();
  
  // Obtener clasificaciones desde tu endpoint
  const { 
    classifications,
    loading: classificationsLoading,
    error: classificationsError
  } = useClassifications();

  const { 
    loading: catalogsLoading, 
    error: catalogsError
  } = useUniversityCatalogs();

  // Estados para los filtros
  const [busqueda, setBusqueda] = useState('');
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  const [universidadSeleccionado, setUniversidadSeleccionado] = useState('');
  const [carreraSeleccionado, setCarreraSeleccionado] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState('');
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState('');

  // Estados para los datos de catálogo
  const [paises, setPaises] = useState<DropdownOption[]>([]);
  const [universidades, setUniversidades] = useState<DropdownOption[]>([]);
  const [carreras, setCarreras] = useState<DropdownOption[]>([]);

  // Valores iniciales de los filtros
  const filtrosIniciales = useRef<FilterState>({
    pais: '',
    universidad: '',
    carrera: '',
    clasificacion: '',
    fecha: '',
    modalidad: '',
  });

  // Función para normalizar nombres (para comparación insensible a mayúsculas/espacios)
  const normalizeName = useCallback((name: string) => {
    return name.toLowerCase().trim().replace(/\s+/g, ' ');
  }, []);

  // Enriquecer tutoriales con datos completos de clasificación
  const tutorialsEnriquecidos = useMemo(() => {
    return tutorials.map(tutorial => {
      // Buscar la clasificación que coincida con clasificacion_curso
      const clasificacion = classifications.find(c => 
        normalizeName(c.nombre) === normalizeName(tutorial.clasificacion_curso)
      );
      
      return {
        ...tutorial,
        clasificacion_id: clasificacion?.clasificacion_id,
        clasificacion_nombre: tutorial.clasificacion_curso, // Usamos el nombre original del tutorial
        clasificacion_descripcion: clasificacion?.descripcion || ''
      };
    });
  }, [tutorials, classifications, normalizeName]);

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
        setCarreraSeleccionado('');
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

  // Reiniciar filtros
  const reiniciarFiltros = useCallback(() => {
    setPaisSeleccionado(filtrosIniciales.current.pais);
    setUniversidadSeleccionado(filtrosIniciales.current.universidad);
    setCarreraSeleccionado(filtrosIniciales.current.carrera);
    setClasificacionSeleccionada(filtrosIniciales.current.clasificacion);
    setFechaSeleccionada(filtrosIniciales.current.fecha);
    setModalidadSeleccionada(filtrosIniciales.current.modalidad);
    setBusqueda('');
  }, []);

  // Datos filtrados con useMemo para optimización
  const datosFiltrados = useMemo(() => {
    return tutorialsEnriquecidos.filter((item) => {
      // Normalizar strings para búsqueda case-insensitive
      const normalize = (str?: string) => (str || '').toLowerCase().trim();
      
      const cursoNormalized = normalize(item.curso);
      const paisNormalized = normalize(item.pais);
      const universidadNormalized = normalize(item.universidad);
      const carreraNormalized = normalize(item.carrera);
      const modalidadNormalized = normalize(item.modalidad);
      const profesorNormalized = normalize(item.profesor);
      const horariosNormalized = normalize(item.horarios);
      const busquedaNormalized = normalize(busqueda);
      const clasificacionNormalized = normalize(item.clasificacion_nombre);

      // Filtrado por búsqueda general
      const coincideBusqueda =
        !busqueda ||
        cursoNormalized.includes(busquedaNormalized) ||
        paisNormalized.includes(busquedaNormalized) ||
        universidadNormalized.includes(busquedaNormalized) ||
        carreraNormalized.includes(busquedaNormalized) ||
        modalidadNormalized.includes(busquedaNormalized) ||
        profesorNormalized.includes(busquedaNormalized) ||
        horariosNormalized.includes(busquedaNormalized) ||
        clasificacionNormalized.includes(busquedaNormalized);

      // Filtrado por selectores específicos
      const coincidePais = !paisSeleccionado || item.pais === paisSeleccionado;
      const coincideUniversidad = !universidadSeleccionado || item.universidad === universidadSeleccionado;
      const coincideCarrera = !carreraSeleccionado || item.carrera === carreraSeleccionado;
      const coincideClasificacion = !clasificacionSeleccionada || 
        clasificacionNormalized === normalize(clasificacionSeleccionada);
      const coincideFecha = !fechaSeleccionada || horariosNormalized.includes(normalize(fechaSeleccionada));
      const coincideModalidad = !modalidadSeleccionada || item.modalidad === modalidadSeleccionada;

      return coincideBusqueda && 
             coincidePais && 
             coincideUniversidad && 
             coincideCarrera && 
             coincideClasificacion && 
             coincideFecha && 
             coincideModalidad;
    });
  }, [
    tutorialsEnriquecidos, 
    busqueda, 
    paisSeleccionado, 
    universidadSeleccionado, 
    carreraSeleccionado, 
    clasificacionSeleccionada, 
    fechaSeleccionada, 
    modalidadSeleccionada
  ]);

  // Obtener modalidades únicas
  const modalidades = useMemo(() => {
    return [...new Set(tutorials.map((item) => item.modalidad || ''))].filter(Boolean);
  }, [tutorials]);

  // Obtener clasificaciones únicas para el dropdown
  const clasificacionesUnicas = useMemo(() => {
    return classifications.map(c => ({
      value: c.nombre, // Usamos el nombre como valor para el filtro
      label: c.nombre
    }));
  }, [classifications]);

  // Estados combinados de carga y error
  const loading = tutorialsLoading || classificationsLoading || catalogsLoading;
  const error = tutorialsError || classificationsError || catalogsError;

  return {
    datosFiltrados,
    busqueda,
    setBusqueda,
    paisSeleccionado,
    setPaisSeleccionado,
    universidadSeleccionado,
    setUniversidadSeleccionado,
    carreraSeleccionado,
    setCarreraSeleccionado,
    clasificacionSeleccionada,
    setClasificacionSeleccionada,
    fechaSeleccionada,
    setFechaSeleccionada,
    modalidadSeleccionada,
    setModalidadSeleccionada,
    reiniciarFiltros,
    loading,
    error,
    paises,
    universidades,
    carreras,
    modalidades,
    classifications: clasificacionesUnicas,
    fetchTutorials,
  };
}