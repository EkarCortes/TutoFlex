import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  getCareersForDropdown,
  getCountriesFromUniversities,
  getEnclosuresForDropdown,
  getHeadquartersForDropdown,
  getUniversitiesForDropdown,
} from "../services/catalogsService";
import ButtonBottom from "./ButtonBottom";
import CustomDropdown from "./CustomDropdown";
import InputField from "./InputField";

interface ProfessorFormProps {
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
  headquarter: number;
  setHeadquarter: (value: number) => void;
  enclosure: number;
  setEnclosure: (value: number) => void;
  telefono: string;
  setTelefono: (value: string) => void;
  handleRegister: () => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({
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
  enclosure,
  setEnclosure,
  telefono,
  setTelefono,
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
  const [headquarterOptions, setHeadquarterOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [enclosureOptions, setEnclosureOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [headquarter, setHeadquarter] = useState(0);

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

  // Cargar sedes cuando cambia la universidad
  useEffect(() => {
    const loadHeadquarters = async () => {
      if (university > 0) {
        try {
          const headquarters = await getHeadquartersForDropdown(university);
          setHeadquarterOptions(headquarters);
        } catch (error) {
          console.error("Error cargando sedes:", error);
        }
      } else {
        setHeadquarterOptions([]);
      }
    };

    loadHeadquarters();
  }, [university]);

  // Cargar recintos cuando cambia la sede
  useEffect(() => {
    const loadEnclosures = async () => {
      try {
        if (headquarter > 0) {
          const enclosures = await getEnclosuresForDropdown(headquarter);
          setEnclosureOptions(enclosures);
        } else {
          setEnclosureOptions([]);
        }
      } catch (error) {
        console.error("Error cargando recintos:", error);
      }
    };

    loadEnclosures();
  }, [headquarter]);

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
    <View>
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

      <InputField
        icon="phone"
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <CustomDropdown
        data={countryOptions}
        value={country}
        onChange={value => setCountry(Number(value))}
        placeholder="Seleccione su país"
        iconName="public"
      />

      <CustomDropdown
        data={universityOptions}
        value={university}
        onChange={value => setUniversity(Number(value))}
        placeholder={
          country ? "Seleccione su universidad" : "Primero seleccione un país"
        }
        iconName="school"
      />

      <CustomDropdown
        data={headquarterOptions}
        value={headquarter}
        onChange={value => setHeadquarter(Number(value))}
        placeholder={
          university
            ? "Seleccione su sede"
            : "Primero seleccione una universidad"
        }
        iconName="location-city"
      />

      <CustomDropdown
        data={enclosureOptions}
        value={enclosure}
        onChange={value => setEnclosure(Number(value))}
        placeholder={
          headquarter ? "Seleccione su recinto" : "Primero seleccione una sede"
        }
        iconName="domain"
      />

      <CustomDropdown
        data={careerOptions}
        value={career}
        onChange={value => setCareer(Number(value))}
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

export default ProfessorForm;
