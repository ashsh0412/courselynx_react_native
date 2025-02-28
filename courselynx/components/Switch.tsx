/**
 * There's been a bug in the Native-React switch component since 2020
 * that always reduces the opacity of background color on IOS devices.
 * https://github.com/facebook/react-native/issues/29803
 * 
 * Use this custom switch component instead. Do not use the default switch component.
 */

import { useRef } from "react";
import { Animated, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  switchStyles?: StyleProp<ViewStyle>;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, switchStyles }) => {
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  const toggleSwitch = () => {
    const newValue = !value;
    Animated.timing(translateX, {
      toValue: newValue ? 20 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onValueChange(newValue);
  };

  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        value && styles.switchContainerOn,
        switchStyles,
      ]}
      onPress={toggleSwitch}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.switchThumb,
          { transform: [{ translateX }] },
          value && styles.switchThumbOn,
        ]}
      />
    </TouchableOpacity>
  );
}

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
