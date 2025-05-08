import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import InputField from "./InputField";
import ButtonBottom from "./ButtonBottom";
import CustomDropdown from "./CustomDropdown";
import {
  getCountriesFromUniversities,
  getUniversitiesForDropdown,
  getCareersForDropdown,
} from "../services/catalogsService";

interface StudentFormProps {
  name: string;
  setName: (value: string) => void;
  lastname: string;
  setLastName: (value: string) => void;
  country: number;
  setCountry: (value: number) => void;
  university: number;
  setUniversity: (value: number) => void;
  career: number;
  setCareer: (value: number) => void;
  handleRegister: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
  name,
  setName,
  lastname,
  setLastName,
  country,
  setCountry,
  university,
  setUniversity,
  career,
  setCareer,
  handleRegister,
}) => {
  const [loading, setLoading] = useState(true);
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [universityOptions, setUniversityOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [careerOptions, setCareerOptions] = useState<
    { label: string; value: number }[]
  >([]);

  // Cargar países al iniciar
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

  // Cargar universidades cuando cambia el país
  useEffect(() => {
    const loadUniversities = async () => {
      if (country > 0) {
        try {
          const universities = await getUniversitiesForDropdown(country);
          setUniversityOptions(universities);

          if (
            university &&
            !universities.some((uni) => uni.value === university)
          ) {
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
  }, [country]);

  // Cargar carreras cuando cambia la universidad
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
  }, [university]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FFB703" />
      </View>
    );
  }

  return (
    <View className="mb-4 rounded-lg">
      <InputField
        icon="person"
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <InputField
        icon="person"
        placeholder="Apellido"
        value={lastname}
        onChangeText={setLastName}
      />

      <CustomDropdown
        data={countryOptions}
        value={country}
        onChange={(value) => setCountry(value)}
        placeholder="Seleccione su país"
        iconName="public"
      />

      <CustomDropdown
        data={universityOptions}
        value={university}
        onChange={setUniversity}
        placeholder={
          country ? "Seleccione su universidad" : "Primero seleccione un país"
        }
        iconName="school"
      />

      <CustomDropdown
        data={careerOptions}
        value={career}
        onChange={setCareer}
        placeholder={
          university
            ? "Seleccione su carrera"
            : "Primero seleccione una universidad"
        }
        iconName="school"
      />

      <ButtonBottom title="Registrar" onPress={handleRegister} />
    </View>
  );
};

export default StudentForm;
