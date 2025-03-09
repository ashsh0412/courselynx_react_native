import { useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { View, Text } from "react-native";

export default function ImagesScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Chat Title", // Change header title dynamically
      headerStyle: { backgroundColor: "lightblue" }, // Change header style
      headerTintColor: "white", // Change text color
    });
  }, []);

  return (
    <View>
      <Text>Chat Screen Content</Text>
    </View>
  );
}
