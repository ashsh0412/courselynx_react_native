// This is a special type of Header that has CourseLynx Logo at the top-left

import { View, Text, StyleSheet } from "react-native";
import Logo from "./Logo";

interface HeaderLogoProps {
  title?: string;
  subTitle?: string;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  title = "",
  subTitle = "",
}) => {
  return (
    <View style={styles.headerContainer}>
      <Logo tintColor="white" />
      <Text style={styles.mainTitle}>{title}</Text>
      <Text style={styles.subHeader}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default HeaderLogo;
