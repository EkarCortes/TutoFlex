import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import useCourses from "./useCourses";
import useClassifications from "../useClassifications";
import { useAuth } from "../../app/contexts/AuthContext";
import { showToast } from "../../components/Toast";

// Este hook se utiliza en la pantalla index de la carpeta course para añadir cursos
// y filtrar cursos por clasificacion en el dropdown

export default function useAddCourseScreen() {
  const router = useRouter();
  const { refresh } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const {
    courses,
    loading,
    error,
    addCourse,
    filterCourses,
    fetchCoursesProfesor,
  } = useCourses();
  const { user } = useAuth();
  const {
    classifications,
    loading: loadingClassifications,
    error: errorClassifications,
  } = useClassifications();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [modalSelectedCategory, setModalSelectedCategory] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleFilter = () => {
    if (selectedCategory === -1) {
      fetchCoursesProfesor();
    } else {
      const params = {
        keyword: searchText || undefined,
        clasificacion_id: selectedCategory || undefined,
      };
      filterCourses(params);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalSelectedCategory(null);
  };

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, selectedCategory]);

  useEffect(() => {
    console.log("Datos del usuario desde el contexto:", user);
  }, [user]);

  const handleAddCourse = async () => {
    if (
      !courseName.trim() ||
      !courseDescription.trim() ||
      !modalSelectedCategory
    ) {
      showToast(
        "error",
        "Por favor completa todos los campos",
        "Aviso",
        "bottom"
      );
      return;
    }

    try {
      const newCourse = {
        universidad_id: user?.universidad_id,
        carrera_id: user?.carrera_id,
        clasificacion_id: modalSelectedCategory,
        nombre: courseName,
        descripcion: courseDescription,
      };

      console.log("Nuevo curso:", newCourse);
      await addCourse(newCourse);
      handleCloseModal();
      setCourseName("");
      setCourseDescription("");
      showToast("success", "Curso añadido correctamente", "¡Éxito!", "bottom");
    } catch (error) {
      showToast("error", "No se pudo añadir el curso", "Aviso", "bottom");
      console.error("Error al añadir el curso:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (selectedCategory === -1) {
        await fetchCoursesProfesor();
      } else {
        const params = {
          keyword: searchText || undefined,
          clasificacion_id: selectedCategory || undefined,
        };
        await filterCourses(params);
      }
    } catch (error) {
      console.error("Error al refrescar los cursos:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return {
    router,
    courses,
    loading,
    error,
    classifications,
    loadingClassifications,
    errorClassifications,
    selectedCategory,
    setSelectedCategory,
    modalSelectedCategory,
    setModalSelectedCategory,
    searchText,
    setSearchText,
    modalVisible,
    setModalVisible,
    courseName,
    setCourseName,
    courseDescription,
    setCourseDescription,
    handleCloseModal,
    handleAddCourse,
    handleRefresh,
    refreshing,
    user,
  };
}