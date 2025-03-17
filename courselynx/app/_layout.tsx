import { HapticProvider } from "@/contexts/HapticContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { WorkSans_600SemiBold, useFonts } from "@expo-google-fonts/work-sans";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    WorkSans_600SemiBold,
  });
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <HapticProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="chat"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </HapticProvider>
    </>
  );
}
