import Header from "@/components/Header";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function SettingLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ header: () => <Header title="Settings" /> }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
