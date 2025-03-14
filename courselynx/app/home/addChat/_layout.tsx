import HeaderLogo from "@/components/HeaderLogo";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function SettingLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ header: () => <HeaderLogo /> }}
        />
      </Stack>
    </>
  );
}
