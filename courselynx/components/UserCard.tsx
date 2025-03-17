import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import UserIcon from "./ChatComponents/UserIcon";
import Check from "@/assets/svg/checkUser.svg";
import Plus from "@/assets/svg/addUser.svg";
import Message from "@/assets/svg/messageUser.svg";
import { useState } from "react";

export type Props = {
  id: number;
  uri: string;
  name: string;
  hasMessage?: boolean;
  hasAdd?: boolean;
  inCommon?: string[];
};

const UserCard: React.FC<Props> = ({
  id,
  uri,
  name,
  hasMessage,
  hasAdd,
  inCommon = [],
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const formatInCommon = (commonArray: string[]) => {
    let commonString = "";
    for (const common of commonArray) {
      commonString += common + ", ";
    }
    commonString = commonString.slice(0, -2);
    if (commonString === "") {
      commonString = "N/A";
    }
    return (
      <Text style={styles.userCommon}>
        <Text style={styles.userCommonTop}>{"Top Groups in Common: "}</Text>
        {commonString}
      </Text>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <UserIcon id={id} uri={uri} hasHighlight={false} isMember={true} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{name}</Text>
        {formatInCommon(inCommon)}
      </View>
      <View style={styles.iconBackground}>
        {hasMessage && (
          <TouchableOpacity onPress={() => {}}>
            <Message width={20} height={20} />
          </TouchableOpacity>
        )}
        {hasAdd && (
          <TouchableOpacity
            onPress={() => {
              setIsAdded((prev) => !prev);
            }}
          >
            {isAdded ? (
              <Check height={30} width={30} />
            ) : (
              <Plus width={35} height={35} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    height: 75,
    paddingLeft: 10,
    paddingRight: 15,
    borderRadius: 16,
    backgroundColor: "#2D8AFB1a",
    alignItems: "center",
    marginBottom: 4,
  },
  userInfo: {
    alignSelf: "flex-start",
    width: 244,
    marginLeft: 12,
    paddingTop: 13,
  },
  iconBackground: {
    backgroundColor: "#2D8AFB",
    height: 30,
    width: 30,
    marginLeft: "auto",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    color: "#1F1F1F",
    fontFamily: "WorkSans_600SemiBold",
    marginBottom: 6,
    fontSize: 14,
    letterSpacing: -0.15,
    fontWeight: 600,
  },
  userCommon: {
    color: "#02102E",
    fontSize: 12,
    fontFamily: "SF Pro Display",
  },
  userCommonTop: {
    fontWeight: 500,
  },
});
