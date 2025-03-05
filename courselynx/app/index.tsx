import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeHeader from "@/components/HomeHeader";
import HomeScreen from "./home/homescreen";
import CoursesScreen from "./courses"
import NavBar from "../components/Navigation/NavBar";

export default function Index() {
  const [activeScreen, setActiveScreen] = useState<"chats" | "courses">("chats");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <HomeHeader />
          {activeScreen === "chats" ? <HomeScreen /> : <CoursesScreen />}
        </View>
        <NavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  devButton: {
    color: "black",
    padding: 4,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "lightGray",
  },
});
