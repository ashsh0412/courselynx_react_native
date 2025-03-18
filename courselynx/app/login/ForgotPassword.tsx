import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/CreateAccountComponents/InputField";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";

export const ForgotPassword: React.FC<{
  onSignIn: () => void;
  onContinue: () => void;
}> = ({ onSignIn, onContinue }) => {
  const [email, setEmail] = useState<string>("");

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.blueSection}>
          <View style={styles.headerContainer}>
            <Logo />
            <Text style={styles.mainTitle}>Forgot Password?</Text>
            <Text style={styles.subHeader}>
              Enter your email to receive a password reset link.
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
              <Button text="Continue →" onPress={onContinue} />
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

export default ForgotPassword;
