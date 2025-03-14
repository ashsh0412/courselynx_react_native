import React from "react";
import { Image } from "react-native";

interface LogoProps {
  tintColor?: string;
}

const Logo: React.FC<LogoProps> = ({ tintColor = "" }) => {
  return (
    <Image source={require("@/assets/images/CourseLynxLogo.png")}
      style={{
        width: 190,
        height: 55,
        tintColor: tintColor,
      }}
      resizeMode="contain"
    />
  );
};

export default Logo;
