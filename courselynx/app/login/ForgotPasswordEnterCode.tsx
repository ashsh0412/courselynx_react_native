import { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";
import { LinkText } from "@/components/LoginPageComponents/CreateAccountComponents/LinkText";
import VerificationCode from "@/components/LoginPageComponents/CreateAccountComponents/VerificationCode";

export const ForgotPasswordEnterCode: React.FC<{
  onSignIn: () => void;
  onVerify: () => void;
}> = ({ onSignIn, onVerify }) => {
  const [code, setCode] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.blueSection}>
          <View style={styles.headerContainer}>
            <Logo />
            <Text style={styles.mainTitle}>You've got mail!</Text>
            <Text style={styles.subHeader}>
              Check your school email (.edu) for the verification code and enter
              it below.
            </Text>
          </View>
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.whiteContainer}>
            <View style={styles.form}>
              <Text style={styles.label}>Code</Text>
              <VerificationCode onChange={(enteredCode) => setCode(enteredCode)}/>
              <View style={styles.spacing} />
              <Button
                text="Verify"
                onPress={onVerify}
                disabled={code.length < 6}
                />
              <View style={styles.linkWrapper}>
                <View style={styles.resendWrapper}>
                  <Text style={styles.infoText}>DIDN'T RECEIVE EMAIL? </Text>
                  <LinkText
                    text="RESEND CODE"
                    onPress={() => console.log("Resend verification code")}
                  />
                </View>
                <Text style={styles.backText} onPress={onSignIn}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4285F4",
  },
  content: {
    flexGrow: 1,
  },
  blueSection: {
    backgroundColor: "#4285F4",
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerContainer: {
    paddingHorizontal: 24,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subHeader: {
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 12,
    opacity: 0.9,
  },
  formWrapper: {
    backgroundColor: "#4285F4",
  },
  whiteContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    height: "100%",
  },
  spacing: {
    height: 16,
  },
  linkWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  resendWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
  infoText: {
    fontSize: 14,
    color: "#808080",
  },
  backText: {
    color: "#4285F4",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "400",
    color: "#666",
    marginBottom: 10,
    marginLeft: 2,
  },
});

export default ForgotPasswordEnterCode;
