import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function DetailLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="index" options={{ title: "" }} />
      </Stack>
    </>
  );
}
