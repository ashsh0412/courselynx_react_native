import { StatusBar } from "react-native";
import LoginPage from "../login";

const SignOutPage: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LoginPage />
    </>
  );
};

export default SignOutPage;
