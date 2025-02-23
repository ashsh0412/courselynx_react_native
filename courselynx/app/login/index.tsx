import React from "react";
import { StatusBar } from "react-native";
import { CreateAccountPage } from "./CreateAccount";

const LoginPage: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <CreateAccountPage />
    </>
  );
};

export default LoginPage;
