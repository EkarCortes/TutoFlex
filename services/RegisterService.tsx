export const registerStudent = async (userData: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  universidad_id: number;
  pais_id: number;
  carrera_id: number;
  telefono: string; 
}) => {
  void userData;
  throw new Error('El registro de estudiantes no está disponible en la API v2 actual');
};

export const registerProfessor = async (userData: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  universidad_id: number;
  carrera_id: number;
  pais_id: number;
  telefono: string;
}) => {
  void userData;
  throw new Error('El registro de profesores no está disponible en la API v2 actual');
};
