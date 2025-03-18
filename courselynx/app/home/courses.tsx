import { View, StyleSheet, ScrollView } from "react-native"
import CourseCard from "@/components/HomeComponents/CourseCard";
import { courses } from "@/mock/courses";

interface Course {
  id: number;
  name: string;
  code: string;
  professor: string;
  students: number;
  color: string;
}

export default function CoursesTab() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 10,
  },
});
