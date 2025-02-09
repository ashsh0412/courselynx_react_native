import { Stack } from "expo-router";
import Header from "../components/Header";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen name="index" options={{ title: "Development Screen" }} />
        <Stack.Screen
          name="chat"
          options={{
            headerTintColor: "#02102E",
            headerBackButtonDisplayMode: "minimal",
            headerTitle: () => (
              <Header
                title="Business and Finance"
                colorSquare="#E47F7F"
                hasSearch={true}
                path={"/"}
              />
            ),
            contentStyle: {
              borderTopWidth: 1,
              borderColor: "black",
            },
          }}
        />
      </Stack>
    </>
  );
}
