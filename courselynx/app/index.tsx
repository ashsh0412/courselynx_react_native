import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./home/homescreen";

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  devButton: {
    color: "black",
    padding: 4,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "lightGray",
  },
});
