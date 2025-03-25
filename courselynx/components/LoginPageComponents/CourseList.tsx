import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EntityCard from "@/components/EntityComponents/EntityCard";

interface Course {
  name: string;
  code: string;
  professor: string;
  color: string;
}

interface CourseListProps {
  onChangeCourses?: (courses: Course[]) => void;
}

const AddCourseCard: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
  <TouchableOpacity onPress={onAdd} style={styles.card}>
    <View style={[styles.colorBox, { backgroundColor: "#4285F4" }]}>
      <Ionicons name="add" size={24} color="white" />
    </View>
    <Text style={styles.addText}>Search Course by its Name or Code</Text>
  </TouchableOpacity>
);

const CourseList: React.FC<CourseListProps> = ({ onChangeCourses }) => {
  const [courses, setCourses] = React.useState<Course[]>([
    {
      name: "Digital Marketing",
      code: "DM101",
      professor: "Professor Name",
      color: "#E57332",
    },
    {
      name: "Business and Finance",
      code: "BF101",
      professor: "Professor Name",
      color: "#D78787",
    },
    {
      name: "Statistics",
      code: "STA101",
      professor: "Professor Name",
      color: "#8DC78B",
    },
    {
      name: "World History",
      code: "WH101",
      professor: "Professor Name",
      color: "#E5E58B",
    },
  ]);

  const removeCourse = (index: number) => {
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
  };

  const addCourse = () => {
    console.log("Search Course");
  };

  useEffect(() => {
    if (onChangeCourses) {
      onChangeCourses(courses);
    }
  }, [courses]);

  return (
    <View style={styles.listContainer}>
      {courses.map((course, index) => (
        <View key={index} style={styles.cardSpacing}>
          <EntityCard
            id={index}
            name={course.name}
            color={course.color}
            useIcon={false}
            hasRemove
            isCircle={false}
            onRemove={() => removeCourse(index)}
          >
            <Text style={styles.courseCode}>{course.code}</Text>
            <Text style={styles.professor}>{course.professor}</Text>
          </EntityCard>
        </View>
      ))}
      <View style={styles.cardSpacing}>
        <AddCourseCard onAdd={addCourse} />
      </View>
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 8,
  },
  cardSpacing: {
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F7FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  courseCode: {
    fontSize: 12,
    color: "#555",
  },
  professor: {
    fontSize: 12,
    color: "#777",
  },
  addText: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 14,
    color: "#222",
  },
});
