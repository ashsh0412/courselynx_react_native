import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function DetailScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Link href={"/chat/detail/notification"} style={styles.detailLink}>
          To Notifications Page
        </Link>
        <Link href={"/chat/detail/member"} style={styles.detailLink}>
          To Members Page
        </Link>
        <Link href={"/chat/detail/media"} style={styles.detailLink}>
          To Media Page
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailLink: {
    paddingVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
