import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import HomeScreen from "./home/homescreen";

export default function Index() {
  return (
    <HomeScreen />
  );
}

const styles = StyleSheet.create({
  devButton: {
    color: "black",
    padding: 4,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "lightGray",
  },
});
