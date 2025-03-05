import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeHeader from "@/components/HomeHeader";
import HomeScreen from "./home/homescreen";
import NavBar from "../components/Navigation/NavBar";

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <HomeHeader />
          <HomeScreen />
        </View>
        <NavBar />
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
