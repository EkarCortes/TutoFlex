import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Course } from "../services/manageCourseService";
import React from "react";

interface CourseListProps {
  courses: Course[];
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

const CourseList = ({ courses, onEditCourse, onDeleteCourse }: CourseListProps) => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      {courses.map((course) => (
        <View key={course.id} className="mb-4 p-4 bg-[#FFFFFF] rounded-lg shadow-md">
          <Text className="text-xl font-semibold">{course.name}</Text>
          <Text className="text-gray-600">{course.description}</Text>

          <View className="flex-row justify-center mt-2">
            <TouchableOpacity
              onPress={() => onEditCourse(course)}
              className="px-4 py-2 bg-[#FFA500] rounded-md mx-2"
            >
              <Text className="text-white">Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onDeleteCourse(course.id)}
              className="px-4 py-2 bg-[#FF6347] rounded-md mx-2"
            >
              <Text className="text-white">Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CourseList;
