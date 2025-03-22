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
};

const EntityCard: React.FC<EntityCardProps> = ({
  id,
  uri = "",
  name = "",
  children,
  hasMessage = false,
  hasAdd = false,
  hasRemove = false,
  isCircle = false,
}) => {
  const [btn, setBtn] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <EntityIcon id={id} uri={uri} size={50} isCircle={isCircle} />

      <View style={styles.text}>
        <Text style={styles.name}>{name}</Text>
        {children}
      </View>

      {(hasMessage || hasAdd || hasRemove) &&
        <View style={styles.icon}>
          {hasMessage && (
            <TouchableOpacity
              onPress={() => { }}
              activeOpacity={0.6}
            >
              <Ionicons name={"chatbox"} size={22} color={"white"} />
            </TouchableOpacity>
          )}
          {(hasAdd || hasRemove) && (
            <TouchableOpacity
              onPress={() => {
                setBtn((prev) => !prev);
              }}
              activeOpacity={0.6}
            >
              {btn ? (
                <Ionicons name={"checkmark"} size={24} color={"white"} />
              ) :
                hasAdd && (
                  <Ionicons name={"add"} size={26} color={"white"} />
                ) ||
                hasRemove && (
                  <Ionicons name={"remove"} size={26} color={"white"} />
                )
              }
            </TouchableOpacity>
          )}
        </View>
      }
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
});
