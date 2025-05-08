import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import InputField from "./InputField";
import CustomDropdown from "./CustomDropdown";
import { Ionicons } from "@expo/vector-icons";

interface Classification {
  clasificacion_id: number;
  nombre: string;
}

interface ModalAddCourseProps {
  courseName: string;
  setCourseName: (value: string) => void;
  courseDescription: string;
  setCourseDescription: (value: string) => void;
  selectedCategory: number | null;
  setSelectedCategory: (value: number | null) => void;
  classifications: Classification[];
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
  classifications,
  onCancel,
  onAdd,
}) => {
  return (
    <View className="flex-1 justify-center items-center bg-black/70">
      <View className="bg-[#023046] w-11/12 rounded-3xl p-6 shadow-2xl max-w-md">
        <View className="items-center mb-4">
          <Ionicons name="add-circle-outline" size={48} color="#FB8500" />
          <Text className="text-white text-2xl font-bold mt-2 mb-1 text-center">
            Añadir Nuevo Curso
          </Text>
          <Text className="text-[#B0BFCB] text-base text-center mb-2">
            Completa los campos para crear un curso.
          </Text>
        </View>

        <View className="mb-2">
    
          <InputField
            icon="school"
            placeholder="Nombre del curso"
            value={courseName}
            onChangeText={setCourseName}
            textColor="white"
            placeholderTextColor="#B0BFCB"
          />
        </View>

        <View className="mb-2">
 
          <InputField
            icon="description"
            placeholder="Descripción del curso"
            value={courseDescription}
            onChangeText={setCourseDescription}
            textColor="white"
            placeholderTextColor="#B0BFCB"
          />
        </View>

        <View className="mb-6">
         
          <CustomDropdown
            data={[
              { label: "Seleccionar categoría", value: null },
              ...classifications.map((classification) => ({
                label: classification.nombre,
                value: classification.clasificacion_id,
              })),
            ]}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Seleccionar categoría"
          />
        </View>

        <View className="flex-row justify-between gap-4">
          <TouchableOpacity
            className="flex-1 bg-[#E5E7EB] p-3 rounded-xl"
            onPress={onCancel}
          >
            <Text className="text-[#023047] text-center font-semibold">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-[#FB8500] p-3 rounded-xl"
            onPress={onAdd}
          >
            <Text className="text-white text-center font-semibold">Añadir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalAddCourse;