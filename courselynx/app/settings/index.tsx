import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import styles from "./SettingsStyles";

export default function SettingsScreen() {
  const settingsOptions = {
    "ACCOUNT": [
      { icon: "notifications-outline", label: "Notifications", href: "/settings/notifications" as const },
      { icon: "shield-checkmark-outline", label: "Security", href: "/settings/security" as const },
      { icon: "lock-closed-outline", label: "Privacy", href: "/settings/privacy" as const },
    ],
    "ACTIONS": [
      { icon: "flag-outline", label: "Report a Problem", href: "/settings/report" as const },
      { icon: "person-remove-outline", label: "Delete Account", href: "/settings/delete" as const },
      { icon: "log-out-outline", label: "Sign Out", href: "/settings/signout" as const },
    ],
  };

  return (
    <View style={styles.container}>
      {Object.entries(settingsOptions).map(([section, options]) => (
        <View key={section}>
          <Text style={styles.sectionTitle}>{section}</Text>
          <View style={styles.sectionContainer}>
            {options.map((item, index) => (
              <Link href={item.href} key={index} asChild>
                <TouchableOpacity key={index} style={styles.sectionRow}>
                  <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={24} />
                  <Text style={styles.sectionText}>{item.label}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
