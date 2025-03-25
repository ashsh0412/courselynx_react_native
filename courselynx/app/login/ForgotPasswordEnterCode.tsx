import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";
import { LinkText } from "@/components/LoginPageComponents/CreateAccountComponents/LinkText";
import VerficationCode from "@/components/LoginPageComponents/CreateAccountComponents/VerificationCode";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "./LoginStackNavigator";
import { loginStyles } from "./LoginStyles";

type ForgotPasswordEnterCodeNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  "ForgotPasswordEnterCode"
>;

const ForgotPasswordEnterCode: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordEnterCodeNavigationProp>();

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
                onPress={() => navigation.navigate("CreateNewPassword")}
              />
              <View style={loginStyles.linkWrapper}>
                <Text
                  style={loginStyles.backText}
                  onPress={() => navigation.navigate("SignIn")}
                >
                  Back to Sign In
                </Text>
                <LinkText
                  text="DIDN'T RECEIVE THE CODE?"
                  onPress={() => console.log("Resend verification code")}
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
  label: {
    fontSize: 13,
    fontWeight: "400",
    color: "#666",
    marginBottom: 10,
    marginLeft: 13,
  },
});

export default ForgotPasswordEnterCode;
