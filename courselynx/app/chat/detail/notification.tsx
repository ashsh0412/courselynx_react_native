import { HapticContext } from "@/contexts/HapticContext";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Alert, Platform } from "react-native";
import { Switch } from "react-native-switch";

export default function NotificationScreen() {
  const { title, color } = useLocalSearchParams();
  const [isEnabledNoti, setIsEnabledNoti] = useState(false);
  const { isHapticEnabled, toggleHaptic } = useContext(HapticContext);

  const showAlert = () => {
    const message =
      Platform.OS === "ios"
        ? "To use this feature you must enable System Haptics in Settings"
        : "To use this feature you must enable Use Vibration & Haptics in Settings";
    Alert.alert("Warning", message, [{ text: "OK" }], { cancelable: false });
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
        <View style={styles.notificationContainer}>
          <View style={styles.option}>
            <Text style={styles.optionText}>Mute Notifications</Text>
            <View
              style={{
                borderWidth: 3,
                borderRadius: 30,
                borderColor: "#2D8AFB",
              }}
            >
              <Switch
                value={isEnabledNoti}
                activeText=""
                inActiveText=""
                barHeight={17.5}
                circleSize={15}
                circleBorderWidth={0}
                circleInActiveColor="rgba(45, 138, 251, 0.3)"
                circleActiveColor="#2D8AFB"
                backgroundInactive="transparent"
                backgroundActive="transparent"
                switchLeftPx={7}
                switchRightPx={7}
                onValueChange={() => setIsEnabledNoti(!isEnabledNoti)}
              />
            </View>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Vibrate</Text>
            <View
              style={{
                borderWidth: 3,
                borderRadius: 30,
                borderColor: "#2D8AFB",
              }}
            >
              <Switch
                activeText=""
                inActiveText=""
                barHeight={17.5}
                circleSize={15}
                circleBorderWidth={0}
                circleInActiveColor="rgba(45, 138, 251, 0.3)"
                circleActiveColor="#2D8AFB"
                backgroundInactive="transparent"
                backgroundActive="transparent"
                switchLeftPx={7}
                switchRightPx={7}
                value={isHapticEnabled}
                onValueChange={() => {
                  isHapticEnabled || showAlert();
                  toggleHaptic();
                }}
              />
            </View>
          </View>
        </View>
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
  },
  titleText: {
    fontFamily: "SF Pro Display",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 30,
    textAlign: "center",
    color: "02102E",
  },
  notificationContainer: {
    backgroundColor: "rgba(45, 138, 251, .1)",
    marginHorizontal: 25,
    marginTop: 19,
    borderRadius: 16,
    paddingVertical: 15,
  },
  option: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginLeft: 22,
    marginRight: 18,
    height: 45,
  },
  optionText: {
    fontFamily: "SF Pro Display",
    fontWeight: 600,
    fontSize: 16,
  },
  optionSwitch: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  },
});
