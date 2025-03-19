import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CourseCardProps {
  id: number;
  name: string;
  code: string;
  professor: string;
  studentCount: number;
  color: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  name,
  code,
  professor,
  studentCount,
  color,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.6}
        onPress={() => { }}
      >
        <View style={[styles.banner, { backgroundColor: color }]}>
          <View style={styles.studentsBadge}>
            <Ionicons name="person-outline" size={14} color="#000000" />
            <Text style={styles.studentCount}>{studentCount}</Text>
          </View>
        </View>
        <Text style={styles.courseName}>{name}</Text>
        <Text style={styles.classCode}>{code}</Text>
        <Text style={styles.professor}>{professor}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  card: {
    aspectRatio: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "rgba(45, 138, 251, 0.5)",
    shadowColor: "rgba(45, 138, 251, 1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  banner: {
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 6,
  },
  studentsBadge: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    alignItems: "center",
  },
  studentCount: {
    marginLeft: 4,
    fontSize: 12,
  },
  courseName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  classCode: {
    fontSize: 12,
    marginBottom: 6,
  },
  professor: {
    fontSize: 12,
  },
});

export default CourseCard;
