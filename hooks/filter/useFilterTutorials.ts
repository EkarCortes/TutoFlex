import { useState, useEffect } from 'react';
import useRemoteTutorials from './useRemoteTutorials';
import useProfesor from './useProfesor';

export default function useFilterTutorials(initialQuery: string = '') {
  const [inputKeyword, setInputKeyword] = useState(initialQuery);
  const [searchKeyword, setSearchKeyword] = useState(initialQuery);
  const [pais, setPais] = useState<string | undefined>();
  const [universidad, setUniversidad] = useState<string | undefined>();
  const [carrera, setCarrera] = useState<string | undefined>();
  const [modalidad, setModalidad] = useState<string | undefined>();
  const [clasificacion, setClasificacion] = useState<string | undefined>();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    tutorials,
    loading: loadingTutorials,
    error,
    total,
    params,
    setParams,
  } = useRemoteTutorials({
    keyword: searchKeyword,
    pais,
    universidad,
    carrera,
    modalidad,
    clasificacion,
    page: currentPage,
    limit,
  });

  useEffect(() => {
    setParams({
      keyword: searchKeyword,
      pais,
      universidad,
      carrera,
      modalidad,
      clasificacion,
      page: currentPage,
      limit,
    });
  }, [searchKeyword, pais, universidad, carrera, modalidad, clasificacion, currentPage]);

  return {
    inputKeyword,
    setInputKeyword,
    searchKeyword,
    setSearchKeyword,
    pais,
    setPais,
    universidad,
    setUniversidad,
    carrera,
    setCarrera,
    modalidad,
    setModalidad,
    clasificacion,
    setClasificacion,
    currentPage,
    setCurrentPage,
    limit,
    tutorials,
    loadingTutorials,
    error,
    total,
    params,
    setParams,
  };
}