import { View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import styles from "./profile.styles";
import Avatar from "@/components/ProfileComponents/Avatar";
import { ProfileProps } from ".";
import ProfileIcon from "@/components/ProfileComponents/ProfileIcon";

export default function PublicView({ userProfile }: { userProfile: ProfileProps }) {
  const socials = [
    { name: "LinkedIn", id: "linkedin" as const, icon: "logo-linkedin", color: "#0A66C2" },
    { name: "Discord", id: "discord" as const, icon: "logo-discord", color: "#5865F2" },
  ];

  const groupsInCommon = [
    { id: 1, name: "Business and Finance", color: "#D78787" },
    { id: 2, name: "Statistics", color: "#8DC78B" },
    { id: 3, name: "Badminton Club", color: "#E18B40" },
    { id: 4, name: "Dance1 Club", color: "#D39AD7" },
    { id: 5, name: "Dance2 Club", color: "#D39AD7" },
    { id: 6, name: "Dance3 Club", color: "#D39AD7" },
    { id: 7, name: "Dance4 Club", color: "#D39AD7" },
  ];

  const messageUser = () => {
    console.log("Message");
  }

  return (
    <>
      <View style={[styles.container, styles.lightBackgroundColor]}>
        {/* Profile Header */}
        <View style={[styles.profileContainer, styles.horizontalContainer]}>
          <Avatar uri={userProfile.avatar} size={150} />

          <View>
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={[styles.details, styles.lightTextColor]}>{userProfile.major}</Text>
            <Text style={[styles.details, styles.lightTextColor]}>{userProfile.gradYear}</Text>
          </View>

        </View>
        <Text style={[styles.bio, styles.lightTextColor]}>{userProfile.bio}</Text>

        {/* Social Media Section */}
        <Text style={styles.sectionTitle}>Socials</Text>
        <View style={styles.horizontalContainer}>
          {socials.map((social, index) => (
            <View key={index} style={[styles.item, { width: "48%" }]}>
              <Ionicons name={social.icon as any} size={50} color={social.color} />

              <View>
                <Text style={styles.label}>{social.name}</Text>
                <Text style={[styles.text, styles.lightTextColor]}>{
                  userProfile[social.id] !== "" ? "@" + userProfile[social.id] : "N/A"
                }</Text>
              </View>

            </View>
          ))}
        </View>

        {/* Groups in Common */}
        <Text style={styles.sectionTitle}>Groups in Common [{groupsInCommon.length}]</Text>
        <FlatList
          data={groupsInCommon}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <ProfileIcon id={item.id} uri={item.color} />
              <Text style={styles.label}>{item.name}</Text>
            </View>
          )}
          style={styles.scrollContainer}
        />
      </View>

      {/* Extra padding at the bottom to prevent overlap */}
      <View style={styles.footer} />

      {/* Message Button */}
      <View style={[styles.fixedButtonContainer, styles.lightBackgroundColor]}>
        <Button text="Message" onPress={messageUser} />
      </View>
    </>
  );
};
