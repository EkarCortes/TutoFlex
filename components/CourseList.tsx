import React, { memo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Si no usas Expo, elimina esta línea

interface Course {
  id: string;
  name: string;
  description: string;
  price: string;
  schedule: string;
  modalidad: string;
  category?: string; // Nuevo campo opcional
}

interface CourseListProps {
  courses: Course[];
  onPressCourse: (course: Course) => void;
  refreshing: boolean;
  onRefresh: () => void;
}

const CourseItem = memo(
  ({ course, onPress }: { course: Course; onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        marginBottom: 16,
        padding: 16,
        borderRadius: 18,
        backgroundColor: "#086491",
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff",
            flex: 1,
          }}
        >
          {course.name}
        </Text>
        {course.category && (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 7,
              paddingHorizontal: 10,
              paddingVertical: 2,
              marginLeft: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#0A4C6D",
                fontWeight: "600",
              }}
            >
              {course.category}
            </Text>
          </View>
        )}
      </View>
      <Text style={{ color: "#fff", marginBottom: 8 }}>
        {course.description}
      </Text>
    </TouchableOpacity>
  )
);

const CourseList: React.FC<CourseListProps> = ({
  courses,
  onPressCourse,
  refreshing,
  onRefresh,
}) => {
  const renderCourseItem = ({ item }: { item: Course }) => (
    <CourseItem course={item} onPress={() => onPressCourse(item)} />
  );

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCourseItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      contentContainerStyle={{ paddingVertical: 10 }}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default CourseList;