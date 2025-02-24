import { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileSelf() {
  // State for form inputs
  const [name, setName] = useState("Ana Souza");
  const [major, setMajor] = useState("Computer Science");
  const [gradYear, setGradYear] = useState("2026");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("abcxyz");
  const [discord, setDiscord] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.profileImage} />
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Name*</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Major*</Text>
        <TextInput style={styles.input} value={major} onChangeText={setMajor} />

        <Text style={styles.label}>Graduation Year*</Text>
        <TextInput style={styles.input} value={gradYear} onChangeText={setGradYear} keyboardType="numeric" />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          placeholderTextColor={"#888"}
          multiline
        />

        <Text style={styles.label}>LinkedIn</Text>
        <TextInput
          style={styles.input}
          value={linkedin}
          onChangeText={setLinkedin}
          placeholder="Type your username"
          placeholderTextColor={"#888"}
        />

        <Text style={styles.label}>Discord</Text>
        <TextInput
          style={styles.input}
          value={discord}
          onChangeText={setDiscord} 
          placeholder="Type your username"
          placeholderTextColor={"#888"}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#3b82f6",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    backgroundColor: "#f6f6f6",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
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
