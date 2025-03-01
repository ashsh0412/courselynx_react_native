import {
  View,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import GestureRecognizer from "react-native-swipe-gestures";

interface ModalProps {
  children: React.ReactNode;
  onRequestClose: () => void;
  modalStyles?: StyleProp<ViewStyle>;
}

const Modal: React.FC<ModalProps> = ({ children, onRequestClose, modalStyles={} }) => {
  return (
    <BlurView
      intensity={15}
      style={styles.blur}
      experimentalBlurMethod="dimezisBlurView"
    >
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={onRequestClose}
      >
        <RNModal
          transparent={true}
          animationType="slide"
          onRequestClose={onRequestClose}
        >
          {/* Handles clicks to close modal on click outside of the modal */}
          <Pressable onPress={onRequestClose} style={{ flex: 1 }} />

          <View style={[styles.container, modalStyles]}>
            <View style={styles.bar} />
            <View style={styles.content}>
              {children}
            </View>
          </View>

        </RNModal>
      </GestureRecognizer>
    </BlurView>
  );
}

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
    margin: 9,
  },
  content: {
    padding: 35,
    paddingTop: 0,
  }
});

export default Modal;
