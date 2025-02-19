import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import Incognito from "../../assets/svg/incognito.svg";
import Person from "../../assets/svg/person.svg";
import Camera from "../../assets/svg/appleCamera.svg";
import Photo from "../../assets/svg/applePhoto.svg";
import File from "../../assets/svg/file.svg";
import Audio from "../../assets/svg/audio.svg";
import { Interaction } from "@/components/ChatComponents/ChatMessage";
import ChatMessage from "@/components/ChatComponents/ChatMessage";
import ChatDate from "@/components/ChatComponents/ChatDate";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAnimatedKeyboard } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import GestureRecognizer from "react-native-swipe-gestures";

const getRandomInteractions = () => {
  if (Math.random() > 0.5) return undefined; // 50% chance of no interactions
  const shuffled = [...interactions].sort(() => 0.5 - Math.random()); // Shuffle interactions
  return shuffled.slice(0, Math.floor(Math.random() * 2) + 1); // Pick 1 or 2
};

// MOCK DATA WITH COLORS
const chatMessages = [
  {
    id: 1,
    sender: "Emily Johnson",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: new Date().toISOString(),
    color: "#833C3C",
  },
  {
    id: 2,
    sender: "Michael Smith",
    message:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    color: "#F97316",
  },
  {
    id: 3,
    sender: "Emily Johnson",
    message:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    color: "#833C3C",
  },
  {
    id: 4,
    sender: "Sophia Martinez",
    message:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    color: "#80BD72",
  },
  {
    id: 5,
    sender: "David Brown",
    message:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    date: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    color: "#B48BE9",
  },
  {
    id: 6,
    sender: "Alice Walker",
    message: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    color: "#4CAF50",
  },
  {
    id: 7,
    sender: "Michael Smith",
    message: "Vestibulum fringilla pede sit amet augue.",
    date: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000
    ).toISOString(),
    color: "#F97316",
  },
  {
    id: 8,
    sender: "Sophia Martinez",
    message:
      "Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.",
    date: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000
    ).toISOString(),
    color: "#80BD72",
  },
  {
    id: 9,
    sender: "David Brown",
    message: "Maecenas malesuada elit lectus felis, malesuada ultricies.",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    color: "#B48BE9",
  },
  {
    id: 10,
    sender: "Sophia Martinez",
    message: "Donec in velit vel ipsum auctor pulvinar.",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    color: "#80BD72",
  },
];

const interactions: Interaction[] = [
  { emoji: "😂", count: 5 },
  { emoji: "❤️", count: 3 },
  { emoji: "👍", count: 8 },
];

export default function GroupChatScreen() {
  const messageRef = useRef<TextInput | null>(null);
  const keyboard = useAnimatedKeyboard();
  const [isAnon, setIsAnon] = useState(false);
  const [isModal, setIsModal] = useState(false);

  {
    /* Allows smooth movement of text input in chat on keyboard open */
  }
  const animatedInputStyle = useAnimatedStyle(() => {
    return {
      bottom: keyboard.height.value > 32 ? keyboard.height.value : 32,
      backgroundColor: keyboard.height.value > 0 ? "transparent" : "white",
    };
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.messagesContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 190 : 38}
      >
        {/* Scrollable chat container that renders chat */}
        <FlatList
          data={chatMessages.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            const currentDate = new Date(item.date);
            const previousDate =
              index > 0 ? new Date(chatMessages[index - 1].date) : null;
            const isFirstMessage = index === 0;
            const isNewDay =
              previousDate &&
              currentDate.toDateString() !== previousDate.toDateString();
            const isMoreThanOneHourApart =
              previousDate &&
              currentDate.getTime() - previousDate.getTime() > 60 * 60 * 1000;
            const shouldShowDate =
              isFirstMessage || isNewDay || isMoreThanOneHourApart;
            const selectedInteractions =
              index % 3 === 0 && index !== 0
                ? getRandomInteractions()
                : undefined;
            return (
              <View key={item.id}>
                {shouldShowDate && <ChatDate date={item.date} />}
                <ChatMessage
                  id={item.id}
                  message={item.message}
                  titleName={item.sender}
                  interactions={selectedInteractions}
                  iconColor={item.color}
                />
              </View>
            );
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
            paddingTop: 25,
          }}
          keyboardShouldPersistTaps="handled"
          inverted={true}
          keyboardDismissMode={"on-drag"} // Swipe down to exit keyboard
        />
      </KeyboardAvoidingView>

      {/* Container for chat input and group chat interaction */}
      <Animated.View style={[styles.bottomChatContainer, animatedInputStyle]}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsModal(true)}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.chatInput}
            ref={messageRef}
            placeholder="Type here..."
            placeholderTextColor={"#C5C5C7"}
          />
          <TouchableWithoutFeedback onPress={() => setIsAnon((prev) => !prev)}>
            <View
              style={[
                styles.incognitoWrapper,
                { backgroundColor: isAnon ? "#2D8AFB" : "#B4B8BF" },
              ]}
            >
              <Incognito
                width={15}
                height={15}
                color={"white"}
                fill={"white"}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.typingContainer}>
          {/* Maps currently typing people */}
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={[styles.typingIcon, { zIndex: index }]}>
              <Person width={40} height={40} />
            </View>
          ))}
          <Text style={styles.typingDots}>...</Text>
        </View>
      </Animated.View>

      {isModal && (
        <BlurView
          intensity={15}
          style={styles.blur}
          experimentalBlurMethod="dimezisBlurView"
        >
          <GestureRecognizer
            style={{ flex: 1, zIndex: 1 }}
            onSwipeDown={() => setIsModal(false)}
          >
            <Modal
              transparent={true}
              visible={isModal}
              animationType="slide"
              onRequestClose={() => setIsModal(false)}
            >
              {/* Handles clicks to close modal on click outside of the modal */}
              <Pressable
                onPress={(event) =>
                  event.target == event.currentTarget && setIsModal(false)
                }
                style={{ flex: 1 }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <View style={styles.modalBar} />
                    <View style={styles.modalButtonContainer}>
                      <TouchableOpacity
                        style={styles.modalChatButton}
                        onPress={() => {}}
                      >
                        <View
                          style={[
                            styles.modalIcon,
                            { backgroundColor: "#B4B8BF" },
                          ]}
                        >
                          <Camera width={35} height={35} />
                        </View>
                        <Text style={styles.modalChatText}>Camera</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalChatButton}
                        onPress={() => {}}
                      >
                        <View
                          style={[
                            styles.modalIcon,
                            { backgroundColor: "#FFF" },
                          ]}
                        >
                          <Photo width={35} height={35} />
                        </View>
                        <Text style={styles.modalChatText}>Photos</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalChatButton}
                        onPress={() => {}}
                      >
                        <View
                          style={[
                            styles.modalIcon,
                            { backgroundColor: "#7dabe7" },
                          ]}
                        >
                          <File width={35} height={35} />
                        </View>
                        <Text style={styles.modalChatText}>Documents</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalChatButton}
                        onPress={() => {}}
                      >
                        <View
                          style={[
                            styles.modalIcon,
                            { backgroundColor: "#f9815e" },
                          ]}
                        >
                          <Audio width={25} height={25} />
                        </View>
                        <Text style={styles.modalChatText}>Audio</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </GestureRecognizer>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  messagesContainer: {
    height: "auto",
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: 600,
    margin: 0,
    width: "100%",
    marginBottom: 140,
    gap: 37,
  },
  typingContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "flex-start",
    height: 40,
    width: 350,
    backgroundColor: "transparent",
  },
  typingIcon: {
    backgroundColor: "lightgray",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    marginRight: -15,
  },
  typingDots: {
    fontSize: 40,
    marginLeft: 15,
    backgroundColor: "transparent",
  },
  bottomChatContainer: {
    flex: 1,
    position: "absolute",
    bottom: 38,
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    width: "100%",
    height: 70,
    backgroundColor: "transparent",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: "white",
  },
  addButton: {
    fontFamily: "SF Pro Text",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginRight: 12,
    height: 34,
    width: 34,
    backgroundColor: "#E8E9EB",
  },
  addText: {
    justifyContent: "center",
    alignItems: "center",
    color: "#2D8AFB",
    fontSize: 25,
    height: "100%",
  },
  chatInput: {
    fontFamily: "SF Pro",
    paddingTop: 9,
    paddingRight: 35,
    paddingBottom: 9,
    paddingLeft: 12,
    fontSize: 15,
    width: 302,
    height: 36,
    borderColor: "#C5C5C7",
    borderRadius: 20,
    borderWidth: 1,
  },
  incognitoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    position: "absolute",
    right: 14,
    bottom: 14,
    width: 20,
    height: 20,
  },
  blur: {
    position: "absolute",
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
    top: -200,
    left: 0,
    right: 0,
    height: "150%",
    backgroundColor: "rgba(217, 217, 217, 0.05)",
    zIndex: 1,
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 238,
    zIndex: 1,
  },
  modalContent: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#2D8AFB",
    opacity: 0.9,
    borderRadius: 16,
  },
  modalBar: {
    alignSelf: "center",
    width: 30,
    height: 3,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
    borderRadius: 10,
    marginTop: 9,
  },
  modalButtonContainer: {
    flexDirection: "column",
    marginLeft: 19,
    marginTop: 9,
  },
  modalChatButton: {
    flexDirection: "row",
    marginBottom: 11,
    alignItems: "center",
    gap: 26,
  },
  modalIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 500,
    overflow: "hidden",
  },
  modalChatText: { fontFamily: "SF Pro", fontSize: 19, color: "#FFF" },
});
