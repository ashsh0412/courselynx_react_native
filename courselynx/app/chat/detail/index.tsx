import { Link, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Share } from "react-native";
import Detail from "@/components/ChatComponents/DetailComponents/Detail";
import ShareIcon from "../../../assets/svg/shareDetail.svg";
import Media from "../../../assets/svg/media.svg";
import Notification from "../../../assets/svg/notification.svg";
import Member from "../../../assets/svg/group.svg";

const DESC_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et";

export default function DetailScreen() {
  const { title, color } = useLocalSearchParams();
  const [descriptionText, setDescriptionText] = useState(DESC_TEXT);

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
        <TouchableOpacity style={styles.leaveButton}>
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>
      </View>
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
  },
});
