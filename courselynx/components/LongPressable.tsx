import React, { useContext, useRef } from "react";
import { Animated, Pressable, StyleProp, ViewStyle } from "react-native";
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
  duration = 200,
  style,
}) => {
  const scale = useRef<Animated.Value>(new Animated.Value(1));
  const { isHapticEnabled } = useContext(HapticContext);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={() => {
        if (isHapticEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Animated.timing(scale.current, {
          toValue: scaling,
          duration: duration,
          useNativeDriver: true,
        }).start();
        onLongPress();
      }}
      onPressOut={() => {
        Animated.timing(scale.current, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }).start();
      }}
      style={style}
    >
      <Animated.View style={{ transform: [{ scale: scale.current }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default LongPressable;
