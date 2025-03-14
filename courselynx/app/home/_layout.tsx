import HomeHeader from "@/components/HomeComponents/Header";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function SettingLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ header: () => <HomeHeader /> }}
        />
        <Stack.Screen
          name="addChat"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addCourse"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
