import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Search from "../../../assets/svg/searchChat.svg";

// MOCK DATA WITH COLORS
const chatMessages = [
  {
    id: 1,
    sender: "Emily Johnson",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: new Date().toISOString(),
    color: "#833C3C",
  },
  {
    id: 2,
    sender: "Michael Smith",
    message:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    color: "#F97316",
  },
  {
    id: 3,
    sender: "Emily Johnson",
    message:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    color: "#833C3C",
  },
  {
    id: 4,
    sender: "Sophia Martinez",
    message:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    color: "#80BD72",
  },
  {
    id: 5,
    sender: "David Brown",
    message:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
    date: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    color: "#B48BE9",
  },
  {
    id: 6,
    sender: "Alice Walker",
    message: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    color: "#4CAF50",
  },
  {
    id: 7,
    sender: "Michael Smith",
    message: "Vestibulum fringilla pede sit amet augue.",
    date: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000
    ).toISOString(),
    color: "#F97316",
  },
  {
    id: 8,
    sender: "Sophia Martinez",
    message:
      "Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.",
    date: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000
    ).toISOString(),
    color: "#80BD72",
  },
  {
    id: 9,
    sender: "David Brown",
    message: "Maecenas malesuada elit lectus felis, malesuada ultricies.",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    color: "#B48BE9",
  },
  {
    id: 10,
    sender: "Sophia Martinez",
    message: "Donec in velit vel ipsum auctor pulvinar.",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    color: "#80BD72",
  },
];

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
  const [filteredMessages, setFilteredMessages] =
    useState<Message[]>(chatMessages);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredMessages(chatMessages);
      } else {
        const filtered = chatMessages.filter((msg) =>
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
      <View>
        {filteredMessages.map((message) => (
          <View key={message.id} style={{ marginBottom: 10 }}>
            <Text style={{ color: message.color }}>
              {message.sender}: {highlightText(message.message, searchQuery)}
            </Text>
          </View>
        ))}
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
});

export default SearchScreen;
