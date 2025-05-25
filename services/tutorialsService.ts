import axiosInstance from "../api/axiosConfig";

export interface Tutorial {
  estudiante: string;
  fecha_tutoria: string;
  hora_inicio: string;
  hora_fin: string;
  monto: string;
  curso: string;
  tema: string;
  modalidad: string;
  telefono_estudiante: string;
}

export const fetchPendingTutorials = async (): Promise<Tutorial[]> => {
  try {
    const response = await axiosInstance.get("tutorials/getPendingTutorialsProfessor");
   
     return response.data.data;
  } catch (error: any) {
    throw new Error("Error fetching pending tutorials: " + error.message);
  }
};