import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "4%",
  },
  scrollContainer: {
    flex: 1,
  },
  lightTextColor: {
    color: "#111",
  },
  lightBackgroundColor: {
    backgroundColor: "white",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 15,
    marginBottom: 5,
  },
  bio: {
    textAlign: "center",
    fontSize: 14,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  item: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  groupColor: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  form: {
    marginBottom: 10,
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    left: "50%",
    transform: [{ translateX: 45 }],
    backgroundColor: "#3b82f6",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: 70,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
