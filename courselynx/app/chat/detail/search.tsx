import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Search from "../../../assets/svg/searchChat.svg";
import { FlatList } from "react-native";
import { Link } from "expo-router";

import { chatMessages } from "@/mock/chatMessages";

interface Message {
  id: number;
  sender: string;
  message: string;
  date: string;
  color: string;
}

interface SearchScreenProps {
  messages?: Message[]; // Make messages optional in case they are not passed
}

// Temporarily have chatMessages as default
const SearchScreen: React.FC<SearchScreenProps> = ({
  messages = chatMessages,
}) => {
  // Default to empty array if messages is undefined
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState<Message[]>(messages);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredMessages(messages);
      } else {
        const filtered = messages.filter((msg) =>
          msg.message.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMessages(filtered);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={{ marginLeft: 10 }}>
          <Search width={18} height={18} fillOpacity={0.4} />
        </View>
        <TextInput
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
          placeholderTextColor={"#767680AA"}
        />
      </View>
      <View style={{ flex: 1, marginVertical: 5 }}>
        <FlatList
          data={filteredMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <Link
                dismissTo
                href={`/chat?scrollId=${item.id}`}
                key={item.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "white" : "#76768015",
                }}
              >
                <View
                  style={{
                    paddingVertical: 10,
                    width: "100%",
                    paddingHorizontal: 25,
                  }}
                >
                  <Text style={styles.searchName}>{item.sender}</Text>
                  <Text style={[styles.searchText, { color: item.color }]}>
                    {highlightText(item.message, searchQuery)}
                  </Text>
                </View>
              </Link>
            );
          }}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    alignItems: "center",
    marginLeft: 20,
  },
  searchBarContainer: {
    height: 36,
    marginTop: 7,
    flexDirection: "row",
    backgroundColor: "#7676801F",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    textAlign: "left",
  },
  searchText: { fontFamily: "SF Pro Display", fontSize: 15, fontWeight: 400 },
  searchName: {
    fontSize: 15,
    fontWeight: 500,
    color: "#4F4F4F",
    marginBottom: 3,
  },
});

export default SearchScreen;
