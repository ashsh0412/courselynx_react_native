import {
  View,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Text,
} from "react-native";
import { BlurView } from "expo-blur";
import GestureRecognizer from "react-native-swipe-gestures";

interface ModalProps {
  onRequestClose: () => void;
  children?: React.ReactNode;
  text?: string;
  hasButtonYesNo?: boolean;
  onPressNo?: () => void;
  onPressYes?: () => void;
  modalStyles?: StyleProp<ViewStyle>;
}

const Modal: React.FC<ModalProps> = ({
  onRequestClose,
  children,
  text = "",
  hasButtonYesNo = false,
  onPressNo = () => {},
  onPressYes = () => {},
  modalStyles = {},
}) => {
  return (
    <BlurView
      intensity={15}
      style={styles.blur}
      experimentalBlurMethod="dimezisBlurView"
    >
      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={onRequestClose}>
        <RNModal
          transparent={true}
          animationType="slide"
          onRequestClose={onRequestClose}
        >
          {/* Handles clicks to close modal on click outside of the modal */}
          <Pressable onPress={onRequestClose} style={{ flex: 1 }} />

          <View style={[styles.container, modalStyles]}>
            <View style={styles.bar} />

            {text != "" && (
              <Text
                style={[
                  styles.text,
                  { marginBottom: !hasButtonYesNo && !children ? 28 : 23 },
                ]}
              >
                {text}
              </Text>
            )}

            {children}

            {hasButtonYesNo && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={onPressNo}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={onPressYes}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </RNModal>
      </GestureRecognizer>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(217, 217, 217, 0.05)",
    zIndex: 1,
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: 100,
    flex: 1,
    backgroundColor: "rgba(45, 138, 251, 0.9)",
    borderRadius: 16,
    alignItems: "center",
  },
  bar: {
    width: 30,
    height: 3,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
    borderRadius: 10,
    marginTop: 9,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 69,
    marginBottom: 42,
  },
  button: {
    width: 100,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#375DFB",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "rgba(45, 138, 251, 1)",
    fontWeight: "500",
  },
});

export default Modal;
