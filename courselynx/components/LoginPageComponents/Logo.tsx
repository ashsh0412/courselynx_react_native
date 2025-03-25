import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/ai.png")}
        style={styles.icon}
      />
      <Text style={styles.text}>CourseLynx</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    fontStyle: "italic",
  },
});
