import React, { useContext } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import * as Haptics from 'expo-haptics';
import { HapticContext } from "@/contexts/HapticContext";

interface LongPressableProps {
  children?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  scaling?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

const LongPressable: React.FC<LongPressableProps> = ({
  children,
  onPress = () => { },
  onLongPress = () => { },
  scaling = 1.05,
  duration = 250,
  style,
}) => {
  const scale = useSharedValue(1);
  const { isHapticEnabled } = useContext(HapticContext);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={() => {
        isHapticEnabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        scale.value = withTiming(scaling, { duration });
        onLongPress();
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration });
      }}
      style={style}
    >
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default LongPressable;
