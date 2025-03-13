import { View, StyleSheet, ScrollView } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.grid}>
                    {courses.map((course) => (
                        <CourseCard key={course.id} {...course}/>
                    ))}
                </ScrollView>
            </View>
        </GestureHandlerRootView>
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