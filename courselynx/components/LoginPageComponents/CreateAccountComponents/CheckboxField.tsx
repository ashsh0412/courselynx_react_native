import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { Svg, Path } from "react-native-svg";

interface CheckboxFieldProps {
  isChecked: boolean;
  onToggle: () => void;
  text: string;
  disabled?: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  isChecked,
  onToggle,
  text,
  disabled = false,
}) => {
  //Animated value for the checkmark animation.
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: isChecked ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 3,
    }).start();
  }, [isChecked]);

  return (
    <TouchableOpacity
      onPress={onToggle}
      disabled={disabled}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.checkbox,
          isChecked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        <Animated.View
          style={[
            styles.checkmarkContainer,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <Svg width={12} height={9} viewBox="0 0 12 9">
            <Path
              d="M1 4L4.5 7.5L11 1"
              stroke="#4A90E2"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Animated.View>
      </View>
      <Text
        style={[
          styles.text,
          disabled && styles.disabledText,
          isChecked && styles.checkedText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#4A90E2",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  checked: {
    backgroundColor: "#FFFFFF",
  },
  disabled: {
    borderColor: "#D1D1D1",
    backgroundColor: "#F5F5F5",
  },
  checkmarkContainer: {
    width: 12,
    height: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 12,
    fontSize: 13,
    color: "#999",
    fontWeight: "500",
  },
  checkedText: {
    color: "#4A90E2",
  },
  disabledText: {
    color: "#999999",
  },
});
