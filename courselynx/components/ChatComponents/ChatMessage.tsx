import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export type Interaction = {
  emoji: string;
  count: number;
};

export type Props = {
  id: number;
  message: string;
  titleName: string;
  iconColor: string;
  interactions?: Interaction[];
  isUser?: boolean;
};

const ChatMessage: React.FC<Props> = ({
  message,
  id,
  titleName,
  interactions,
  isUser,
  iconColor,
}) => {
  return (
    <>
      <View style={styles.messageContent}>
        <View style={styles.iconContainer}>
          <View style={styles.iconLeftBorder} />
          <View style={[styles.messageIcon, { backgroundColor: iconColor }]} />
        </View>
        <View style={styles.messageWrapper}>
          <Text style={styles.messageTitle}>{titleName}</Text>
          <Text style={styles.messageText}>{message}</Text>
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
  messageContent: {
    flexDirection: "row",
    marginLeft: 6,
    marginRight: 25,
    marginBottom: 21,
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
  messageWrapper: {
    paddingTop: 8,
    marginLeft: 13,
  },
  messageText: {
    fontFamily: "SF Pro Display",
    fontSize: 15,
    width: 300,
    padding: 0,
    margin: 0,
  },
  messageTitle: {
    fontSize: 15,
    fontWeight: 500,
    color: "#4F4F4F",
    marginBottom: 3,
    padding: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
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

export default ChatMessage;
