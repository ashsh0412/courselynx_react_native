import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface VerficationCodeProps {
  length?: number;
  onChange?: (code: string) => void;
}

const VerficationCode: React.FC<VerficationCodeProps> = ({
  length = 6,
  onChange,
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

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    const newCode = [...code];
    if (e.nativeEvent.key === "Backspace"){
      if(code[index]) {
        newCode[index] = "";
        setCode(newCode);
        onChange?.(newCode.join(""));
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
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
    gap: 3,
  },
  input: {
    width: 58,
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 12,
    fontSize: 20,
    color: "#000",
    backgroundColor: "#FFF",
  },
  filledInput: {
    borderColor: "#4285F4",
    backgroundColor: "#FFFFFF",
  },
});

export default VerficationCode;