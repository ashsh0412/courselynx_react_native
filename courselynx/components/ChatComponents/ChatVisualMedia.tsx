import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import Play from "@/assets/svg/playButton.svg";
import { Interaction } from "./ChatMessage";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEventListener } from "expo";

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
  const [currentDuration, setCurrentDuration] = useState(0);
  const [loadAmount, setLoadAmount] = useState(0);
  const [loadVisible, setLoadVisible] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00 / 00:00");

  const formatTime = (seconds: number) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    setFormattedTime(formatTime(videoDuration));
  }, [videoDuration]);

  const loadDelay = () => {
    setTimeout(() => {
      setLoadVisible(false);
    }, 500);
  };

  const player = useVideoPlayer(mediaUri, (player) => {
    player.loop = false;
    setLoadAmount(0.2);
  });

  useEventListener(player, "statusChange", ({ status, error }) => {
    if (status === "readyToPlay") {
      setLoadAmount(1);
      loadDelay();
      setVideoDuration(player.duration);
    }
  });

  return (
    <>
      <View style={styles.visualMediaContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.iconLeftBorder} />
          <View style={[styles.messageIcon, { backgroundColor: iconColor }]} />
        </View>
        <View style={styles.visualMediaWrapper}>
          <Text style={styles.messageTitle}>{titleName}</Text>
          {(type === "image" || type === "livePhoto") && (
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
            <VideoView
              style={styles.visualMedia}
              player={player}
              contentFit="cover"
              nativeControls={false}
            />
          )}
          <View
            style={[
              styles.progressBarContainer,
              { opacity: loadVisible ? 1 : 0 },
            ]}
          >
            <ProgressBar
              progress={loadAmount}
              width={235}
              height={4}
              color="#2D8AFB"
              borderWidth={0}
            />
          </View>
          {type == "video" && !loadVisible && (
            <View style={styles.videoContainer}>
              <View style={styles.playContainer}>
                <Play width={24} height={24} style={{ alignSelf: "center" }} />
              </View>
              <View style={styles.videoDurationContainer}>
                <Text style={styles.videoDuration}>{formattedTime}</Text>
              </View>
            </View>
          )}
          {type == "none" && <Text>An Error Loading Occured</Text>}
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
    zIndex: 1,
  },
  videoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "relative",
    zIndex: 2,
    bottom: 55,
    marginBottom: -44,
    marginHorizontal: 8,
  },
  videoDurationContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.30)",
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  videoDuration: {
    color: "#FFF",
    fontFamily: "SF Pro",
    fontSize: 11,
    fontWeight: 500,
  },
  playContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
  },
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
  progressBarContainer: {
    position: "relative",
    alignSelf: "center",
    zIndex: 2,
    bottom: 13,
    backgroundColor: "#CBD0DC",
    width: 235,
    height: 4,
    borderRadius: 4,
  },
});

export default ChatVisualMedia;
