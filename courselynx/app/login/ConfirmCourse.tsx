import { View, Text, ScrollView } from "react-native";
import { Logo } from "@/components/LoginPageComponents/CreateAccountComponents/Logo";
import { Button } from "@/components/LoginPageComponents/CreateAccountComponents/Button";
import CourseList from "@/components/LoginPageComponents/CreateAccountComponents/CourseList";
import { loginStyles } from "./LoginStyles";

export const ConfirmCoursePage: React.FC = () => {
  return (
    <View style={loginStyles.container}>
      <ScrollView
        contentContainerStyle={loginStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={loginStyles.blueSection}>
          <View style={loginStyles.headerContainer}>
            <Logo />
            <Text style={loginStyles.mainTitle}>Confirm your courses</Text>
            <Text style={loginStyles.subHeader}>
              You can always join or leave courses in the Courses page.
            </Text>
          </View>
        </View>
        <View style={loginStyles.formWrapper}>
          <View style={loginStyles.whiteContainer}>
            <View style={loginStyles.form}>
              <CourseList />
              <Button
                text="Confirm Courses"
                onPress={() => console.log("Create account")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConfirmCoursePage;
