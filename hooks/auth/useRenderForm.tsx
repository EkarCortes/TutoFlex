import React from 'react';
import StudentForm from '../../components/StudentForm';
import ProfessorForm from '../../components/ProfessorForm';

// Hook que renderiza el formulario de registro dependiendo del rol

const useRenderForm = (
  role: "Estudiante" | "Profesor" | null,
  props: React.JSX.IntrinsicAttributes & { name: any; setName: any; lastname: any; setLastName: any; country: any; setCountry: any; university: any; setUniversity: any; career: any; setCareer: any; handleRegister: any; campus: any; setCampus: any; facility: any; setFacility: any; headquarter: any; setHeadquarter: any; enclosure: any; setEnclosure: any; }
) => {
  const renderForm = () => {
    if (role === "Estudiante") {
      return <StudentForm {...props} />;
    } else if (role === "Profesor") {
      return <ProfessorForm {...props} />;
    }
    return null;
  };

  return { renderForm };
};

export default useRenderForm;