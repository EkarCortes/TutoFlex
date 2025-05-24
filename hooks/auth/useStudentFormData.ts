import { useState, useEffect } from "react";
import {
  getCareersForDropdown,
  getCountriesFromUniversities,
  getUniversitiesForDropdown,
} from "../../services/catalogsService";

export const useStudentFormData = (
  country: number,
  setCountry: (value: number) => void,
  university: number,
  setUniversity: (value: number) => void,
  career: number,
  setCareer: (value: number) => void
) => {
  const [loading, setLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState<{ label: string; value: number }[]>([]);
  const [universityOptions, setUniversityOptions] = useState<{ label: string; value: number }[]>([]);
  const [careerOptions, setCareerOptions] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await getCountriesFromUniversities();
        setCountryOptions(countries);
      } catch (error) {
        console.error("Error cargando países:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  useEffect(() => {
    const loadUniversities = async () => {
      if (country > 0) {
        try {
          const universities = await getUniversitiesForDropdown(country);
          setUniversityOptions(universities);

          if (university && !universities.some((uni) => uni.value === university)) {
            setUniversity(0);
          }
        } catch (error) {
          console.error("Error cargando universidades:", error);
        }
      } else {
        setUniversityOptions([]);
      }
    };
    loadUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  useEffect(() => {
    const loadCareers = async () => {
      if (university > 0) {
        try {
          const careers = await getCareersForDropdown(university);
          setCareerOptions(careers);

          if (career && !careers.some((c) => c.value === career)) {
            setCareer(0);
          }
        } catch (error) {
          console.error("Error cargando carreras:", error);
        }
      } else {
        setCareerOptions([]);
      }
    };
    loadCareers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [university]);

  return {
    loading,
    countryOptions,
    universityOptions,
    careerOptions,
  };
};