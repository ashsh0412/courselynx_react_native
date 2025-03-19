import { useEffect, useState } from "react";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import NavBar from "@/components/HomeComponents/NavBar";
import ChatsTab from "./chats";
import CoursesTab from "./courses";

export default function HomeScreen() {
  const [activeScreen, setActiveScreen] = useState(0);
  const fade = useSharedValue(1);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.quad) });
  }, [activeScreen]);

  const handleSwitchTab = (screen: number) => {
    fade.value = 0;
    setActiveScreen(screen);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
  }));

  return (
    <View style={styles.container}>

      <Animated.View style={[styles.tabContainer, animatedStyle]}>
        {activeScreen ? <CoursesTab /> : <ChatsTab />}
      </Animated.View>

      <NavBar activeScreen={activeScreen} setActiveScreen={handleSwitchTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flex: 1,
  },
});
