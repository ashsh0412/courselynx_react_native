import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const settingsOptions = {
    "ACCOUNT": [
      { icon: "notifications-outline", label: "Notifications" },
      { icon: "shield-checkmark-outline", label: "Security" },
      { icon: "lock-closed-outline", label: "Privacy" },
    ],
    "ACTIONS": [
      { icon: "flag-outline", label: "Report a Problem" },
      { icon: "person-remove-outline", label: "Delete Account" },
      { icon: "log-out-outline", label: "Sign Out" },
    ]
  };

  return (
    <View style={styles.container}>
      {Object.entries(settingsOptions).map(([section, options]) => (
        <View key={section}>
          <Text style={styles.sectionTitle}>{section}</Text>
          <View style={styles.sectionContainer}>
            {options.map((item, index) => (
              <TouchableOpacity key={index} style={styles.option}>
                <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={24} />
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 20,
  },
  sectionContainer: {
    backgroundColor: "#EEF5FF",
    borderRadius: 15,
    padding: 15,
    gap: 15,
  },
  option: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

