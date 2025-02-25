import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Header from "../../../components/Header";

export default function DetailLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ header: () => <Header title="Details" /> }}
        />
        <Stack.Screen
          name="notification"
          options={{ header: () => <Header title="Notifications" /> }}
        />
        <Stack.Screen
          name="member"
          options={{ header: () => <Header title="Members" /> }}
        />
        <Stack.Screen
          name="media"
          options={{ header: () => <Header title="Media" /> }}
        />
        <Stack.Screen
          name="search"
          options={{
            header: () => <Header title="Search Chat" withBorder={true} />,
          }}
        />
      </Stack>
    </>
  );
}
