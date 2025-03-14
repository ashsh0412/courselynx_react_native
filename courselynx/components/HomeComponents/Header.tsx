import { View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Logo from "@/components/Logo";

export default function HomeHeader() {
  return (
    <View style={styles.header}>
      <Logo />
      <View style={styles.iconContainer}>
        <MaterialIcons name="notifications-none" size={34} color="#000" />
        <Link
          href={{ pathname: "/settings/profile", params: { id: "myself" } }}
        >
          <MaterialIcons name="account-circle" size={38} color="#000" />
        </Link>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 38,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
});
