/**
 * An component for user icon, groupchat icon, and course icon.
 * Needs to connect to Avatar component later.
 */

import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";

interface ProfileIconProps {
  id: number;
  uri?: string;
  size?: number;
  hasHighlight?: boolean;
  isCircle?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  id,
  uri = "",
  size = 40,
  hasHighlight = false,
  isCircle = false,
  style,
}) => {
  return (
    <View>
      {hasHighlight && (
        <View style={[styles.highlight, { height: size }]} />
      )}

      <TouchableOpacity
        style={[
          { width: size, height: size, borderRadius: isCircle ? size / 2 : size / 4 },
          style,
          { backgroundColor: uri },
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
  highlight: {
    position: "absolute",
    left: -7,
    width: 4,
    backgroundColor: "#2D8AFB",
    borderRadius: 2,
  },
});

export default ProfileIcon;
