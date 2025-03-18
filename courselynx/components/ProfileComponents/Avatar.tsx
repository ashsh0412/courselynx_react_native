import { View, Image, TouchableOpacity, StyleSheet, StyleProp, ImageStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AvatarProps {
  uri: string;
  hasEditBtn?: boolean;
  setUri?: (uri: string) => void;
  isBig?: boolean;
  isSmall?: boolean;
  style?: StyleProp<ImageStyle>;
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  hasEditBtn = false,
  setUri = () => { },
  isBig = false,
  isSmall = false,
  style,
}) => {
  return (
    <View>
      <Image
        source={{ uri: uri }}
        style={[styles.avatar, isBig && styles.big_avatar, isSmall && styles.small_avatar, style]}
      />
      {hasEditBtn &&
        <TouchableOpacity style={styles.editButton} onPress={() => setUri("h")}>
          <Ionicons name="pencil" size={18} color="white" />
        </TouchableOpacity>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  big_avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  small_avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    right: 0,
    backgroundColor: "rgba(45, 138, 251, 1)",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Avatar;
