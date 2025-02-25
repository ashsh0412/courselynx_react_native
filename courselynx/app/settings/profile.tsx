import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InputField } from "@/components/InputField";

function Self() {
  // State for form inputs
  const [name, setName] = useState("Ana Souza");
  const [major, setMajor] = useState("Computer Science");
  const [gradYear, setGradYear] = useState("2026");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("abcxyz");
  const [discord, setDiscord] = useState("");

  function saveProfile() {
    console.log("Save");
  }

  return (
    <ScrollView contentContainerStyle={styles.container} automaticallyAdjustKeyboardInsets={true}>
      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bohol_-_Chocolate_Hills.jpg/2560px-Bohol_-_Chocolate_Hills.jpg" }} style={styles.profileImage} />
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <InputField label="Name*" value={name} onChangeText={setName} placeholder="Type your name" />

        <InputField label="Major*" value={major} onChangeText={setMajor} placeholder="Type your major" />

        <InputField label="Graduation Year*" value={gradYear} onChangeText={setGradYear} placeholder="Type your graduation year" keyboardType="numeric" />

        <InputField label="Bio" value={bio} onChangeText={setBio} placeholder="Tell us about yourself" />

        <InputField label="LinkedIn" value={linkedin} onChangeText={setLinkedin} placeholder="Type your username" />

        <InputField label="Discord" value={discord} onChangeText={setDiscord} placeholder="Type your username" />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Others() {
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
    <ScrollView contentContainerStyle={styles.container} automaticallyAdjustKeyboardInsets={true}>
      {/* Profile Header */}
      <View style={[styles.profileContainer, styles.horizontalContainer]}>
        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bohol_-_Chocolate_Hills.jpg/2560px-Bohol_-_Chocolate_Hills.jpg" }} style={styles.profileImage} />
        <View>
          <Text style={styles.name}>Ana Souza</Text>
          <Text style={[styles.details, styles.lightTextColor]}>Computer Science</Text>
          <Text style={[styles.details, styles.lightTextColor]}>Class of 2026</Text>
        </View>
      </View>
      <Text style={[styles.bio, styles.lightTextColor]}>
        Lorem ipsum dolor sit amet, cons adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor
        sit amet, consectetur
      </Text>

      {/* Social Media Section */}
      <Text style={styles.sectionTitle}>Socials</Text>
      <View style={styles.horizontalContainer}>
        {socials.map((social, index) => (
          <View key={index} style={[styles.item, { width: "48%" }]}>
            <Ionicons name={social.icon as keyof typeof Ionicons.glyphMap} size={32} color={social.color} />
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

      {/* Message Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 5,
    backgroundColor: "white",
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
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
  profileImage: {
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
    backgroundColor: "#F6F6F6",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  groupColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
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

const Profile = { Self, Others };
export default Profile;
