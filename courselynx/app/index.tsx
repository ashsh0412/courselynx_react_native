import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity style={styles.devButton}>
        <Link
          href={{
            pathname: "/chat",
            params: { title: "Business and Finance", color: "#E47F7F" },
          }}
        >
          <Text>Group Chat Page</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  devButton: {
    color: "black",
    padding: 4,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "lightGray",
  },
});
