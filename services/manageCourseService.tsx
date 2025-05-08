import axiosInstance from "../api/axiosConfig";

// Interfaz para los datos del curso
export interface Course {
  id: string;
  name: string;
  description: string;
  category: string;
}

// Obtener todos los cursos
export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await axiosInstance.get("/courses/getCourses");
    return response.data.data.map((course: any) => ({
      id: course.curso_id.toString(),
      name: course.nombre_curso,
      description: course.descripcion_curso,
      category: course.nombre_clasificacion,
    }));
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    throw error;
  }
};

// Interfaz para clasificación
export interface Classification {
  clasificacion_id: number;
  nombre: string;
  descripcion: string;
}

// Obtener clasificaciones desde la API
export const getClassifications = async (): Promise<Classification[]> => {
  try {
    const response = await axiosInstance.get("/catalogs/classificationCourses");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener clasificaciones:", error);
    throw error;
  }
}

// Interfaz para crear un curso
export interface CreateCourseData {
  universidad_id: number;
  carrera_id: number;
  clasificacion_id: number;
  nombre: string;
  descripcion: string;
}

// Crear un curso
export const createCourse = async (data: CreateCourseData): Promise<void> => {
  try {
    await axiosInstance.post("/courses/createCourse", data);
  } catch (error) {
    console.error("Error al crear el curso:", error);
    throw error;
  }
};

// Eliminar un curso
export const deleteCourse = async (curso_id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/courses/deleteCourseAdmin`, { data: { curso_id } });
  } catch (error) {
    console.error("Error al eliminar el curso:", error);
    throw error;
  }
};

// Interfaz para actualizar un curso
export interface UpdateCourseData {
  curso_id: number;
  nombre?: string;
  descripcion?: string;
}

// Actualizar un curso
export const updateCourse = async (data: UpdateCourseData): Promise<void> => {
  try {
    const response = await axiosInstance.put("/courses/updateCourseAdmin", data);
    console.log("Respuesta updateCourse:", response.status, response.data);
  } catch (error) {
    console.error("Error al actualizar el curso:", error?.response?.data || error);
    throw error;
  }
};
