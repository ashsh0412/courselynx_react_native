import { View, Text, StyleSheet } from "react-native";
import { Interaction } from "./ChatMessage";

export type Props = {
  iconColor: string;
  titleName: string;
  children: React.ReactNode;
  interactions?: Interaction[];
  id: number;
};

const MessageContainer: React.FC<Props> = ({
  iconColor,
  titleName,
  interactions,
  children,
}) => {
  return (
    <>
      <View style={styles.messageContainer}>
        <View style={styles.iconContainer}>
          <View style={styles.iconLeftBorder} />
          <View style={[styles.messageIcon, { backgroundColor: iconColor }]} />
        </View>
        <View style={styles.messageWrapper}>
          <Text style={styles.messageTitle}>{titleName}</Text>
          {children}
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
    </>
  );
};

export default MessageContainer;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginLeft: 6,
  },
  messageWrapper: {
    paddingVertical: 8,
    marginLeft: 13,
    gap: 5,
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
});
