import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Interaction } from "./ChatMessage";
import ChatVisualMedia from "./ChatVisualMedia";
import { Bar as ProgressBar } from "react-native-progress";
import { Link, useRouter } from "expo-router";
import { onShare } from "@/utils/share";
import UserIcon from "./UserIcon";
import LongPressable from "../LongPressable";

export type Props = {
  iconColor: string;
  titleName: string;
  interactions?: Interaction[];
  mediaUris: string[];
  mediaTypes: string[];
  isUser?: boolean;
  id: number;
  dimensions: { width: number; height: number }[];
  params: {
    color: string;
    name: string;
    photoCount: number;
    videoCount: number;
  };
};

const ChatVisualContainer: React.FC<Props> = ({
  iconColor,
  titleName,
  interactions,
  mediaUris,
  mediaTypes,
  isUser,
  id,
  params,
  dimensions,
}) => {
  const mediaCount = mediaUris.length;
  const [loadAmount, setLoadAmount] = useState(0);
  const [loadVisible, setLoadVisible] = useState(true);
  const router = useRouter();

  const renderMedia = () => {
    if (mediaCount === 1) {
      return (
        <ChatVisualMedia
          mediaUri={mediaUris[0]}
          type={mediaTypes[0]}
          sizing="whole"
        />
      );
    } else if (mediaCount === 2) {
      return (
        <View style={{ flexDirection: "row", gap: 1 }}>
          <ChatVisualMedia
            mediaUri={mediaUris[0]}
            type={mediaTypes[0]}
            sizing="half"
          />
          <ChatVisualMedia
            mediaUri={mediaUris[1]}
            type={mediaTypes[1]}
            sizing="half"
          />
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row", gap: 1 }}>
          <ChatVisualMedia
            mediaUri={mediaUris[0]}
            type={mediaTypes[0]}
            sizing="half"
          />
          <View style={{ flexDirection: "column", gap: 1 }}>
            <ChatVisualMedia
              mediaUri={mediaUris[1]}
              type={mediaTypes[1]}
              sizing="quarter"
            />
            <ChatVisualMedia
              mediaUri={mediaUris[2]}
              type={mediaTypes[2]}
              sizing="quarter"
              overlay={mediaCount - 3}
            />
          </View>
        </View>
      );
    }
  };

  useEffect(() => {
    setLoadAmount(1);
    setTimeout(() => {
      setLoadVisible(false);
    }, 1000);
  }, []);

  return (
    <>
      <View
        style={[
          styles.visualMediaContainer,
          { opacity: loadVisible ? 0.5 : 1 },
        ]}
      >
        <UserIcon id={id} uri={iconColor} />
        <View style={styles.messageWrapper}>
          <Text style={styles.messageTitle}>{titleName}</Text>
          <LongPressable
            onPress={() =>
              router.push({
                pathname: "/chat/images",
                params: {
                  ...params,
                  uris: JSON.stringify(mediaUris),
                  types: JSON.stringify(mediaTypes),
                  sizes: JSON.stringify(dimensions),
                },
              })
            }
            onLongPress={() => {
              if (mediaUris.length === 1) {
                onShare({ message: "", uri: mediaUris[0] });
              }
            }}
          >
            {renderMedia()}
          </LongPressable>
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
  },
  messageWrapper: {
    paddingVertical: 8,
    marginLeft: 13,
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

export default ChatVisualContainer;
