import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface VerificationCodeProps {
  length?: number;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({
  length = 6,
  onChange,
  onComplete,
}) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    const fullCode = newCode.join("");
    onChange?.(fullCode);

    if (fullCode.length === length && !newCode.includes("") && onComplete) {
      onComplete(fullCode);
    }

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    const newCode = [...code];
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    } else if (e.nativeEvent.key === "Backspace") {
      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
        onChange?.(newCode.join(""));
      }
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(ref) => (inputs.current[i] = ref)}
          style={[styles.input, code[i] ? styles.filledInput : null]}
          keyboardType="numeric"
          maxLength={1}
          value={code[i]}
          onChangeText={(text) => handleChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          textAlign="center"
          autoFocus={i === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#F5F5F5",
  },
  filledInput: {
    borderColor: "#4285F4",
    backgroundColor: "#FFFFFF",
  },
});

export default VerificationCode;
