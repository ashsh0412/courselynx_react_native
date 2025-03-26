import { useEffect } from "react";
import { router } from "expo-router";

const SignOutPage: React.FC = () => {
  useEffect(() => {
    router.replace("/login");
  }, []);

  return null;
};

export default SignOutPage;
