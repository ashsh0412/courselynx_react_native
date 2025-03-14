import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface UserIconProps {
  id: number;
  uri: string;
};

const UserIcon: React.FC<UserIconProps> = ({
  id,
  uri,
}) => {

  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconLeftBorder} />
      <TouchableOpacity
        style={[styles.messageIcon, { backgroundColor: uri }]}
        activeOpacity={0.8}
        onPress={() => router.push({
          pathname: "/settings/profile",
          params: { id: id },
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 6,
    width: 50,
    height: 40,
    flexDirection: "row",
  },
  iconLeftBorder: {
    width: 4,
    height: 40,
    borderLeftWidth: 4,
    borderColor: "#2D8AFB",
    borderRadius: 2,
    marginRight: 5,
  },
  messageIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});

export default UserIcon;
