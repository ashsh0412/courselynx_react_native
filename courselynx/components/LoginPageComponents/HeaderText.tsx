import React from "react";
import { Text, StyleSheet } from "react-native";

interface HeaderTextProps {
  text: string;
}

export const HeaderText: React.FC<HeaderTextProps> = ({ text }) => {
  return <Text style={styles.header}>{text}</Text>;
};

const styles = StyleSheet.create({
  header: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
