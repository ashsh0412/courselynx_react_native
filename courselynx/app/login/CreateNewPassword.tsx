import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/CreateAccountComponents/InputField";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "./LoginStackNavigator"; // 경로는 프로젝트에 맞게 조정
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
            <Text style={loginStyles.mainTitle}>Forgot Password?</Text>
            <Text style={loginStyles.subHeader}>
              Enter your email to receive a password reset link.
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
