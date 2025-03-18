import { useState } from "react";
import { View, ScrollView } from "react-native";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Avatar from "@/components/ProfileComponents/Avatar"
import { ProfileProps } from ".";
import styles from "./profile.styles";

export default function EditView({ userProfile }: { userProfile: ProfileProps }) {
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [name, setName] = useState(userProfile.name);
  const [major, setMajor] = useState(userProfile.major);
  const [gradYear, setGradYear] = useState(userProfile.gradYear);
  const [bio, setBio] = useState(userProfile.bio);
  const [linkedin, setLinkedin] = useState(userProfile.linkedin);
  const [discord, setDiscord] = useState(userProfile.discord);

  const saveProfile = () => {
    console.log("Save");
  }

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, styles.lightBackgroundColor]} automaticallyAdjustKeyboardInsets={true}>
        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Avatar uri={avatar} hasEditBtn setUri={setAvatar} isBig />
        </View>

        {/* Input Fields */}
        <View style={styles.form}>
          <InputField label="Name*" value={name} onChangeText={setName} placeholder="Type your name" />

          <InputField label="Major*" value={major} onChangeText={setMajor} placeholder="Type your major" />

          <InputField label="Graduation Year*" value={gradYear} onChangeText={setGradYear} placeholder="Type your graduation year" keyboardType="numeric" />

          <InputField label="Bio" value={bio} onChangeText={setBio} placeholder="Tell us about yourself" mulitline={true} inputStyle={{ height: "auto", maxHeight: 100 }} />

          <InputField label="LinkedIn" value={linkedin} onChangeText={setLinkedin} placeholder="Type your username" />

          <InputField label="Discord" value={discord} onChangeText={setDiscord} placeholder="Type your username" />
        </View>
      </ScrollView>

      {/* Extra padding at the bottom to prevent overlap */}
      <View style={styles.footer} />

      {/* Save Button */}
      <View style={[styles.fixedButtonContainer, styles.lightBackgroundColor]}>
        <Button text="Save" onPress={saveProfile} />
      </View>
    </>
  );
}
