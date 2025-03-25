import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function AddChatLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
