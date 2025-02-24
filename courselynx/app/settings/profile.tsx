import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InputField } from "@/components/InputField";

export default function ProfileSelf() {
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
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save</Text>
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
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
    alignSelf: "center",
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
