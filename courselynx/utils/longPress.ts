import { Animated } from "react-native";
import * as Haptics from "expo-haptics";

export const longPressAnimation = (
  index: number,
  scales: React.MutableRefObject<Animated.Value[]>,
  toValue: number,
  duration: number,
  hasHaptic: boolean
) => {
  if (hasHaptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  Animated.timing(scales.current[index], {
    toValue: toValue,
    duration: duration,
    useNativeDriver: true,
  }).start();
};

export const releaseAnimation = (
  index: number,
  scales: React.MutableRefObject<Animated.Value[]>,
  duration: number
) => {
  Animated.timing(scales.current[index], {
    toValue: 1,
    duration: duration,
    useNativeDriver: true,
  }).start();
};
