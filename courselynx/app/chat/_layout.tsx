import Header from "@/components/Header";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function ChatLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <Header
                title="Business and Finance"
                colorSquare="#E47F7F"
                hasSearch={true}
                toDetail={true}
              />
            ),
          }}
        />
        <Stack.Screen name="detail" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
