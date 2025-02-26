import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import ProfilePage from "./ProfileScreen";

export default function ProfileScreen() {
  const { username } = useLocalSearchParams() || {};

  const data = {
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bohol_-_Chocolate_Hills.jpg/2560px-Bohol_-_Chocolate_Hills.jpg",
    name: "Ana Souza",
    major: "Computer Science",
    gradYear: "2026",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur",
    linkedin: "abcxyz",
    discord: "N/A",
  }

  if (username) {
    if (username === "myself") {
      return (
        <>
          <Header title={"My Profile"} hasShare={true} hasSettings={true} />
          <ProfilePage.Self userdata={data} />
        </>
      );
    }
    return (
      <>
        <Header title={"Profile"} hasShare={true} />
        <ProfilePage.Public userdata={data} />
      </>
    );
  }

  return (
    <>
      <Header title={"No Found"} />
    </>
  );
}