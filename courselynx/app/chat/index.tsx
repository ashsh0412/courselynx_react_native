import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Incognito from "../../assets/svg/incognito.svg";
import Person from "../../assets/svg/person.svg";
import Camera from "../../assets/svg/appleCamera.svg";
import Photo from "../../assets/svg/applePhoto.svg";
import File from "../../assets/svg/file.svg";
import Audio from "../../assets/svg/audio.svg";
import ChatMessage from "@/components/ChatComponents/ChatMessage";
import ChatDate from "@/components/ChatComponents/ChatDate";
import MessageContainer from "@/components/ChatComponents/MessageContainer";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Modal from "@/components/Modal";
import styles from "./index.styles";

import { useAnimatedKeyboard } from "react-native-reanimated";
import * as DocumentPicker from "expo-document-picker";
import { Audio as AudioPlayer } from "expo-av";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { chatMessages, interactions } from "@/mock/chatMessages";
import * as Media from "@/utils/media";
import ChatVisualMedia from "@/components/ChatComponents/ChatVisualMedia";
import ChatVisualContainer from "@/components/ChatComponents/ChatVisualContainer";
import ChatFile from "@/components/ChatComponents/ChatFile";

type textMessage = {
  id: number;
  sender: string;
  message: string;
  date: string;
  color: string;
};

type mediaMessage = {
  id: number;
  sender: string;
  uris: string[];
  date: string;
  color: string;
  types: string[];
};

type fileMessage = {
  id: number;
  sender: string;
  uris: string[];
  date: string;
  color: string;
  names: string[];
  sizes: number[];
};

type MediaTypes = "image" | "livePhoto" | "video" | "none";

const countImageLive = (media: MediaTypes[]): number =>
  media.filter((type) => type === "image" || type === "livePhoto").length;

const countVideos = (media: MediaTypes[]): number =>
  media.filter((type) => type === "video").length;

const getRandomInteractions = () => {
  if (Math.random() > 0.5) return undefined; // 50% chance of no interactions
  const shuffled = [...interactions].sort(() => 0.5 - Math.random()); // Shuffle interactions
  return shuffled.slice(0, Math.floor(Math.random() * 2) + 1); // Pick 1 or 2
};

export default function GroupChatScreen() {
  const inputRef = useRef<TextInput | null>(null);
  const messageRef = useRef<string>("");
  const keyboard = useAnimatedKeyboard();
  const [isAnon, setIsAnon] = useState(false);

  const [isModal, setIsModal] = useState(false);

  const [chatMedia, setChatMedia] = useState<string[] | undefined>([]);
  const [chatMediaType, setChatMediaType] = useState<MediaTypes[]>([]);
  const [chatMediaSizes, setChatMediaSizes] = useState<
    { width: number; height: number }[]
  >([]);
  const [chatFile, setChatFile] = useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);

  {
    /* MAKE SURE CHATS ARE SORTED EVERYTIME THEY ARE FETCHED */
  }
  const [chats, setChats] = useState<
    (textMessage | mediaMessage | fileMessage)[]
  >(
    chatMessages.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  );

  const [recording, setRecording] = useState<AudioPlayer.Recording | null>();
  const [audioUri, setAudioUri] = useState<string | null>("");
  const [sound, setSound] = useState<AudioPlayer.Sound | null>();

  const [isAudioPopupVisible, setIsAudioPopupVisible] = useState(false);

  {
    /* FOR SEARCH CHAT AUTO SCROLL */
  }
  const { scrollId } = useLocalSearchParams();
  const flatListRef = useRef<FlatList | null>(null);
  const scrollToChat = (id: number) => {
    if (flatListRef.current) {
      const index = chats.findIndex((chat) => chat.id === id);
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };
  useEffect(() => {
    console.log(scrollId);
    if (scrollId) {
      setTimeout(() => {
        scrollToChat(parseInt(scrollId as string));
      }, 500);
    }
    return () => {};
  }, [scrollId]);

  const sendAudioMessage = async () => {
    if (!audioUri) {
      Alert.alert("No Audio", "Please record an audio message first.");
      return;
    }

    console.log("Sending audio file:", audioUri);
  };

  const blinkingOpacity = useSharedValue(1);

  useEffect(() => {
    if (recording) {
      blinkingOpacity.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1, // Infinite loop
        true // Reverses the animation
      );
    } else {
      blinkingOpacity.value = 1; // Reset opacity when recording stops
    }
  }, [recording]);

  const blinkingStyle = useAnimatedStyle(() => {
    return {
      opacity: blinkingOpacity.value,
    };
  });

  {
    /* Allows smooth movement of text input in chat on keyboard open */
  }
  const animatedInputStyle = useAnimatedStyle(() => {
    return {
      bottom: keyboard.height.value > 24 ? keyboard.height.value : 24,
    };
  });

  const animatedMessagesStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: keyboard.height.value > 0 ? keyboard.height.value - 24 : 0,
    };
  });

  const handleSendMessage = () => {
    console.log(messageRef.current);
    if (messageRef.current) {
      const message = messageRef.current.trim();
      if (message) {
        setChats((prev) => [
          {
            id: prev.length + 1,
            sender: "You",
            message: message,
            date: new Date().toISOString(),
            color: "#000",
          },
          ...prev,
        ]);
        inputRef.current?.clear();
        messageRef.current = "";
      }
    }
  };

  useEffect(() => {
    if (chatMedia?.length && chatMediaType.length) {
      setIsModal(false);
      const mediaChat = {
        id: chats.length + 1,
        sender: "You",
        uris: chatMedia,
        date: new Date().toISOString(),
        color: "#000",
        types: chatMediaType,
        dimensions: chatMediaSizes,
      };
      console.log(mediaChat);
      setChats((prev) => [mediaChat, ...prev]);
      setChatMedia([]);
      setChatMediaType([]);
      setChatMediaSizes([]);
    }
  }, [chatMedia, chatMediaType]);

  useEffect(() => {
    if (chatFile.length) {
      setIsModal(false);
      const sizes = chatFile.map((asset) => asset.size as number);
      const names = chatFile.map((asset) => asset.name);
      const uris = chatFile.map((asset) => asset.uri);
      const fileChat = {
        id: chats.length + 1,
        sender: "You",
        uris: uris,
        date: new Date().toISOString(),
        color: "#000",
        names: names,
        sizes: sizes,
      };
      setChats((prev) => [fileChat, ...prev]);
      setChatFile([]);
    }
  }, [chatFile]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.messagesContainer, animatedMessagesStyle]}>
        {/* Scrollable chat container that renders chat */}
        <FlatList
          data={chats}
          ref={flatListRef}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            const currentDate = new Date(item.date);
            const nextDate =
              index < chats.length - 1 ? new Date(chats[index + 1].date) : null;

            const isNewDay =
              !nextDate ||
              currentDate.toDateString() !== nextDate.toDateString();

            const isMoreThanOneHourApart =
              nextDate &&
              nextDate.getTime() - currentDate.getTime() > 60 * 60 * 1000;

            const shouldShowDate = isNewDay || isMoreThanOneHourApart;

            const selectedInteractions =
              index % 3 === 0 && index !== 0
                ? getRandomInteractions()
                : undefined;

            return (
              <View key={item.id}>
                {shouldShowDate && <ChatDate date={item.date} />}
                {item.names && (
                  <MessageContainer
                    id={item.id}
                    titleName={item.sender}
                    interactions={selectedInteractions}
                    iconColor={item.color}
                  >
                    {item.names.map((file: string, index: number) => (
                      <ChatFile
                        id={item.id * (1 + index)}
                        name={file}
                        uri={item.uris[index]}
                        size={item.sizes[index]}
                      />
                    ))}
                  </MessageContainer>
                )}
                {item.uris && !item.names && (
                  <ChatVisualContainer
                    mediaUris={item.uris}
                    id={item.id}
                    mediaTypes={item.types}
                    titleName={item.sender}
                    interactions={selectedInteractions}
                    iconColor={item.color}
                    dimensions={item.dimensions}
                    params={{
                      color: item.color,
                      name: item.sender,
                      photoCount: countImageLive(item.types),
                      videoCount: countVideos(item.types),
                    }}
                  />
                )}
                {!item.uris && (
                  <ChatMessage
                    id={item.id}
                    message={item.message}
                    titleName={item.sender}
                    interactions={selectedInteractions}
                    iconColor={item.color}
                  />
                )}
              </View>
            );
          }}
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 65,
            paddingBottom: 15,
            justifyContent: "flex-end",
          }}
          keyboardShouldPersistTaps="handled"
          inverted={true}
          keyboardDismissMode={"interactive"} // Swipe down to exit keyboard
        />
      </Animated.View>

      <Animated.View style={[styles.typingContainer, animatedInputStyle]}>
        {/* Maps currently typing people */}
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={[styles.typingIcon, { zIndex: index }]}>
            <Person width={40} height={40} />
          </View>
        ))}
        <Text style={styles.typingDots}>...</Text>
      </Animated.View>

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
            ref={inputRef}
            multiline={true}
            onChangeText={(text) => (messageRef.current = text)}
            placeholder="Type here..."
            placeholderTextColor={"#C5C5C7"}
            returnKeyType="send"
            submitBehavior="submit"
            onSubmitEditing={handleSendMessage}
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
      </Animated.View>

      {isModal && (
        <Modal onRequestClose={() => setIsModal(false)}>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalChatButton}
              onPress={() => {
                Media.openCamera(
                  setChatMedia,
                  setChatMediaType,
                  setChatMediaSizes
                );
              }}
            >
              <View style={[styles.modalIcon, { backgroundColor: "#B4B8BF" }]}>
                <Camera width={35} height={35} />
              </View>
              <Text style={styles.modalChatText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalChatButton}
              onPress={() => {
                Media.openPhotos(
                  setChatMedia,
                  setChatMediaType,
                  setChatMediaSizes
                );
              }}
            >
              <View style={[styles.modalIcon, { backgroundColor: "#FFF" }]}>
                <Photo width={35} height={35} />
              </View>
              <Text style={styles.modalChatText}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalChatButton}
              onPress={() => {
                Media.openDocument(setChatFile);
              }}
            >
              <View style={[styles.modalIcon, { backgroundColor: "#7dabe7" }]}>
                <File width={35} height={35} />
              </View>
              <Text style={styles.modalChatText}>Documents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalChatButton}
              onPress={() => {
                setIsAudioPopupVisible(true);
              }}
            >
              <View style={[styles.modalIcon, { backgroundColor: "#f9815e" }]}>
                <Audio width={25} height={25} />
              </View>
              <Text style={styles.modalChatText}>Audio</Text>
            </TouchableOpacity>
          </View>
          {isAudioPopupVisible && (
            <View style={styles.audioPopupOverlay}>
              <View style={styles.audioPopup}>
                <Text style={styles.audioPopupTitle}>🎙️ Record Audio</Text>

                {/* Recording Indicator */}
                {recording ? (
                  <View style={styles.recordingIndicator}>
                    <Animated.View
                      style={[styles.recordingDot, blinkingStyle]}
                    />
                    <Text style={styles.recordingText}>Recording...</Text>
                  </View>
                ) : null}

                {/* Audio Playback & Controls */}
                <View style={styles.audioButtonContainer}>
                  {recording ? (
                    <TouchableOpacity
                      style={styles.audioButton}
                      onPress={() =>
                        Media.stopRecording(
                          recording,
                          setAudioUri,
                          setRecording
                        )
                      }
                    >
                      <Text style={styles.audioButtonText}>Stop</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.audioButton}
                      onPress={() => Media.startRecording(setRecording)}
                    >
                      <Text style={styles.audioButtonText}>Start</Text>
                    </TouchableOpacity>
                  )}

                  {/* Show Play Button Only If an Audio is Recorded */}
                  <TouchableOpacity
                    style={[
                      styles.audioButton,
                      { opacity: !audioUri ? 0.5 : 1 },
                    ]}
                    onPress={() => Media.playAudio(setSound, audioUri)}
                    disabled={!audioUri}
                  >
                    <Text style={styles.audioButtonText}>Play</Text>
                  </TouchableOpacity>

                  {/* Send Audio Button */}
                  <TouchableOpacity
                    style={[
                      styles.audioButton,
                      { opacity: !audioUri ? 0.5 : 1 },
                    ]}
                    onPress={sendAudioMessage}
                    disabled={!audioUri}
                  >
                    <Text style={styles.audioButtonText}>Send</Text>
                  </TouchableOpacity>
                </View>

                {/* Cancel Button */}
                <TouchableOpacity onPress={() => setIsAudioPopupVisible(false)}>
                  <Text style={styles.closePopupText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      )}
    </View>
  );
}
