import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Logo } from "@/components/LoginPageComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/InputField";
import { Button } from "@/components/LoginPageComponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "./LoginStackNavigator";
import { loginStyles } from "./LoginStyles";

type CreateNewPasswordNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  "CreateNewPassword"
>;

const CreateNewPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigation = useNavigation<CreateNewPasswordNavigationProp>();

  return (
    <View style={loginStyles.container}>
      <ScrollView
        contentContainerStyle={loginStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={loginStyles.blueSection}>
          <View style={loginStyles.headerContainer}>
            <Logo />
            <Text style={loginStyles.mainTitle}>You're almost there!</Text>
            <Text style={loginStyles.subHeader}>
              Create a new password for your account
            </Text>
          </View>
        </View>
        <View style={loginStyles.formWrapper}>
          <View style={loginStyles.whiteContainer}>
            <View style={loginStyles.form}>
              <InputField
                label="New Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Write your new password"
                secureTextEntry
              />
              <View style={loginStyles.spacing} />
              <InputField
                label="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your new password"
                secureTextEntry
              />
              <View style={loginStyles.spacing} />
              <Button
                text="Update Password"
                onPress={() => navigation.navigate("SignIn")}
                disabled={
                  password === "" ||
                  confirmPassword === "" ||
                  password !== confirmPassword
                }
              />
              <View style={loginStyles.linkWrapper}>
                <Text
                  style={loginStyles.backText}
                  onPress={() => navigation.navigate("SignIn")}
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

export default CreateNewPassword;
