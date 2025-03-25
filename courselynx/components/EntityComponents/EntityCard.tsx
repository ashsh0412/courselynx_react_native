import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import EntityIcon from "./EntityIcon";

interface EntityCardProps {
  id: number;
  uri?: string;
  name?: string;
  children?: React.ReactNode;
  hasMessage?: boolean;
  hasAdd?: boolean;
  hasRemove?: boolean;
  isCircle?: boolean;
  color?: string;
  useIcon?: boolean;
  onRemove?: () => void;
  onAdd?: () => void;
}

const EntityCard: React.FC<EntityCardProps> = ({
  id,
  uri = "",
  name = "",
  children,
  hasMessage = false,
  hasAdd = false,
  hasRemove = false,
  isCircle = false,
  color,
  useIcon = true,
  onRemove,
  onAdd,
}) => {
  const [btn, setBtn] = useState(false);

  const handlePress = () => {
    if (hasRemove && onRemove) {
      onRemove();
    } else if (hasAdd && onAdd) {
      onAdd();
    } else {
      setBtn((prev) => !prev);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {useIcon !== false ? (
        <EntityIcon id={id} uri={uri} size={50} isCircle={isCircle} />
      ) : (
        color && <View style={[styles.colorBox, { backgroundColor: color }]} />
      )}

      <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>
        {children}
      </View>

      {(hasMessage || hasAdd || hasRemove) && (
        <View style={styles.icon}>
          {hasMessage && (
            <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
              <Ionicons name={"chatbox"} size={22} color={"white"} />
            </TouchableOpacity>
          )}
          {(hasAdd || hasRemove) && (
            <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
              {btn ? (
                <Ionicons name={"checkmark"} size={24} color={"white"} />
              ) : hasAdd ? (
                <Ionicons name={"add"} size={26} color={"white"} />
              ) : (
                <Ionicons name={"remove"} size={26} color={"white"} />
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default EntityCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    height: 74,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "rgba(45, 138, 251, 0.1)",
    alignItems: "center",
  },
  text: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 15,
    letterSpacing: -0.15,
    fontWeight: 600,
  },
  icon: {
    backgroundColor: "rgba(45, 138, 251, 1)",
    height: 30,
    width: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
});
