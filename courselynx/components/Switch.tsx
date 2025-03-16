/**
 * There's been a bug in the Native-React Switch component since 2020.
 * It always reduces the opacity of the background color on IOS device.
 * https://github.com/facebook/react-native/issues/29803
 *
 * You can use this custom switch component instead. Avoid using the default switch component.
 */
import { useContext } from "react";
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import * as Haptics from 'expo-haptics';
import { HapticContext } from "@/contexts/HapticContext";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  switchStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, switchStyle, thumbStyle }) => {
  const { isHapticEnabled } = useContext(HapticContext);
  const translateX = useSharedValue(value ? 20 : 0);

  const toggleSwitch = () => {
    isHapticEnabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    translateX.value = withTiming(value ? 0 : 20, { duration: 200 });
    onValueChange(!value);
  };

  const thumbStyleAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        value && styles.switchContainerOn,
        switchStyle,
      ]}
      onPress={toggleSwitch}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.switchThumb,
          thumbStyleAnimated,
          value && styles.switchThumbOn,
          thumbStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 28,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#000",
    backgroundColor: "transparent",
    justifyContent: "center",
    padding: 4,
  },
  switchContainerOn: {
    borderColor: "rgba(45, 138, 251, 1)",
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#000",
  },
  switchThumbOn: {
    backgroundColor: "rgba(45, 138, 251, 1)",
  },
});

export default Switch;
