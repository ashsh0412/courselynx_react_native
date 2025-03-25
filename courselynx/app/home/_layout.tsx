import HeaderHome from "@/components/HeaderComponents/HeaderHome";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function SettingLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ header: () => <HeaderHome /> }}
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
