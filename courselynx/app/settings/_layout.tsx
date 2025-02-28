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
          options={{ header: () => <Header title="Settings" withBorder /> }}
        />
        <Stack.Screen
          name="profile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notifications"
          options={{ header: () => <Header title="Notifications" withBorder /> }}
        />
        <Stack.Screen
          name="security"
          options={{ header: () => <Header title="Security" withBorder /> }}
        />
        <Stack.Screen
          name="privacy"
          options={{ header: () => <Header title="Privacy" withBorder /> }}
        />
        <Stack.Screen
          name="report"
          options={{ header: () => <Header title="Report a Problem" withBorder /> }}
        />
        <Stack.Screen
          name="delete"
          options={{ header: () => <Header title="Delete Account" withBorder /> }}
        />
        <Stack.Screen
          name="signout"
          options={{ header: () => <Header title="Sign Out" withBorder /> }}
        />
      </Stack>
    </>
  );
}
