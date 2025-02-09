import Header from "@/components/Header";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function ChatLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen
          name="detail"
          options={{
            headerTintColor: "#02102E",
            headerBackButtonDisplayMode: "minimal",
            headerTitle: () => (
              <Header title="Details" hasShare={true} path={"/chat/detail"} />
            ),
          }}
        />
      </Stack>
    </>
  );
}
