import Header from "@/components/Header";
import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "react-native";

export default function ChatLayout() {
  const { title, color } = useLocalSearchParams();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <Header
                title={title as string}
                colorSquare={color as string}
                hasSearch={true}
                toDetail={true}
                withBorder={true}
              />
            ),
          }}
        />
        <Stack.Screen name="detail" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
