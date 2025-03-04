import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/CreateAccountComponents/InputField";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

export const CreateProfilePage: React.FC<{ onNext: () => void }> = ({
  onNext,
}) => {
  const [name, setName] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [graduationYear, setGraduationYear] = useState<string>("");
  const editAvatar = () => {
    console.log("Edit avatar");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.blueSection}>
          <View style={styles.headerContainer}>
            <Logo />
            <Text style={styles.mainTitle}>Let's get to know you!</Text>
            <Text style={styles.subHeader}>
              Create your profile. You can always edit it in the Profile page.
            </Text>
          </View>
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.whiteContainer}>
            <View style={styles.form}>
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
              <View style={styles.spacing} />
              <InputField
                label="Major*"
                value={major}
                onChangeText={setMajor}
                placeholder="Write your major"
              />
              <View style={styles.spacing} />
              <InputField
                label="Graduation Year*"
                value={graduationYear}
                onChangeText={setGraduationYear}
                placeholder="Write your graduation year"
                keyboardType="numeric"
              />
              <View style={styles.spacing} />
              <Button text="Create Account" onPress={onNext} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4285F4",
  },
  content: {
    flexGrow: 1,
  },
  blueSection: {
    backgroundColor: "#4285F4",
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerContainer: {
    paddingHorizontal: 24,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subHeader: {
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 12,
    opacity: 0.9,
  },
  formWrapper: {
    backgroundColor: "#4285F4",
  },
  whiteContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    height: "100%",
  },
  spacing: {
    height: 16,
  },
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
