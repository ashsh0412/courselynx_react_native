import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/Logo";
import { Button } from "@/components/LoginPageComponents/Button";
import { LinkText } from "@/components/LoginPageComponents/LinkText";
import VerficationCode from "@/components/LoginPageComponents/VerificationCode";
import { loginStyles } from "./LoginStyles";
import { router } from "expo-router";

const ForgotPasswordEnterCode: React.FC = () => {
  return (
    <View style={loginStyles.container}>
      <ScrollView
        contentContainerStyle={loginStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={loginStyles.blueSection}>
          <View style={loginStyles.headerContainer}>
            <Logo />
            <Text style={loginStyles.mainTitle}>You've got mail!</Text>
            <Text style={loginStyles.subHeader}>
              Check your school email (.edu) for the verification code and enter
              it below.
            </Text>
          </View>
        </View>
        <View style={loginStyles.formWrapper}>
          <View style={loginStyles.whiteContainer}>
            <View style={loginStyles.form}>
              <Text style={styles.label}>Code</Text>
              <VerficationCode />
              <View style={loginStyles.spacing} />
              <Button
                text="Verify"
                onPress={() => {
                  router.replace("/login/create-new-password");
                }}
              />
              <View style={loginStyles.linkWrapper}>
                <LinkText
                  text="DIDN'T RECEIVE THE CODE?"
                  onPress={() => console.log("Resend verification code")}
                />
                <View style={loginStyles.spacing} />
                <Text
                  style={loginStyles.backText}
                  onPress={() => {
                    router.replace("/login");
                    router.dismiss();
                  }}
                >
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
  label: {
    fontSize: 13,
    fontWeight: "400",
    color: "#666",
    marginBottom: 10,
    marginLeft: 13,
  },
});

export default ForgotPasswordEnterCode;
