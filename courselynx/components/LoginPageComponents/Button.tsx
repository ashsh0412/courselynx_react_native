import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : styles.enabledButton]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 17,
    alignItems: "center",
    marginVertical: 15,
    borderWidth: 1,
  },
  enabledButton: {
    backgroundColor: "#4285F4",
    borderColor: "#FFFFFF",
  },
  disabledButton: {
    backgroundColor: "#9cc7fd",
    borderColor: "#FFFFFF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
