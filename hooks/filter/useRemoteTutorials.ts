import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";

export interface Tutorial {
  tutorial_id: number;
  curso: string;
  profesor: string;
  pais: string;
  universidad: string;
  carrera: string;
  modalidad: string;
  horarios: string;
}

export interface FilterParams {
  page?: number;
  limit?: number;
  keyword?: string;
  pais?: string;
  universidad?: string;
  carrera?: string;
  modalidad?: string;
  clasificacion?: string;
}

export default function useRemoteTutorials(initialParams: FilterParams = {}) {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<FilterParams>(initialParams);
  const [total, setTotal] = useState(0);

  const fetchTutorials = useCallback(async (customParams?: FilterParams) => {
    setLoading(true);
    setError(null);
    try {
      const mergedParams = { ...params, ...customParams };
      

      const response = await axiosInstance.get("/tutorials/getTutorials", {
        params: {
          page: mergedParams.page || 1,
          limit: mergedParams.limit || 20,
          keyword: mergedParams.keyword || undefined,
          pais: mergedParams.pais || undefined,
          universidad: mergedParams.universidad || undefined,
          carrera: mergedParams.carrera || undefined,
          modalidad: mergedParams.modalidad || undefined,
          clasificacion: mergedParams.clasificacion || undefined,
        },
      });

      
      setTutorials(response.data.data || []);
      setTotal(response.data.total || 0);
    } catch (err: any) {
      setError("No se pudieron obtener los tutoriales");
      console.error("Error al obtener tutoriales:", err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Llama a la API cada vez que cambian los parámetros
  useEffect(() => {
    fetchTutorials();
  }, [params, fetchTutorials]);

  return {
    tutorials,
    loading,
    error,
    total,
    params,
    setParams, // Ahora sí actualiza el estado y dispara el efecto
    fetchTutorials,
  };
}