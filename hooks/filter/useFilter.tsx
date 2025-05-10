import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import useProfesor from './useProfesor';
import useClassifications from "../useClassifications";

// Este hook se utiliza para gestionar la lógica de la pantalla de filtro a la hora de filtrar
// y buscar cursos. Permite seleccionar paises, universidades, carreras, clasificaciones,

export default function useInicioLogic() {
  const { searchQuery } = useLocalSearchParams();
  const [mostrarModalFiltro, setMostrarModalFiltro] = useState(false);
  const [mostrarPaises, setMostrarPaises] = useState(false);
  const [mostrarUniversidad, setMostrarUniversidad] = useState(false);
  const [mostrarcarrera, setMostrarcarrera] = useState(false);
  const [mostrarclasificacion, setMostrarClasificacion] = useState(false);
  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [mostrarModalidad, setMostrarModalidad] = useState(false);

  const {
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
    paises,
    universidades,
    carreras,
    loading
  } = useProfesor();

  const { classifications, loading: loadingClasificaciones, error } = useClassifications();

  useEffect(() => {
    if (searchQuery && typeof searchQuery === 'string') {
      setBusqueda(searchQuery);
    }
  }, [searchQuery]);

  if (loading || loadingClasificaciones) {
    return {
      loading: true,
      datosFiltrados: [],
      classifications: [],
      error: null,
      mostrarModalFiltro, setMostrarModalFiltro,
      mostrarPaises, setMostrarPaises,
      mostrarUniversidad, setMostrarUniversidad,
      mostrarcarrera, setMostrarcarrera,
      mostrarclasificacion, setMostrarClasificacion,
      mostrarFecha, setMostrarFecha,
      mostrarModalidad, setMostrarModalidad,
      busqueda, setBusqueda,
      paisSeleccionado, universidadSeleccionado, carreraSeleccionado,
      clasificacionSeleccionada, fechaSeleccionada, modalidadSeleccionada,
      reiniciarFiltros,
      paisesArray: [], universidadesArray: [], carrerasArray: []
    };
  }

  const seleccionPais = (paisLabel) => {
    setPaisSeleccionado(paisSeleccionado === paisLabel ? '' : paisLabel);
  };

  const seleccionUniversidad = (uniLabel) => {
    setUniversidadSeleccionado(universidadSeleccionado === uniLabel ? '' : uniLabel);
  };

  const seleccionCarrera = (carreraLabel) => {
    setCarreraSeleccionado(carreraSeleccionado === carreraLabel ? '' : carreraLabel);
  };

  const seleccionaMateria = (clasi) => {
    setClasificacionSeleccionada(clasificacionSeleccionada === clasi ? '' : clasi);
  };

  const seleccionaFecha = (fech) => {
    setFechaSeleccionada(fechaSeleccionada === fech ? '' : fech);
  };

  const seleccionaModalidad = (mod) => {
    setModalidadSeleccionada(modalidadSeleccionada === mod ? '' : mod);
  };

  const paisesArray = Array.isArray(paises) ? paises : [];
  const universidadesArray = Array.isArray(universidades) ? universidades : [];
  const carrerasArray = Array.isArray(carreras) ? carreras : [];

  return {
    mostrarModalFiltro, setMostrarModalFiltro,
    mostrarPaises, setMostrarPaises,
    mostrarUniversidad, setMostrarUniversidad,
    mostrarcarrera, setMostrarcarrera,
    mostrarclasificacion, setMostrarClasificacion,
    mostrarFecha, setMostrarFecha,
    mostrarModalidad, setMostrarModalidad,

    datosFiltrados, busqueda, setBusqueda,
    paisSeleccionado, seleccionPais,
    universidadSeleccionado, seleccionUniversidad,
    carreraSeleccionado, seleccionCarrera,
    clasificacionSeleccionada, seleccionaMateria,
    fechaSeleccionada, seleccionaFecha,
    modalidadSeleccionada, seleccionaModalidad,
    reiniciarFiltros,

    paisesArray, universidadesArray, carrerasArray,
    loading, classifications, loadingClasificaciones, error
  };
}
