import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Logo } from "@/components/LoginPageComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/InputField";
import { Button } from "@/components/LoginPageComponents/Button";
import { Ionicons } from "@expo/vector-icons";
import { loginStyles } from "./LoginStyles";
import { router } from "expo-router";

const CreateProfilePage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [graduationYear, setGraduationYear] = useState<string>("");

  const editAvatar = () => {
    console.log("Edit avatar");
  };

  return (
    <View style={loginStyles.container}>
      <ScrollView
        contentContainerStyle={loginStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={loginStyles.blueSection}>
          <View style={loginStyles.headerContainer}>
            <Logo />
            <Text style={loginStyles.mainTitle}>Let's get to know you!</Text>
            <Text style={loginStyles.subHeader}>
              Create your profile. You can always edit it in the Profile page.
            </Text>
          </View>
        </View>
        <View style={loginStyles.formWrapper}>
          <View style={loginStyles.whiteContainer}>
            <View style={loginStyles.form}>
              <View style={styles.profileContainer}>
                <Image
                  source={require("../../assets/images/look_beyond.png")}
                  style={styles.avatar}
                />
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={editAvatar}
                >
                  <Ionicons name="pencil" size={18} color="white" />
                </TouchableOpacity>
              </View>
              <InputField
                label="Name*"
                value={name}
                onChangeText={setName}
                placeholder="Write your name"
                keyboardType="default"
              />
              <View style={loginStyles.spacing} />
              <InputField
                label="Major*"
                value={major}
                onChangeText={setMajor}
                placeholder="Write your major"
              />
              <View style={loginStyles.spacing} />
              <InputField
                label="Graduation Year*"
                value={graduationYear}
                onChangeText={setGraduationYear}
                placeholder="Write your graduation year"
                keyboardType="numeric"
              />
              <View style={loginStyles.spacing} />
              <Button
                text="Create Account"
                onPress={() => router.push("/login/confirm-course")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    left: "50%",
    transform: [{ translateX: 45 }],
    backgroundColor: "rgba(45, 138, 251, 1)",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateProfilePage;
