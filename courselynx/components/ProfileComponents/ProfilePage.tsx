import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InputField } from "@/components/InputField";

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
  // Sample data for groups
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

  return (
    <>
      <ScrollView contentContainerStyle={styles.container} automaticallyAdjustKeyboardInsets={true}>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "4%",
  },
  lightTextColor: {
    color: "#111",
  },
  lightBackgroundColor: {
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 15,
    marginBottom: 5,
  },
  bio: {
    textAlign: "center",
    fontSize: 14,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  groupColor: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  form: {
    marginBottom: 10,
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    left: "50%",
    transform: [{ translateX: 45 }],
    backgroundColor: "#3b82f6",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ProfilePage = { Self, Public };
export default ProfilePage;
