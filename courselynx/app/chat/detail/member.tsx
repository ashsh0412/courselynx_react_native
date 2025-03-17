import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useLocalSearchParams } from "expo-router";
import UserCard from "@/components/UserCard";

type Member = {
  id: number;
  name: string;
};

// Mock Data
const membersData: Member[] = [
  { id: 1, name: "Albert" },
  { id: 2, name: "Alberta" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Charlotte" },
  { id: 5, name: "Matthew" },
  { id: 6, name: "Nathan" },
  { id: 7, name: "Albert" },
  { id: 8, name: "Alberta" },
  { id: 9, name: "Charlie" },
];
//Colors for Members
const getRandomColor = (): string => {
  const colors = [
    "#E47F7F",
    "#80BD72",
    "#E1DE7A",
    "#E996DE",
    "#B48BE9",
    "#71C3D4",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function MembersScreen() {
  const { title, color } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMembers = membersData.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Array.isArray(color) ? color[0] : (color as string),
      }}
    >
      <View style={styles.container}>
        {/* Header Title */}
        <Text style={styles.titleText}>{title}</Text>

        {/* Search Bar Container */}
        <View style={styles.searchBarContainer}>
          <Entypo
            name="magnifying-glass"
            size={24}
            color="#aaa"
            style={styles.icon}
          />
          <TextInput
            style={styles.searchBar}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder=""
          />
        </View>

        {/* Members List */}
        <FlatList
          data={filteredMembers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <>
                <UserCard
                  id={item.id}
                  name={item.name}
                  uri={getRandomColor()}
                  hasAdd={true}
                  inCommon={["COP4020", "STA3032", "STA3032"]}
                />
                <UserCard
                  id={item.id}
                  name={item.name}
                  uri={getRandomColor()}
                  hasAdd={true}
                />
              </>
            );
          }}
          indicatorStyle="black"
          contentContainerStyle={{
            paddingHorizontal: 11,
          }}
          scrollIndicatorInsets={{ right: 5 }}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    marginTop: 154,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  titleText: {
    fontFamily: "SF Pro Display",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 30,
    textAlign: "center",
    color: "#02102E",
  },
  searchBarContainer: {
    width: 352,
    height: 36,
    backgroundColor: "rgba(45, 138, 251, .1)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: 20,
    marginTop: 19,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 6,
    color: "#2D8AFB",
    width: 24,
    height: 24,
  },
  searchBar: {
    paddingHorizontal: 10,
    flex: 1,
    fontSize: 16,
    textAlign: "left",
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#ddd",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  memberName: {
    fontSize: 16,
  },
});
