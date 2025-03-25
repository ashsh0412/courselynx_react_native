import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/CreateAccountComponents/InputField";
import { CheckboxField } from "@/components/LoginPageComponents/CreateAccountComponents/CheckboxField";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";
import { LinkText } from "@/components/LoginPageComponents/CreateAccountComponents/LinkText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "./LoginStackNavigator"; // 경로 상황에 맞게 수정
import { loginStyles } from "./LoginStyles";

type CreateAccountNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  "CreateAccount"
>;

const CreateAccountPage: React.FC = () => {
  const navigation = useNavigation<CreateAccountNavigationProp>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <View style={loginStyles.container}>
      <ScrollView
        contentContainerStyle={loginStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={loginStyles.blueSection}>
          <View style={loginStyles.headerContainer}>
            <Logo />
            <Text style={loginStyles.mainTitle}>Get started now!</Text>
            <Text style={loginStyles.subHeader}>
              Create an account with your school email (.edu)
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
              <View style={loginStyles.spacing} />
              <InputField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
              />
              <View style={loginStyles.spacing} />
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
                onPress={() => navigation.navigate("CreateProfile")}
              />
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
                  onPress={() => navigation.navigate("SignIn")}
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
