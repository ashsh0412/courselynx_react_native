import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ProfileIcon from "./ProfileIcon";
import Check from "@/assets/svg/checkUser.svg";
import Plus from "@/assets/svg/addUser.svg";
import Message from "@/assets/svg/messageUser.svg";
import { useState } from "react";

interface ProfileCardProps {
  id: number;
  uri?: string;
  name?: string;
  description?: string;
  hasMessage?: boolean;
  hasAdd?: boolean;
  hasMinus?: boolean;
  isCircle?: boolean;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  uri = "",
  name = "",
  description = "",
  hasMessage = false,
  hasAdd = false,
  hasMinus = false,
  isCircle = false,
}) => {
  const [btn, setBtn] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <ProfileIcon id={id} uri={uri} size={50} isCircle={isCircle} />

      <View style={styles.userInfo}>
        <Text style={styles.username}>{name}</Text>
        <Text>{description}</Text>
      </View>

      <View style={styles.icon}>
        {hasMessage && (
          <TouchableOpacity
            onPress={() => { }}
            activeOpacity={0.6}
          >
            <Message width={20} height={20} />
          </TouchableOpacity>
        )}
        {(hasAdd || hasMinus) && (
          <TouchableOpacity
            onPress={() => {
              setBtn((prev) => !prev);
            }}
            activeOpacity={0.6}
          >
            {btn ? (
              <Check height={30} width={30} />
            ) :
              hasAdd ? (
                <Plus width={35} height={35} />
              ) :
                hasMinus ? (
                  <Plus width={35} height={35} /> // Add minus svg later
                ) :
                  (<></>)
            }
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    height: 74,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "rgba(45, 138, 251, 0.1)",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flex: 1,
    alignSelf: "flex-start",
    padding: 12,
  },
  icon: {
    backgroundColor: "rgba(45, 138, 251, 1)",
    height: 34,
    width: 34,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: 15,
    letterSpacing: -0.15,
    fontWeight: 600,
    marginBottom: 6,
  },
});
