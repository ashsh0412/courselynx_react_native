import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function DetailScreen() {
  const { title, color } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Link
          href={{
            pathname: "/chat/detail/notification",
            params: { title: title, color: color },
          }}
          style={styles.detailLink}
        >
          To Notifications Page
        </Link>
        <Link
          href={{
            pathname: "/chat/detail/member",
            params: { title: title, color: color },
          }}
          style={styles.detailLink}
        >
          To Members Page
        </Link>
        <Link
          href={{
            pathname: "/chat/detail/media",
            params: { title: title, color: color },
          }}
          style={styles.detailLink}
        >
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
