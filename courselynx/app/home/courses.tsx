import { View, StyleSheet, FlatList } from "react-native"
import CourseCard from "@/components/HomeComponents/CourseCard";
import { courses } from "@/mock/courses";

interface Course {
  id: number;
  name: string;
  code: string;
  professor: string;
  studentCount: number;
  color: string;
}

export default function CoursesTab() {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={courses}
        renderItem={({ item }) => <View style={{ flex: 0.5 }}><CourseCard {...item} /></View>}
        keyExtractor={(item) => item.id.toString()}
        style={styles.courseList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  courseList: {
    flex: 1,
    paddingHorizontal: 5,
  }
});
