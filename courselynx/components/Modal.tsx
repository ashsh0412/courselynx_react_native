import {
  View,
  Modal as RNModal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Text,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useMemo, useState } from "react";

interface ModalProps {
  onRequestClose: () => void;
  children?: React.ReactNode;
  text?: string;
  hasButtonYesNo?: boolean;
  onPressNo?: () => void;
  onPressYes?: () => void;
  modalStyle?: StyleProp<ViewStyle>;
}

const Modal: React.FC<ModalProps> = ({
  onRequestClose,
  children,
  text = "",
  hasButtonYesNo = false,
  onPressNo = () => { },
  onPressYes = () => { },
  modalStyle,
}) => {
  const translateY = useSharedValue(0);
  const [modalY, setModalY] = useState(0); // Modal height

  const handleCloseModal = () => {
    translateY.value = withTiming(modalY, { duration: 200 }, () => runOnJS(onRequestClose)());
  };

  const tabGesture = useMemo(() =>
    Gesture.Tap()
      .onEnd(() => { runOnJS(handleCloseModal)(); }),
    [handleCloseModal]
  );

  const panGesture = useMemo(() =>
    Gesture.Pan()
      .onChange((event) => {
        if (event.translationY > 0)
          translateY.value = event.translationY;
      })
      .onEnd((event) => {
        if (event.translationY * 2 > modalY || event.velocityY > 200)
          runOnJS(handleCloseModal)();
        else
          translateY.value = withTiming(0); // Snap back if not dragged enough
      }),
    [handleCloseModal]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <BlurView
      intensity={15}
      style={styles.blur}
      experimentalBlurMethod="dimezisBlurView"
    >
      <RNModal
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal} // Not sure how Android behaves here
      >
        <GestureDetector gesture={panGesture}>
          <View style={{ flex: 1 }}>
            <GestureDetector gesture={tabGesture}>
              <View style={{ flex: 1 }} />
            </GestureDetector>
            <Animated.View
              style={[styles.container, modalStyle, animatedStyle]}
              onLayout={(event) => setModalY(event.nativeEvent.layout.height)}
            >
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
            </Animated.View>
          </View>
        </GestureDetector>
      </RNModal>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: "absolute",
    flexDirection: "column",
    width: "100%",
    height: "120%",
    backgroundColor: "rgba(217, 217, 217, 0.05)",
    zIndex: 1,
  },
  container: {
    width: "100%",
    minHeight: 100,
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
