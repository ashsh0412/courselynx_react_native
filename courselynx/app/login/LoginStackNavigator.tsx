import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccountPage from "../login/CreateAccount";
import CreateProfilePage from "../login/CreateProfile";
import ConfirmCoursePage from "../login/ConfirmCourse";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordEnterCode from "./ForgotPasswordEnterCode";
import CreateNewPassword from "./CreateNewPassword";
import SignInPage from "./Signin";

export type LoginStackParamList = {
  SignIn: undefined;
  CreateAccount: undefined;
  CreateProfile: undefined;
  ConfirmCourse: undefined;
  ForgotPassword: undefined;
  ForgotPasswordEnterCode: undefined;
  CreateNewPassword: undefined;
};

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="CreateAccount" component={CreateAccountPage} />
      <Stack.Screen name="CreateProfile" component={CreateProfilePage} />
      <Stack.Screen name="ConfirmCourse" component={ConfirmCoursePage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen
        name="ForgotPasswordEnterCode"
        component={ForgotPasswordEnterCode}
      />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;
