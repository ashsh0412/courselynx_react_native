import { View, Image, TouchableOpacity, StyleSheet, StyleProp, ImageStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AvatarProps {
  uri: string;
  hasEditBtn?: boolean;
  setUri?: (uri: string) => void;
  size?: number;
  style?: StyleProp<ImageStyle>;
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  hasEditBtn = false,
  setUri = () => { },
  size = 40,
  style,
}) => {
  return (
    <View>
      <Image
        source={{ uri: uri }}
        style={[{ height: size, width: size, borderRadius: size / 2 }, style]}
      />
      {hasEditBtn &&
        <TouchableOpacity style={styles.editButton} onPress={() => { }}>
          <Ionicons name="pencil" size={18} color="white" />
        </TouchableOpacity>
      }
    </View>
  )
};

const styles = StyleSheet.create({
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
