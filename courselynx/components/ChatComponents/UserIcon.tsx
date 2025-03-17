import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface UserIconProps {
  id: number;
  uri: string;
  hasHighlight?: boolean;
  isMember?: boolean;
}

const UserIcon: React.FC<UserIconProps> = ({
  id,
  uri,
  hasHighlight,
  isMember,
}) => {
  return (
    <View
      style={[
        styles.iconContainer,
        isMember && { marginTop: 0, width: 50, height: 50 },
      ]}
    >
      {isMember || (
        <View
          style={[styles.iconLeftBorder, { opacity: hasHighlight ? 1 : 0 }]}
        />
      )}
      <TouchableOpacity
        style={[
          styles.messageIcon,
          { backgroundColor: uri },
          isMember && { width: 50, height: 50 },
        ]}
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/settings/profile",
            params: { id: id },
          })
        }
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
