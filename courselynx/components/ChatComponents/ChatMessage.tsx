import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type Interaction = {
  emoji: string;
  count: number;
};

export type Props = {
  id: number;
  message: string;
  titleName: string;
  interactions?: Interaction[];
};

const ChatMessage: React.FC<Props> = ({
  message,
  id,
  titleName,
  interactions,
}) => {
  return (
    <>
      <View style={styles.messageWrapper}>
        <Text style={styles.messageTitle}>{titleName}</Text>
        <Text style={styles.messageText}>{message}</Text>
        <View style={styles.interactionsContainer}>
          <Text style={styles.interaction}>
            {interactions?.map(
              (inter, index) => `${inter.emoji}  ${inter.count}`
            )}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    paddingVertical: 8,
    marginLeft: 68,
    marginRight: 25,
  },
  messageText: {},
  messageTitle: {},
  interactionsContainer: {},
  interaction: {},
});

export default ChatMessage;
