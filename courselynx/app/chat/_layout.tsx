import Header from "@/components/Header";
import { Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "react-native";
import { View } from 'react-native'

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
              <View style={{ paddingVertical: 25, paddingHorizontal: 0}}> // Adds space above course title
                <Header
                  title={title as string}
                  colorSquare={color as string}
                  hasSearch={true}
                  toDetail={true}
                  withBorder={true}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen name="detail" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
