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

// Interfaz para buscar cursos
export interface SearchCoursesParams {
  keyword?: string;
  clasificacion_id?: number;
}

// Buscar cursos por clasificación y palabra clave
export const searchCourses = async (params: SearchCoursesParams): Promise<Course[]> => {
  try {
    const response = await axiosInstance.get("/courses/searchCourses", { params });
    return response.data.data.map((course: any) => ({
      id: course.curso_id.toString(),
      name: course.nombre_curso,
      description: course.descripcion,
      category: course.nombre_clasificacion,
    }));
  } catch (error) {
    console.error("Error al buscar los cursos:", error);
    throw error;
  }
};