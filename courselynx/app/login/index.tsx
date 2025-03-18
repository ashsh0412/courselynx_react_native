import React, { useState } from "react";
import { StatusBar } from "react-native";
import CreateAccountPage from "../login/CreateAccount";
import CreateProfilePage from "../login/CreateProfile";
import ConfirmCoursePage from "../login/ConfirmCourse";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordEnterCode from "./ForgotPasswordEnterCode";
import CreateNewPassword from "./CreateNewPassword";
import SignInPage from "./Signin";

type Step =
  | "createAccount"
  | "createProfile"
  | "confirmCourse"
  | "signIn"
  | "forgotPassword"
  | "forgotPasswordEnterCode"
  | "createNewPassword";

const LoginPage: React.FC = () => {
  const [step, setStep] = useState<Step>("signIn");

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {step === "createAccount" && (
        <CreateAccountPage
          onNext={() => setStep("createProfile")}
          onSignIn={() => setStep("signIn")}
        />
      )}
      {step === "createProfile" && (
        <CreateProfilePage onNext={() => setStep("confirmCourse")} />
      )}
      {step === "confirmCourse" && <ConfirmCoursePage />}
      {step === "signIn" && (
        <SignInPage
          onCreateAccount={() => setStep("createAccount")}
          onForgotPassword={() => setStep("forgotPassword")}
        />
      )}
      {step === "forgotPassword" && (
        <ForgotPassword
          onSignIn={() => setStep("signIn")}
          onContinue={() => setStep("forgotPasswordEnterCode")}
        />
      )}
      {step === "forgotPasswordEnterCode" && (
        <ForgotPasswordEnterCode
          onSignIn={() => setStep("signIn")}
          onVerify={() => setStep("createNewPassword")}
        />
      )}
      {step === "createNewPassword" && (
        <CreateNewPassword
          onSignIn={() => setStep("signIn")}
          onContinue={() => console.log("Password changed successfully!")}
        />
      )}
    </>
  );
};

export default LoginPage;
