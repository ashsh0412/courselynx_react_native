import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AccountCreatedScreen: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.blueSection}>
          <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
              <Icon name="checkmark-circle" size={120} color="#4285F4" />
            </View>
            <Text style={styles.mainTitle}>Account Created!</Text>
            <Text style={styles.subHeader}>
                Your account and profile have been created
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Join Courses →</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4285F4",
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
  },
  blueSection: {
    backgroundColor: "#4285F4",
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subHeader: {
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 12,
    opacity: 0.9,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 40,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4285F4",
  },
});

export default AccountCreatedScreen;
