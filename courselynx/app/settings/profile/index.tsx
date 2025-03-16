import Header from "@/components/HeaderComponents/Header";
import { useLocalSearchParams } from "expo-router";
import PublicView from "./public";
import EditView from "./edit";

export interface ProfileProps {
  avatar: string;
  name: string;
  major: string;
  gradYear: string;
  bio: string;
  linkedin: string;
  discord: string;
};

export default function ProfileScreen() {
  const { id } = useLocalSearchParams() || {};

  const data = {
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bohol_-_Chocolate_Hills.jpg/2560px-Bohol_-_Chocolate_Hills.jpg",
    name: "Ana Souza",
    major: "Computer Science",
    gradYear: "2026",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur",
    linkedin: "abcxyz",
    discord: "",
  }

  if (id) {
    return id === "myself" ? (
      <>
        <Header
          title={"My Profile"}
          hasShare={true}
          hasSettings={true}
          withBorder
        />
        <EditView userProfile={data} />
      </>
    ) : (
      <>
        <Header
          title={"Profile"}
          hasShare={true}
          withBorder
        />
        <PublicView userProfile={data} />
      </>
    );
  }

  return (
    <>
      <Header title={"No Found"} />
    </>
  );
}
