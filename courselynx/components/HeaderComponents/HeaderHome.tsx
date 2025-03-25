import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Logo from "@/components/HeaderComponents/Logo";

const HeaderHome: React.FC = () => {
  return (
    <View style={styles.header}>
      <Logo />
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <MaterialIcons name="notifications-none" size={34} color="#000" />
        </TouchableOpacity>
        <Link href={{ pathname: "/settings/profile", params: { id: "myself" } }} asChild>
          <TouchableOpacity>
            <MaterialIcons name="account-circle" size={38} color="#000" />
          </TouchableOpacity>
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

export default HeaderHome;
