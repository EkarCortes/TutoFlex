import axiosInstance from "../api/axiosConfig";

export interface Classification {
  label(label: any): void;
  value: any;
  clasificacion_id: number;
  nombre: string;
  descripcion: string;
}

export const getClassifications = async (): Promise<Classification[]> => {
  try {
    const response = await axiosInstance.get("/catalogs/classificationCourses");
    return response.data.data.map((classification: any) => ({
      clasificacion_id: classification.clasificacion_id,
      nombre: classification.nombre,
      descripcion: classification.descripcion,
      label: classification.nombre, // Agregar propiedad label
      value: classification.clasificacion_id, // Agregar propiedad value
    }));
  } catch (error) {
    console.error("Error al obtener las clasificaciones:", error);
    throw error;
  }
};