import { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InputField } from "@/components/InputField";
import styles from "./ProfileStyles";

type ProfileProps = {
  avatar: string;
  name: string;
  major: string;
  gradYear: string;
  bio: string;
  linkedin: string;
  discord: string;
};

const Self = ({ userdata }: { userdata: ProfileProps }) => {
  // State for form inputs
  const [avatar, setAvatar] = useState(userdata.avatar);
  const [name, setName] = useState(userdata.name);
  const [major, setMajor] = useState(userdata.major);
  const [gradYear, setGradYear] = useState(userdata.gradYear);
  const [bio, setBio] = useState(userdata.bio);
  const [linkedin, setLinkedin] = useState(userdata.linkedin);
  const [discord, setDiscord] = useState(userdata.discord);

  const saveProfile = () => {
    console.log("Save");
  }

  const editAvatar = () => {
    console.log("Edit avatar");
  }

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, styles.lightBackgroundColor]} automaticallyAdjustKeyboardInsets={true}>
        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editButton} onPress={editAvatar}>
            <Ionicons name="pencil" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <InputField label="Name*" value={name} onChangeText={setName} placeholder="Type your name" />

          <InputField label="Major*" value={major} onChangeText={setMajor} placeholder="Type your major" />

          <InputField label="Graduation Year*" value={gradYear} onChangeText={setGradYear} placeholder="Type your graduation year" keyboardType="numeric" />

          <InputField label="Bio" value={bio} onChangeText={setBio} placeholder="Tell us about yourself" mulitline={true} addOnStyles={{ height: "auto", maxHeight: 100 }} />

          <InputField label="LinkedIn" value={linkedin} onChangeText={setLinkedin} placeholder="Type your username" />

          <InputField label="Discord" value={discord} onChangeText={setDiscord} placeholder="Type your username" />
        </View>
      </ScrollView>

      {/* Extra padding at the bottom to prevent overlap */}
      <View style={{ height: 60 }} />

      {/* Save Button */}
      <View style={[styles.fixedButtonContainer, styles.lightBackgroundColor]}>
        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const Public = ({ userdata }: { userdata: ProfileProps }) => {
  const socials = [
    { name: "LinkedIn", icon: "logo-linkedin", color: "#0A66C2", username: "@abcxyz" },
    { name: "Discord", icon: "logo-discord", color: "#5865F2", username: "N/A" },
  ];
  const groupsInCommon = [
    { name: "Business and Finance", color: "#D78787" },
    { name: "Statistics", color: "#8DC78B" },
    { name: "Badminton Club", color: "#E18B40" },
    { name: "Dance Club", color: "#D39AD7" },
  ];

  const messageUser = () => {
    console.log("Message");
  }

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, styles.lightBackgroundColor]} automaticallyAdjustKeyboardInsets={true}>
        {/* Profile Header */}
        <View style={[styles.profileContainer, styles.horizontalContainer]}>
          <Image source={{ uri: userdata.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{userdata.name}</Text>
            <Text style={[styles.details, styles.lightTextColor]}>{userdata.major}</Text>
            <Text style={[styles.details, styles.lightTextColor]}>{userdata.gradYear}</Text>
          </View>
        </View>
        <Text style={[styles.bio, styles.lightTextColor]}>{userdata.bio}</Text>

        {/* Social Media Section */}
        <Text style={styles.sectionTitle}>Socials</Text>
        <View style={styles.horizontalContainer}>
          {socials.map((social, index) => (
            <View key={index} style={[styles.item, { width: "48%" }]}>
              <Ionicons name={social.icon as keyof typeof Ionicons.glyphMap} size={50} color={social.color} />
              <View>
                <Text style={styles.label}>{social.name}</Text>
                <Text style={[styles.text, styles.lightTextColor]}>{social.username}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Groups in Common */}
        <Text style={styles.sectionTitle}>Groups in Common [{groupsInCommon.length}]</Text>
        <View>
          {groupsInCommon.map((group, index) => (
            <View key={index} style={styles.item}>
              <View style={[styles.groupColor, { backgroundColor: group.color }]} />
              <Text style={styles.label}>{group.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Extra padding at the bottom to prevent overlap */}
      <View style={{ height: 60 }} />

      {/* Message Button */}
      <View style={[styles.fixedButtonContainer, styles.lightBackgroundColor]}>
        <TouchableOpacity style={styles.button} onPress={messageUser}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const ProfilePage = { Self, Public };
export default ProfilePage;
