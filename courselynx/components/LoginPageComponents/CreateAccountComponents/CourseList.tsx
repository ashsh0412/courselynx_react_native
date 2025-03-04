import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Course {
  name: string;
  code: string;
  professor: string;
  color: string;
}

interface CourseCardProps {
  course: Course;
  onRemove: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onRemove }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.colorBox, { backgroundColor: course.color }]} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseName}>{course.name}</Text>
        <Text style={styles.courseCode}>{course.code}</Text>
        <Text style={styles.professor}>{course.professor}</Text>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.iconButton}>
        <Ionicons name="remove-circle" size={24} color="#4285F4" />
      </TouchableOpacity>
    </View>
  );
};

const AddCourseCard: React.FC<{ onAdd: () => void }> = ({ onAdd }) => {
  return (
    <TouchableOpacity onPress={onAdd} style={styles.card}>
      <View style={[styles.colorBox, { backgroundColor: "#4285F4" }]}>
        <Ionicons name="add" size={24} color="white" />
      </View>
      <Text style={styles.addText}>Search Course by its Name or Code</Text>
    </TouchableOpacity>
  );
};

const CourseList: React.FC = () => {
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
    setCourses(courses.filter((_, i) => i !== index));
  };

  const addCourse = () => {
    console.log("Search Course");
    // 검색 화면 이동 또는 모달 띄우기 처리 가능
  };

  return (
    <View style={styles.listContainer}>
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          course={course}
          onRemove={() => removeCourse(index)}
        />
      ))}
      <AddCourseCard onAdd={addCourse} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F7FF", // 약간 연한 파랑 배경
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
  courseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  courseName: {
    fontWeight: "700",
    fontSize: 15,
    color: "#222",
    marginBottom: 2,
  },
  courseCode: {
    fontSize: 12,
    color: "#555",
  },
  professor: {
    fontSize: 12,
    color: "#777",
  },
  iconButton: {
    padding: 8,
  },
  addText: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 14,
    color: "#222",
  },
});

export default CourseList;
