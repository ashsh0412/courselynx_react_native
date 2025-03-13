import React, { useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native";
import { Animated } from "react-native";
import { chats } from "@/mock/chats";

interface Chat {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  color: string;
}

export default function ChatsTab() {
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

        {/* Modal for muting chat's notifications */}
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
