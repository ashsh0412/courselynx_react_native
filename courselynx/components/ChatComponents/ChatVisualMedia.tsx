import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import Play from "@/assets/svg/playButton.svg";
import Dots from "@/assets/svg/imageDots.svg";

import { VideoView, useVideoPlayer } from "expo-video";
import { useEventListener } from "expo";
import { onShare } from "@/utils/share";

export type Props = {
  mediaUri: string;
  type: string;
  sizing: "whole" | "half" | "quarter" | "images";
  overlay?: number;
  onImages?: boolean;
  aspect?: number;
};

const ChatVisualMedia: React.FC<Props> = ({
  mediaUri,
  type,
  sizing,
  overlay = -1,
  onImages = false,
  aspect,
}) => {
  const [videoDuration, setVideoDuration] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00");
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const getSizingStyling = () => {
    if (sizing === "whole") {
      return { width: 256, height: 195 };
    } else if (sizing === "half") {
      return { width: 127, height: 195 };
    } else if (sizing === "quarter") {
      return { width: 127, height: 97 };
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const player = useVideoPlayer(mediaUri, (player) => {
    player.loop = false;
  });

  useEventListener(player, "statusChange", ({ status, error }) => {
    if (status === "readyToPlay") {
      setVideoDuration(player.duration);
    }
  });

  useEffect(() => {
    if (videoDuration) setFormattedTime(formatTime(videoDuration));
  }, [videoDuration]);

  return (
    <View>
      {(type === "image" || type === "livePhoto") && (
        <Image
          source={{ uri: mediaUri }}
          style={[
            styles.visualMedia,
            getSizingStyling(),
            aspect ? { aspectRatio: aspect } : undefined,
            { opacity: overlay > 0 ? 0.5 : 1 },
          ]}
          resizeMode={onImages ? "contain" : "cover"}
        />
      )}
      {type == "video" && (
        <VideoView
          style={[
            styles.visualMedia,
            getSizingStyling(),
            aspect ? { aspectRatio: aspect } : undefined,
            { opacity: overlay > 0 ? 0.5 : 1 },
          ]}
          player={player}
          contentFit={onImages ? "contain" : "cover"}
          nativeControls={onImages}
          onLayout={(event) => {
            const { x, y } = event.nativeEvent.layout;
            setPosition({ x: x, y: y });
          }}
        />
      )}
      {(type == "video" || onImages) && (
        <View
          style={[
            styles.videoContainer,
            getSizingStyling(),
            { top: position.y - 8, left: position.x },
          ]}
        >
          {!onImages ? (
            <>
              <View
                style={[
                  styles.playContainer,
                  { opacity: sizing === "whole" ? 1 : 0 },
                ]}
              >
                <Play width={24} height={24} style={{ alignSelf: "center" }} />
              </View>
              <View style={styles.videoDurationContainer}>
                <Text style={styles.videoDuration}>{formattedTime}</Text>
              </View>
            </>
          ) : (
            <TouchableOpacity
              style={styles.dotsContainer}
              onPress={() => onShare({ message: "", uri: mediaUri })}
            >
              <Dots width={15} height={15} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {overlay > 0 && (
        <Text
          style={{
            position: "absolute",
            top: "40%",
            left: "40%",
            fontSize: 16,
            fontFamily: "Inter",
            zIndex: 2,
            color: "black",
          }}
        >
          +{overlay}
        </Text>
      )}
      {type == "none" && <Text>An Error Loading Occured</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  visualMedia: {
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.10)",
    zIndex: 1,
  },
  videoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    zIndex: 2,
  },
  videoDurationContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.30)",
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 8,
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
    marginLeft: 8,
    borderRadius: 22,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    position: "absolute",
    zIndex: 2,
    borderRadius: 5,
    top: 12,
    left: 319,
    paddingVertical: 2,
    paddingHorizontal: 1,
    backgroundColor: "rgba(0, 0, 0, 0.30)",
  },
});

export default ChatVisualMedia;
