import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/CreateAccountComponents/InputField";
import { CheckboxField } from "@/components/LoginPageComponents/CreateAccountComponents/CheckboxField";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";
import { LinkText } from "@/components/LoginPageComponents/CreateAccountComponents/LinkText";

export const CreateAccountPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.blueSection}>
          <View style={styles.headerContainer}>
            <Logo />
            <Text style={styles.mainTitle}>Get started now!</Text>
            <Text style={styles.subHeader}>
              Create an account with your school email (.edu)
            </Text>
          </View>
        </View>

        <View style={styles.formWrapper}>
          <View style={styles.whiteContainer}>
            <View style={styles.form}>
              <InputField
                label="School Email"
                value={email}
                onChangeText={setEmail}
                placeholder="email@ufl.edu"
                keyboardType="email-address"
              />
              <View style={styles.spacing} />
              <InputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Write your password"
                secureTextEntry
              />
              <View style={styles.spacing} />
              <InputField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
              />
              <View style={styles.spacing} />
              <CheckboxField
                isChecked={isChecked}
                onToggle={() => setIsChecked(!isChecked)}
                text="I agree to the Terms and Conditions and the Privacy Policy"
              />
              <Text style={styles.termsText}>
                By using CourseLynx you agree to our End User Licensing
                Agreement
              </Text>
              <Button
                text="Create Account"
                onPress={() => console.log("Create account")}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.loginSection}>
              <Text style={styles.alreadyHaveText}>
                ALREADY HAVE AN ACCOUNT?
              </Text>
              <LinkText
                text="SIGN IN WITH GATORLINK"
                onPress={() => console.log("Gatorlink")}
              />
              <LinkText
                text="SIGN IN WITH EMAIL"
                onPress={() => console.log("Email")}
              />
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
  },
  spacing: {
    height: 16,
  },
  termsText: {
    color: "#4285F4",
    fontSize: 13,
    textAlign: "center",
    marginVertical: 20,
    opacity: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 24,
    width: "100%",
  },
  loginSection: {
    alignItems: "center",
  },
  alreadyHaveText: {
    color: "#4285F4",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 16,
  },
  linkText: {
    marginVertical: 8,
  },
});

export default CreateAccountPage;
