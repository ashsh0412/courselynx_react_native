import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Detail from "@/components/ChatComponents/DetailComponents/Detail";
import ShareIcon from "../../../assets/svg/shareDetail.svg";
import Media from "../../../assets/svg/media.svg";
import Notification from "../../../assets/svg/notification.svg";
import Member from "../../../assets/svg/group.svg";
import { BlurView } from "expo-blur";
import GestureRecognizer from "react-native-swipe-gestures";
import { onShare } from "@/utils/share";
import Modal from "@/components/Modal";

const DESC_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et";

export default function DetailScreen() {
  const router = useRouter();
  const { title, color } = useLocalSearchParams();
  const [descriptionText, setDescriptionText] = useState(DESC_TEXT);
  const [isModal, setIsModal] = useState(false);

  const leaveChat = () => {
    router.dismissTo("/");
    console.log("User Left Chat");
    setIsModal(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color as string,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.description}>{descriptionText}</Text>
        <Detail
          title={title as string}
          color={color as string}
          text="Share"
          SVG={ShareIcon}
          path={"/chat/detail"}
          shareFunction={() =>
            onShare({
              message: `Join ${title}`,
              uri: "https://courselynx/join/12345",
            })
          }
        />
        <Detail
          title={title as string}
          color={color as string}
          text="Media"
          SVG={Media}
          path={"/chat/detail/media"}
        />
        <Detail
          title={title as string}
          color={color as string}
          text={`Member [${123}]`}
          SVG={Member}
          path={"/chat/detail/member"}
        />
        <Detail
          title={title as string}
          color={color as string}
          text="Notifications"
          SVG={Notification}
          path={"/chat/detail/notification"}
        />
        <TouchableOpacity
          style={styles.leaveButton}
          onPress={() => setIsModal(true)}
        >
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>
      </View>
      {/* Creation of modal with blur and recognizer for swipe interactions */}
      {isModal && (
        <Modal
          onRequestClose={() => setIsModal(false)}
          text="Are you sure you want to leave this group?"
          hasButtonYesNo={true}
          onPressNo={() => setIsModal(false)}
          onPressYes={() => leaveChat()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 154,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    textAlign: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "SF Pro Display",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 30,
    marginBottom: 19,
    textAlign: "center",
    color: "02102E",
  },
  detailLink: {
    paddingVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    marginBottom: 31,
    marginHorizontal: 22,
    fontSize: 15,
    lineHeight: 15.5,
    fontFamily: "SF Pro Display",
    fontWeight: 300,
    textAlign: "center",
  },
  leaveButton: {
    backgroundColor: "#2D8AFB",
    width: 327,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 31,
  },
  leaveText: {
    fontFamily: "SF Pro Display",
    fontSize: 16,
    fontWeight: 500,
    color: "#FFF",
    lineHeight: 50,
    letterSpacing: -0.5,
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
    height: 142,
    zIndex: 1,
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2D8AFB",
    opacity: 0.9,
    borderRadius: 16,
  },
  modalBar: {
    width: 30,
    height: 3,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
    borderRadius: 10,
    marginTop: 9,
  },
  modalText: {
    fontFamily: "SF Pro Display",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: 700,
    marginTop: 12,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 29,
    gap: 69,
  },
  modalButton: {
    width: 100,
    height: 34,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontWeight: 500,
    fontSize: 16,
    color: "#2D8AFB",
    letterSpacing: -0.5,
  },
});
