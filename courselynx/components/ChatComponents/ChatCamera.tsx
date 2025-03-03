import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Props = {
  onRequestClose: () => void;
  setUri: () => void;
  setType: () => void;
};

const ChatCamera: React.FC<Props> = ({ onRequestClose }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(true);
  const [isVideo, setIsVideo] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = () => {};

  return (
    <>
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onLayout={isLoading ? () => setIsLoading(false) : () => {}}
        >
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={styles.typeButton}
              onPress={() => setIsVideo(false)}
            >
              <Text
                style={[styles.text, { color: isVideo ? "white" : "#2D8AFB" }]}
              >
                Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.typeButton}
              onPress={() => setIsVideo(true)}
            >
              <Text
                style={[styles.text, { color: !isVideo ? "white" : "#2D8AFB" }]}
              >
                Video
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.takeContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.takeButton,
                { backgroundColor: isVideo ? "red" : "white" },
              ]}
              onPress={() => takePicture()}
            />
            <TouchableOpacity style={styles.button} onPress={onRequestClose}>
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </>
  );
};

export default ChatCamera;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    justifyContent: "center",
    zIndex: 3,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  typeContainer: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#E8E9EB50",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
  takeContainer: {
    paddingBottom: 40,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#E8E9EB50",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  takeButton: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  typeButton: {},
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
