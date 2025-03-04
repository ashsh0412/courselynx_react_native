import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text, ViewComponent } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { Bar as ProgressBar } from "react-native-progress";
import Play from "@/assets/svg/playButton.svg";
import { Interaction } from "./ChatMessage";

export type Props = {
  mediaUri: string;
  id: number;
  type: string;
  titleName: string;
  iconColor: string;
  interactions?: Interaction[];
  isUser?: boolean;
};

const ChatVisualMedia: React.FC<Props> = ({
  mediaUri,
  id,
  type,
  titleName,
  interactions,
  isUser,
  iconColor,
}) => {
  const videoRef = useRef<Video | null>(null);
  const [duration, setDuration] = useState("");
  const [loadAmount, setLoadAmount] = useState(0);
  const [loadVisible, setLoadVisible] = useState(true);

  const loadDelay = () => {
    setTimeout(() => {
      setLoadVisible(false);
    }, 500);
  };

  const getVideoDuration = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        const formattedTime = formatTime(status.durationMillis / 1000);
        setDuration(formattedTime);
      } else {
        setDuration("00:00");
      }
    }
  };

  console.log(loadVisible);
  console.log(type);

  return (
    <>
      <View style={styles.visualMediaContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.iconLeftBorder} />
          <View style={[styles.messageIcon, { backgroundColor: iconColor }]} />
        </View>
        <View style={styles.visualMediaWrapper}>
          <Text style={styles.messageTitle}>{titleName}</Text>
          {(type == "image" || type == "livePhoto") && (
            <Image
              source={{ uri: mediaUri }}
              style={styles.visualMedia}
              onLoadStart={() => setLoadAmount(0.2)}
              onLoad={() => {
                setLoadAmount(1);
                loadDelay();
              }}
              resizeMode="cover"
            />
          )}
          {type == "video" && (
            <Video
              ref={videoRef}
              source={{ uri: mediaUri }}
              style={styles.visualMedia}
              onLoadStart={() => setLoadAmount(0.2)}
              onLoad={() => {
                setLoadAmount(1);
                getVideoDuration();
                loadDelay();
              }}
              resizeMode={ResizeMode.COVER}
            />
          )}
          {type == "video" && (
            <>
              <View style={styles.videoDurationContainer}>
                <Text style={styles.videoDuration}>{duration}</Text>
              </View>
              <View style={styles.playContainer}>
                <Play width={24} height={24} />
              </View>
            </>
          )}
          {type == "none" && <Text>An Error Loading Occured</Text>}
          <View
            style={{
              display: loadVisible ? "flex" : "none",
            }}
          >
            <ProgressBar
              progress={loadAmount}
              width={235}
              height={4}
              color="blue"
            />
          </View>
          <View style={styles.interactionsContainer}>
            {/* Display chat emoji interactions */}
            {interactions?.map((inter, index) => (
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 5,
                  alignItems: "center",
                }}
                key={index}
              >
                <View style={styles.interaction}>
                  <Text>{`${inter.emoji}`}</Text>
                </View>
                <Text>{`${inter.count}`}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  visualMediaContainer: {
    flexDirection: "row",
    marginLeft: 6,
    marginRight: 25,
  },
  visualMediaWrapper: {
    paddingVertical: 8,
    marginLeft: 13,
  },
  visualMedia: {
    width: 256,
    height: 195,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.10)",
  },
  videoDurationContainer: {},
  videoDuration: {},
  playContainer: {},
  iconContainer: {
    marginTop: 6,
    width: 50,
    height: 40,
    flexDirection: "row",
  },
  iconLeftBorder: {
    width: 4,
    height: 40,
    borderLeftWidth: 4,
    borderColor: "#2D8AFB",
    borderRadius: 2,
    marginRight: 5,
  },
  messageIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  messageTitle: {
    fontSize: 15,
    fontWeight: 500,
    color: "#4F4F4F",
    marginBottom: 3,
  },
  interactionsContainer: {
    marginRight: 4,
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  },
  interaction: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9E9EB",
    paddingVertical: 5,
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 5,
  },
});

export default ChatVisualMedia;

// Helper function to format time as MM:SS
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
