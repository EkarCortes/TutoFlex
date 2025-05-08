import axiosInstance from "../api/axiosConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export interface University {
  pais_id: number;
  pais_nombre: string;
  universidad_id: number;
  universidad_nombre: string;
  created_at: string;
  updated_at: string;
}

export interface Headquarter {
  id: number;
  sede: string;
  universidad: number;
}

export interface Enclosure {
  id: number;
  recinto: string;
  sede_id: number;
  sede: string;
}

export interface Career {
  id: number;
  carrera: string;
  universidad_id: number;
  sede_id: number;
}

// Obtener universidades con información de país
export const getUniversities = async (): Promise<University[]> => {
  try {
    const response = await axiosInstance.get("/catalogs/universities");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener universidades:", error);
    throw error;
  }
};

// Obtener sedes (headquarters) y recintos (enclosures) desde el API
export const getHeadquarters = async (): Promise<Headquarter[]> => {
  try {
    const response = await axiosInstance.get("/catalogs/headquarters");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener sedes:", error);
    throw error;
  }
};

// Obtener recintos (enclosures) desde el API
export const getEnclosures = async (): Promise<Enclosure[]> => {
  try {
    const response = await axiosInstance.get("/catalogs/enclosures");
    console.log("Respuesta completa del API de recintos:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener recintos desde el API:", error);
    throw error;
  }
};

// Obtener carreras (careers) desde el API
export const getCareers = async (): Promise<Career[]> => {
  try {
    const response = await axiosInstance.get("/catalogs/careers");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener carreras:", error);
    throw error;
  }
};

// Nueva función para obtener países únicos desde las universidades
export const getCountriesFromUniversities = async (): Promise<
  { label: string; value: number }[]
> => {
  try {
    const universities = await getUniversities();

    // Extraer países únicos usando Set para eliminar duplicados
    const uniqueCountries = Array.from(
      new Set(universities.map((uni) => uni.pais_id))
    ).map((id) => {
      const uni = universities.find((u) => u.pais_id === id);
      return {
        label: uni?.pais_nombre || "",
        value: uni?.pais_id || 0,
      };
    });

    return uniqueCountries.sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error("Error al obtener países:", error);
    throw error;
  }
};

// Función para convertir universidades a formato de dropdown
export const getUniversitiesForDropdown = async (
  countryId?: number
): Promise<{ label: string; value: number }[]> => {
  try {
    const universities = await getUniversities();

    const filtered = countryId
      ? universities.filter((uni) => uni.pais_id === countryId)
      : universities;

    return filtered
      .map((uni) => ({
        label: uni.universidad_nombre,
        value: uni.universidad_id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error("Error al obtener universidades para dropdown:", error);
    throw error;
  }
};

// Obtener sedes (headquarters) filtradas por universidad
export const getHeadquartersForDropdown = async (
  universityId: number
): Promise<{ label: string; value: number }[]> => {
  try {
    const headquarters = await getHeadquarters();
    const filtered = headquarters.filter(
      (hq) => hq.universidad === universityId
    );

    return filtered
      .map((hq) => ({
        label: hq.sede,
        value: hq.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error("Error al obtener sedes para dropdown:", error);
    throw error;
  }
};

// Obtener recintos (enclosures) filtrados por sede
export const getEnclosuresForDropdown = async (
  headquarterId: number
): Promise<{ label: string; value: number }[]> => {
  try {
    const enclosures = await getEnclosures();
    const filtered = enclosures.filter((enc) => enc.sede_id === headquarterId);

    return filtered.map((enc) => ({
      label: enc.recinto,
      value: enc.id,
    }));
  } catch (error) {
    console.error("Error al obtener recintos para dropdown:", error);
    throw error;
  }
};

// Obtener carreras (careers) filtradas por universidad y sede
export const getCareersForDropdown = async (
  universityId: number,
  headquarterId?: number
): Promise<{ label: string; value: number }[]> => {
  try {
    const careers = await getCareers();
    const filtered = careers.filter(
      (career) =>
        career.universidad_id === universityId &&
        (!headquarterId || career.sede_id === headquarterId)
    );

    return filtered
      .map((career) => ({
        label: career.carrera,
        value: career.id,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error("Error al obtener carreras para dropdown:", error);
    throw error;
  }
};
