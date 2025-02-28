import { TouchableOpacity, Text, StyleSheet, StyleProp, TextStyle, ViewStyle, GestureResponderEvent } from "react-native";

interface ButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  buttonStyles = {},
  textStyles = {},
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyles]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyles]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(45, 138, 251, 1)",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
