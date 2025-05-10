import { useEffect, useState } from "react";
import {
  getUniversities,
  getHeadquarters,
  getEnclosures,
  getCareers,
  getCountriesFromUniversities,
  getUniversitiesForDropdown,
  getHeadquartersForDropdown,
  getEnclosuresForDropdown,
  getCareersForDropdown,
  University,
  Headquarter,
  Enclosure,
  Career,
} from "../services/catalogsService";

// Este hook se utiliza para gestionar los catálogos de universidades, sedes, recintos y carreras
// y permite cargar los datos de manera asíncrona y manejarlos en el componente.

export const useUniversityCatalogs = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [headquarters, setHeadquarters] = useState<Headquarter[]>([]);
  const [enclosures, setEnclosures] = useState<Enclosure[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const [unis, hqs, encs, cars] = await Promise.all([
          getUniversities(),
          getHeadquarters(),
          getEnclosures(),
          getCareers(),
        ]);
        setUniversities(unis);
        setHeadquarters(hqs);
        setEnclosures(encs);
        setCareers(cars);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, []);

  return {
    universities,
    headquarters,
    enclosures,
    careers,
    loading,
    error,
    // helpers:
    getCountriesFromUniversities,
    getUniversitiesForDropdown,
    getHeadquartersForDropdown,
    getEnclosuresForDropdown,
    getCareersForDropdown,
    
  };
};
