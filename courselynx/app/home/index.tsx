import { View, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import NavBar from "./navbar";
import ChatsTab from "./chats";
import CoursesTab from "./courses";

export default function HomeScreen() {
  const [activeScreen, setActiveScreen] = useState<"chats" | "courses">("chats");

  return (
    <>
      <View style={styles.header}>
        <Image source={require("@/assets/images/CourseLynxLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.iconContainer}>
          <MaterialIcons name="notifications-none" size={34} color="#000" />
          <Link
            href={{ pathname: "/settings/profile", params: { username: "myself" } }}
          >
            <MaterialIcons name="account-circle" size={38} color="#000" />
          </Link>
        </View>
      </View>

      {activeScreen === "chats" ? <ChatsTab /> : <CoursesTab />}
      <NavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
    },
    logo: { 
      width: 190, 
      height: 55 
    },
    iconContainer: { 
      flexDirection: "row", 
      alignItems: "center", 
      gap: 10 
    }
})
