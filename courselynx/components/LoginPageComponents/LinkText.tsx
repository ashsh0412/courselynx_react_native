import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface LinkTextProps {
  text: string;
  onPress: () => void;
}

export const LinkText: React.FC<LinkTextProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "#808080",
    fontSize: 14,
    textDecorationLine: "underline",
    marginVertical: 5,
  },
});
