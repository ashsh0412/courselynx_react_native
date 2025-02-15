import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
  Modal,
} from "react-native";
import Detail from "@/components/ChatComponents/DetailComponents/Detail";
import ShareIcon from "../../../assets/svg/shareDetail.svg";
import Media from "../../../assets/svg/media.svg";
import Notification from "../../../assets/svg/notification.svg";
import Member from "../../../assets/svg/group.svg";
import { BlurView } from "expo-blur";
import GestureRecognizer from "react-native-swipe-gestures";

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

  {
    /* Function to bring up share menu */
  }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Join ${title}`,
        url: "https://courselynx/join/12345",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          `Shared via activity type: ${result.activityType}`;
        } else {
          console.log("Content Shared Successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share Dialog Dismissed");
      }
    } catch (error: any) {
      alert(error.message);
    }
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
          shareFunction={onShare}
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
      {isModal && (
        <BlurView
          intensity={15}
          style={styles.blur}
          experimentalBlurMethod="dimezisBlurView"
        >
          <GestureRecognizer
            style={{ flex: 1, zIndex: 2 }}
            onSwipeDown={() => setIsModal(false)}
          >
            <Modal
              transparent={true}
              visible={isModal}
              animationType="slide"
              onRequestClose={() => setIsModal(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={styles.modalBar} />
                  <Text style={styles.modalText}>
                    Are you sure you want to leave this group?
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setIsModal(false)}
                    >
                      <Text style={styles.modalButtonText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => leaveChat()}
                    >
                      <Text style={styles.modalButtonText}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </GestureRecognizer>
        </BlurView>
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
