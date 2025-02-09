import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Incognito from "../../assets/svg/incognito.svg";
import Person from "../../assets/svg/person.svg";

export default function GroupChatScreen() {
  const [messageText, setMessageText] = useState("");
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={60}
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <View style={styles.bottomChatContainer}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.chatInput}
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            placeholder="Type here..."
            placeholderTextColor={"#C5C5C7"}
          />
          <View style={styles.incognitoWrapper}>
            <Incognito width={15} height={15} color={"white"} />
          </View>
        </View>
        <View style={styles.typingContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={[styles.typingIcon, { zIndex: index }]}>
              <Person width={40} height={40} />
            </View>
          ))}
          <Text style={styles.typingDots}>...</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  typingContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "flex-start",
    height: 40,
    width: 350,
  },
  typingIcon: {
    backgroundColor: "lightgray",
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "black",
    marginRight: -15,
  },
  typingDots: {
    fontSize: 40,
    marginLeft: 15,
  },
  bottomChatContainer: {
    flex: 1,
    marginBottom: 38,
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 75,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    color: "#7D7F85",
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
    bottom: 8,
    width: 20,
    height: 20,
    backgroundColor: "#B4B8BF",
  },
});
