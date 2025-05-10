import { useState, useEffect } from "react";
import { getCourses, createCourse, Course, CreateCourseData, searchCourses, SearchCoursesParams } from "../../services/courseService";
import { getCoursesProfesor } from "../../services/courseProfesorService";

//Este use se utiliza en la pantalla index de la 
// carpeta course para pintar los cursos y añadir cursos

const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchCoursesProfesor = async () => {
    try {
      setLoading(true);
      const fetchedCourses = await getCoursesProfesor();
      setCourses(fetchedCourses); // Asegúrate de que los datos transformados se asignen aquí
    } catch (err) {
      console.error("Error al obtener los cursos del profesor:", err);
      setError("No se pudieron obtener los cursos del profesor");
    } finally {
      setLoading(false);
    }
  };

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

  const filterCourses = async (params: SearchCoursesParams) => {
    try {
      setLoading(true);
      const filteredCourses = await searchCourses(params);
      setCourses(filteredCourses);
    } catch (err) {
      console.error("Error al filtrar los cursos:", err);
      setError("No se pudieron filtrar los cursos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error, fetchCourses, addCourse, filterCourses, fetchCoursesProfesor };
};

export default useCourses;