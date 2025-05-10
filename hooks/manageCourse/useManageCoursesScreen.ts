import { useState, useMemo } from "react";
import { Alert } from "react-native";
import useCourses from "../../hooks/manageCourse/usemanageCourse";
import { showToast } from "../../components/Toast";

// Este hook se utiliza en la pantalla de gestión de cursos
// y permite gestionar la creación, edición y eliminación de cursos.
const useManageCoursesScreen = () => {
  const {
    courses,
    loading,
    error,
    addCourse,
    classifications,
    fetchCourses,
    removeCourse,
    updateCourseData,
  } = useCourses();

  const [modalVisible, setModalVisible] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Filtrado de cursos
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchText.toLowerCase()) ||
        c.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory =
        !selectedCategory ||
        c.category ===
          (classifications.find((cl) => cl.clasificacion_id === selectedCategory)?.nombre);
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchText, selectedCategory, classifications]);

  const handleAddCourse = async () => {
    if (!courseName.trim() || !courseDescription.trim() || !selectedCategory) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    try {
      const newCourse = {
        universidad_id: 1,
        carrera_id: 1,
        clasificacion_id: selectedCategory,
        nombre: courseName,
        descripcion: courseDescription,
      };
      await addCourse(newCourse);
      setModalVisible(false);
      setCourseName("");
      setCourseDescription("");
      showToast("success", "Curso añadido correctamente.", "Éxito", "top");
    } catch (error) {
      showToast("error", "No se pudo añadir el curso.", "Error", "top");
    }
  };

  const handleEditCourse = (course) => {
    setCourseToEdit(course);
    setEditName(course.name);
    setEditDescription(course.description);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim() || !editDescription.trim()) {
      showToast("error", "Completa todos los campos.", "Error", "top");
      return;
    }
    try {
      const dataToSend = {
        curso_id: Number(courseToEdit.id),
        nombre: editName,
        descripcion: editDescription,
      };
      await updateCourseData(dataToSend);
      showToast("success", "Curso actualizado correctamente.", "Éxito", "top");
      setEditModalVisible(false);
      setCourseToEdit(null);
      setEditName("");
      setEditDescription("");
    } catch (error) {
      showToast("error", "No se pudo actualizar el curso.", "Error", "top");
    }
  };

  const showDeleteModal = (course) => {
    setCourseToDelete(course);
    setDeleteModalVisible(true);
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;
    try {
      await removeCourse(Number(courseToDelete.id));
      showToast("success", "Curso eliminado correctamente.", "Éxito", "top");
    } catch (e) {
      showToast("error", "No se pudo eliminar el curso.", "Aviso", "top");
    } finally {
      setDeleteModalVisible(false);
      setCourseToDelete(null);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCourses();
    setRefreshing(false);
  };

  return {
    // Estados
    modalVisible,
    setModalVisible,
    courseName,
    setCourseName,
    courseDescription,
    setCourseDescription,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    refreshing,
    setRefreshing,
    deleteModalVisible,
    setDeleteModalVisible,
    courseToDelete,
    setCourseToDelete,
    editModalVisible,
    setEditModalVisible,
    courseToEdit,
    setCourseToEdit,
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    // Datos y funciones
    courses,
    loading,
    error,
    classifications,
    filteredCourses,
    handleAddCourse,
    handleEditCourse,
    handleSaveEdit,
    showDeleteModal,
    confirmDeleteCourse,
    onRefresh,
  };
};

export default useManageCoursesScreen;