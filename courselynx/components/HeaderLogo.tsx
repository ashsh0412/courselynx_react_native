// This is a special type of Header that has CourseLynx Logo at the top-left.
// Since it also has a special background, the page content has to be the children of this header.

import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import Logo from "./Logo";

interface HeaderLogoProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  title = "",
  titleStyle = {},
  subtitle = "",
  subtitleStyle = {},
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Logo tintColor="white" />
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      </View>
      <View style={styles.bodyContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(45, 138, 251, 1)",
  },
  headerContainer: {
    width: "100%",
    paddingTop: 36,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 12,
  },
  subtitle: {
    color: "white",
    fontSize: 12,
    marginTop: 16,
    letterSpacing: -0.6,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    padding: 16,
  }
});

export default HeaderLogo;
