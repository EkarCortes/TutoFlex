import React from "react";
import { TextInput, Button, View } from "react-native";
import CustomDropdown from "./CustomDropdown"; 

interface ModalAddCourseProps {
  courseName: string;
  setCourseName: (name: string) => void;
  courseDescription: string;
  setCourseDescription: (description: string) => void;
  selectedCategory: number | null;
  setSelectedCategory: (category: number | null) => void;
  onCancel: () => void;
  onAdd: () => void;
}

const ModalAddCourse: React.FC<ModalAddCourseProps> = ({
  courseName,
  setCourseName,
  courseDescription,
  setCourseDescription,
  selectedCategory,
  setSelectedCategory,
  onCancel,
  onAdd,
}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <TextInput
          placeholder="Nombre del curso"
          value={courseName}
          onChangeText={setCourseName}
          style={{ marginBottom: 10, padding: 8, borderWidth: 1, borderRadius: 5 }}
        />
        <TextInput
          placeholder="Descripción del curso"
          value={courseDescription}
          onChangeText={setCourseDescription}
          style={{ marginBottom: 10, padding: 8, borderWidth: 1, borderRadius: 5 }}
        />
        <CustomDropdown
          data={[
            { label: "Seleccionar categoría", value: null },
            { label: "Tecnologías", value: 1 },
            { label: "Matemáticas", value: 2 },
            { label: "Ciencias", value: 3 },
          ]}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Seleccionar categoría"
        />
        <Button title="Añadir Curso" onPress={onAdd} />
        <Button title="Cancelar" onPress={onCancel} />
      </View>
    </View>
  );
};

export default ModalAddCourse;
