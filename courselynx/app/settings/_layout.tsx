import Header from "@/components/Header";
import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "react-native";

export default function SettingLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <Header title="My Profile" hasShare={true} />,
          }}
        />
      </Stack>
    </>
  );
}
