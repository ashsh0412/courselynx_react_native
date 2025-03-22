import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/CreateAccountComponents/InputField";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";

export const CreateNewPassword: React.FC<{
  onSignIn: () => void;
  onContinue: () => void;
}> = ({ onSignIn, onContinue }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.blueSection}>
          <View style={styles.headerContainer}>
            <Logo />
            <Text style={styles.mainTitle}>You're almost there!</Text>
            <Text style={styles.subHeader}>
              Create a new password for your account
            </Text>
          </View>
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.whiteContainer}>
            <View style={styles.form}>
              <InputField
                label="New Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Write your new password"
                secureTextEntry
              />
              <View style={styles.spacing} />
              <InputField
                label="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your new password"
                secureTextEntry
              />
              <View style={styles.spacing} />
              <Button
                text="Update Password"
                onPress={onContinue}
                disabled={password === "" || confirmPassword === "" || password !== confirmPassword}
              />
              <View style={styles.linkWrapper}>
                <Text style={styles.backText} onPress={onSignIn}>
                  Back to Sign In
                </Text>
              </View>
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
  linkWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  backText: {
    color: "#4285F4",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CreateNewPassword;
