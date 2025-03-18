import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import styles from "./settings.styles";

export default function SettingsScreen() {
  const settingsOptions = [
    {
      title: "ACCOUNT",
      options: [
        { label: "Notifications", icon: "notifications-outline", href: "/settings/notifications" },
        { label: "Security", icon: "shield-checkmark-outline", href: "/settings/security" },
        { label: "Privacy", icon: "lock-closed-outline", href: "/settings/privacy" },
      ],
    },
    {
      title: "ACTIONS",
      options: [
        { label: "Report a Problem", icon: "flag-outline", href: "/settings/report" },
        { label: "Delete Account", icon: "person-remove-outline", href: "/settings/delete" },
        { label: "Sign Out", icon: "log-out-outline", href: "/settings/signout" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {settingsOptions.map(({title, options}) => (
        <View key={title}>
          <Text style={styles.sectionTitle}>{title}</Text>

          <View style={styles.sectionContainer}>
            {options.map((item, index) => (
              <Link href={item.href as any} key={index} asChild>

                <TouchableOpacity style={styles.sectionRow}>
                  <Ionicons name={item.icon as any} size={24} />
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
