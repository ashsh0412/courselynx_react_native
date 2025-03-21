import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native";
import { Animated } from "react-native";

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
  const activeSwipeRef = useRef<number | null>(null);
  const [muteModalVisible, setMuteModalVisible] = useState(false);
  const swipeRefs = useRef<{ [key: number]: Swipeable | null }>({});

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.swipeActions}>
        <TouchableOpacity onPress={() => Alert.alert("More test")}>
          <Animated.View style={[styles.actionButton, { transform: [{ scale }] }]}>
            <MaterialIcons name="more-horiz" size={24} color="#fff" />
            <Text style={styles.actionText}>More</Text>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMuteModalVisible(true)}>
          <Animated.View style={[styles.actionButton, styles.muteButton, { transform: [{ scale }] }]}>
            <MaterialIcons name="notifications-off" size={24} color="#fff" />
            <Text style={styles.actionText}>Mute</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const onSelectMuteOption = (option: string) => {
    Alert.alert(`Selected: ${option}`);
    setMuteModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/CourseLynxLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.iconContainer}>
            <MaterialIcons name="notifications-none" size={34} color="#000" />
            <Link
              href={{ pathname: "/settings/profile", params: { username: "myself" } }}
            >
              <MaterialIcons name="account-circle" size={38} color="#000" />
            </Link>
          </View>
        </View>

        <ScrollView style={styles.chatList}>
          {chats.map((chat) => (
            <Swipeable
              key={chat.id}
              ref={(ref) => (swipeRefs.current[chat.id] = ref)}
              renderRightActions={renderRightActions}
              overshootRight={false}
              rightThreshold={5}
              onSwipeableWillOpen={() => {
                Object.keys(swipeRefs.current).forEach((key) => {
                  if (parseInt(key) !== chat.id) {
                    swipeRefs.current[parseInt(key)]?.close();
                  }
                });
                activeSwipeRef.current = chat.id;
                setActiveSwipe(chat.id);
              }}
              onSwipeableClose={() => {
                setActiveSwipe(null);
                activeSwipeRef.current = null;
              }}
            >
            <View pointerEvents={activeSwipe ? "none" : "auto"}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (activeSwipeRef.current === null) {
                    router.push({
                      pathname: "/chat",
                      params: { title: chat.name, color: chat.color },
                    });
                  }
                }}
              >
                  <View style={[styles.chatItem, { backgroundColor: "#fff" }]}>
                    <View
                      style={[styles.chatIcon, { backgroundColor: chat.color || "#000" }]}
                    />
                    <View style={styles.chatInfo}>
                      <Text style={[styles.chatName, chat.unread > 0 ? styles.boldText : null]}>
                        {chat.name}
                      </Text>
                      <Text style={[styles.chatMessage, chat.unread > 0 ? styles.boldText : null]}>
                        {chat.message}
                      </Text>
                    </View>
                    <View style={styles.chatMeta}>
                      <Text style={[styles.chatTime, chat.unread > 0 ? styles.boldText : null]}>
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
              </View>
            </Swipeable>
          ))}
        </ScrollView>

        <Modal
          visible={muteModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMuteModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setMuteModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Mute chat's notifications for:</Text>
                  {["1 hour", "3 hours", "8 hours", "1 day", "7 days", "Always"].map((option, index, arr) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => onSelectMuteOption(option)}
                      style={[
                        styles.modalOption,
                        index < arr.length - 1 ? styles.modalOptionSeparator : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.modalOptionText,
                          option === "Always" ? styles.alwaysOption : null,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </GestureHandlerRootView>
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
  chatList: {},
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
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
    width: 64,
    height: 64,
  },
  muteButton: { backgroundColor: "#ff6666" },
  actionText: { color: "#fff", fontSize: 14, marginTop: 4 },
  boldText: { fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  modalOption: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: "center",
  },
  alwaysOption: {
    color: "red",
  },
  modalOptionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
