import { useState, useEffect } from "react";
import { getCourses, createCourse, getClassifications, deleteCourse, updateCourse, Course, CreateCourseData, UpdateCourseData, Classification } from "../../services/manageCourseService";

// Este hook se utiliza para gestionar los cursos en la aplicación
// y permite obtener, crear, eliminar y actualizar cursos.

const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [classifications, setClassifications] = useState<Classification[]>([]);

  // Obtener los cursos
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    } catch (err) {
      console.error("Error al obtener los cursos:", err);
      setError("No se pudieron obtener los cursos");
    } finally {
      setLoading(false);
    }
  };

  // Crear un curso
  const addCourse = async (data: CreateCourseData) => {
    try {
      setLoading(true);
      await createCourse(data);
      await fetchCourses(); // Actualizar la lista de cursos después de crear uno nuevo
    } catch (err) {
      console.error("Error al crear el curso:", err);
      setError("No se pudo crear el curso");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un curso
  const removeCourse = async (curso_id: number) => {
    try {
      setLoading(true);
      await deleteCourse(curso_id);
      await fetchCourses();
      console.log("Curso eliminado correctamente:", curso_id);
    } catch (err) {
      console.error("Error al eliminar el curso:", err);
      setError("No se pudo eliminar el curso");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un curso
  const updateCourseData = async (data: UpdateCourseData) => {
    try {
      setLoading(true);
      await updateCourse(data);
      await fetchCourses();
      console.log("Curso actualizado correctamente:", data.curso_id);
    } catch (err) {
      console.error("Error al actualizar el curso:", err);
      setError("No se pudo actualizar el curso");
    } finally {
      setLoading(false);
    }
  };

  // Obtener clasificaciones
  const fetchClassifications = async () => {
    try {
      const data = await getClassifications();
      setClassifications(data);
    } catch (err) {
      console.error("Error al obtener clasificaciones:", err);
    }
  };

  // Llamado a la API para obtener los cursos y clasificaciones al cargar la pantalla
  useEffect(() => {
    fetchCourses();
    fetchClassifications();
  }, []);

  return { courses, loading, error, fetchCourses, addCourse, classifications, removeCourse, updateCourseData };
};

export default useCourses;
