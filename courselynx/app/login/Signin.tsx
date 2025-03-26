import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/InputField";
import { Button } from "@/components/LoginPageComponents/Button";
import { LinkText } from "@/components/LoginPageComponents/LinkText";
import { loginStyles } from "./LoginStyles";
import { router } from "expo-router";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={loginStyles.container}>
      <ScrollView
        contentContainerStyle={loginStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={loginStyles.blueSection}>
          <View style={loginStyles.headerContainer}>
            <Logo />
            <Text style={loginStyles.mainTitle}>Hello there!</Text>
            <Text style={loginStyles.subHeader}>
              Enter your school email (.edu) and password to get started.
            </Text>
          </View>
        </View>
        <View style={loginStyles.formWrapper}>
          <View style={loginStyles.whiteContainer}>
            <View style={loginStyles.form}>
              <InputField
                label="School Email"
                value={email}
                onChangeText={setEmail}
                placeholder="email@ufl.edu"
                keyboardType="email-address"
              />
              <View style={loginStyles.spacing} />
              <InputField
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Write your password"
                secureTextEntry
              />
              <View style={styles.linkWrapper1}>
                <LinkText
                  text="Forgot your password?"
                  onPress={() => router.push("/login/forgot-password")}
                />
              </View>
              <Button text="Sign In" onPress={() => console.log("Sign in")} />
              <View style={loginStyles.linkWrapper}>
                <LinkText
                  text="DON'T HAVE AN ACCOUNT? CREATE HERE"
                  onPress={() => router.push("/login/create-account")}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  linkWrapper1: {
    alignItems: "flex-end",
  },
});

export default SignInPage;
