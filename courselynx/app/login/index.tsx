import React, { useState } from "react";
import { StatusBar } from "react-native";
import CreateAccountPage from "../login/CreateAccount";
import CreateProfilePage from "../login/CreateProfile";
import ConfirmCoursePage from "../login/ConfirmCourse";
import SignInPage from "./Signin";

type Step = "createAccount" | "createProfile" | "confirmCourse" | "signIn";

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
        <SignInPage onCreateAccount={() => setStep("createAccount")} />
      )}
    </>
  );
};

export default LoginPage;
