import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { HapticContext } from "@/contexts/HapticContext";

interface NavBarProps {
  activeScreen: number;
  setActiveScreen: (screen: number) => void;
}

export default function NavBar({ activeScreen, setActiveScreen }: NavBarProps) {
  const { isHapticEnabled } = useContext(HapticContext);

  const tabs = [
    { name: "Chats", href: "/home/addChat" as const, activeIcon: "chatbubble-ellipses" as const, inactiveIcon: "chatbubble-ellipses-outline" as const },
    { name: "Courses", href: "/home/addCourse" as const, activeIcon: "book" as const, inactiveIcon: "book-outline" as const },
  ];

  const handlePress = (screen: number) => {
    isHapticEnabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveScreen(screen);
  };

  return (
    <>
      <View style={styles.navContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={styles.navButton}
            activeOpacity={0.6}
          >
            <Ionicons
              name={activeScreen == index ? tab.activeIcon : tab.inactiveIcon}
              size={28}
              color="#fff"
            />
            <Text style={[styles.navText, activeScreen == index && styles.activeText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Link
        href={tabs[activeScreen].href}
        asChild
      >
        <TouchableOpacity style={styles.addButton} activeOpacity={0.6}>
          <Ionicons name="add" size={34} color="#fff" />
        </TouchableOpacity>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 60,
    gap: 40,
    paddingHorizontal: 10,
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: "#fff",
  },
  activeText: {
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 120,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
});
