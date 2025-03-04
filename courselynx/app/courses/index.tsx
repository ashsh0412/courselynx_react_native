import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import HomeHeader from "@/components/HomeHeader"

export default function CoursesPage() {
    return (
        <View style={styles.container}>
            <HomeHeader/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" }
})