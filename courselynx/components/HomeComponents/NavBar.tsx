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

const NavBar: React.FC<NavBarProps> = ({ activeScreen, setActiveScreen }) => {
  const { isHapticEnabled } = useContext(HapticContext);

  const tabs = [
    { name: "Chats", href: "/home/addChat", activeIcon: "chatbubble-ellipses", inactiveIcon: "chatbubble-ellipses-outline" },
    { name: "Courses", href: "/home/addCourse", activeIcon: "book", inactiveIcon: "book-outline" },
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
              name={(activeScreen == index ? tab.activeIcon : tab.inactiveIcon) as any}
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
        href={tabs[activeScreen].href as any}
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
    bottom: 35,
    left: "5%",
    right: "5%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 60,
    paddingHorizontal: "5%",
    backgroundColor: "rgba(45, 138, 251, 1)",
    borderRadius: 20,
  },
  navButton: {
    flex: 1,
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
    bottom: 115,
    right: "5%",
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: "rgba(45, 138, 251, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NavBar;
