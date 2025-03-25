import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/Logo";
import { InputField } from "@/components/LoginPageComponents/InputField";
import { Button } from "@/components/LoginPageComponents/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "./LoginStackNavigator";
import { loginStyles } from "./LoginStyles";

type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  "ForgotPassword"
>;

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigation = useNavigation<ForgotPasswordNavigationProp>();

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
                label="School Email"
                value={email}
                onChangeText={setEmail}
                placeholder="email@ufl.edu"
                keyboardType="email-address"
              />
              <View style={loginStyles.spacing} />
              <Button
                text="Continue →"
                onPress={() => navigation.navigate("ForgotPasswordEnterCode")}
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

export default ForgotPassword;
