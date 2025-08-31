import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useStudentFormData } from "../hooks/auth/useStudentFormData";
import ButtonBottom from "./ButtonBottom";
import CustomDropdown from "./CustomDropdown";
import InputField from "./InputField";

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
  telefono: string;
  setTelefono: (value: string) => void;
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
  telefono,
  setTelefono,
  handleRegister,
}) => {
  const {
    loading,
    countryOptions,
    universityOptions,
    careerOptions,
  } = useStudentFormData(country, setCountry, university, setUniversity, career, setCareer);

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

export default StudentForm;
