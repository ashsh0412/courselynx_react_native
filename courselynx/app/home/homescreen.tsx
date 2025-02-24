import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableWithoutFeedback } from "react-native";

interface Chat {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  color: string;
}

const chats: Chat[] = [
  {
    id: 1,
    name: "Business and Finance",
    message: "Sara: What should I invest in?",
    time: "5:05 PM",
    unread: 3,
    color: "#f87171",
  },
  {
    id: 2,
    name: "Statistics",
    message: "John: Whats the answers to HW 5?",
    time: "4:15 PM",
    unread: 7,
    color: "#34d399",
  },
  {
    id: 3,
    name: "World History",
    message: "Steve: What is the capital of Canada?",
    time: "3:02 PM",
    unread: 0,
    color: "#facc15",
  },
  {
    id: 4,
    name: "English",
    message: "Brittany: Great Gatsby opinions?",
    time: "3:00 PM",
    unread: 5,
    color: "#f472b6",
  },
  {
    id: 5,
    name: "Music Theory",
    message: "Tiana: I play the trumpet!",
    time: "2:15 PM",
    unread: 0,
    color: "#c084fc",
  },
  {
    id: 6,
    name: "Sports",
    message: "UF: Good home season!",
    time: "1:55 PM",
    unread: 3,
    color: "#60a5fa",
  },
];

export default function HomeScreen() {
  const [activeSwipe, setActiveSwipe] = useState<number | null>(null);
  const currentSwipeRef = useRef<Swipeable | null>(null);

  const renderRightActions = () => (
    <View style={styles.swipeActions}>
      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="more-horiz" size={24} color="#fff" />
        <Text style={styles.actionText}>More</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionButton, styles.muteButton]}>
        <MaterialIcons name="notifications-off" size={24} color="#fff" />
        <Text style={styles.actionText}>Mute</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/CourseLynxLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.iconContainer}>
          <MaterialIcons name="notifications-none" size={34} color="#000" />
          <Link href="/login">
            <MaterialIcons name="account-circle" size={38} color="#000" />
          </Link>
        </View>
      </View>

      <ScrollView style={styles.chatList}>
        {chats.map((chat) => (
          <Swipeable
            key={chat.id}
            ref={(ref) => (currentSwipeRef.current = ref)}
            renderRightActions={renderRightActions}
            onSwipeableWillOpen={() => {
              if (currentSwipeRef.current) {
                currentSwipeRef.current.close();
              }
              setActiveSwipe(chat.id);
            }}
            onSwipeableClose={() => setActiveSwipe(null)}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                if (activeSwipe === null) {
                  router.push({
                    pathname: "/chat",
                    params: { title: chat.name, color: chat.color },
                  });
                }
              }}
            >
              <View style={[styles.chatItem, { backgroundColor: "#fff" }]}>
                <View
                  style={[
                    styles.chatIcon,
                    { backgroundColor: chat.color || "#000" },
                  ]}
                />
                <View style={styles.chatInfo}>
                  <Text
                    style={[
                      styles.chatName,
                      chat.unread > 0 ? styles.boldText : null,
                    ]}
                  >
                    {chat.name}
                  </Text>
                  <Text
                    style={[
                      styles.chatMessage,
                      chat.unread > 0 ? styles.boldText : null,
                    ]}
                  >
                    {chat.message}
                  </Text>
                </View>
                <View style={styles.chatMeta}>
                  <Text
                    style={[
                      styles.chatTime,
                      chat.unread > 0 ? styles.boldText : null,
                    ]}
                  >
                    {chat.time}
                  </Text>
                  {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Swipeable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  logo: { width: 190, height: 55 },
  iconContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
  chatList: { padding: 20 },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  chatIcon: { width: 48, height: 48, borderRadius: 12, marginRight: 16 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 18 },
  chatMessage: {},
  chatMeta: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 48,
  },
  chatTime: {},
  unreadBadge: {
    backgroundColor: "#3b82f6",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  unreadText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  swipeActions: { flexDirection: "row", alignItems: "center" },
  actionButton: {
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  muteButton: { backgroundColor: "#ff6666" },
  actionText: { color: "#fff", fontSize: 14, marginTop: 4 },
  boldText: { fontWeight: "600" },
});
