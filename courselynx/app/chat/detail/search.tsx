import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

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

const SearchScreen: React.FC<SearchScreenProps> = ({ messages = [] }) => {  // Default to empty array if messages is undefined
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>(messages);

  // check if message are passed correctly
  console.log('Messages in SearchScreen:', messages);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredMessages(messages);
      } else {
        const filtered = messages.filter((msg) =>
          msg.message.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMessages(filtered);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, messages]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.searchBarContainer}>
        <Entypo
          name="magnifying-glass"
          size={20}
          color="#aaa"
          style={styles.icon}
        />
        <TextInput
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
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
    backgroundColor: 'white',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 10,
  },
  searchBarContainer: {
    left: 18,
    width: 374,
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#7676801F',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
    color: '#3C3C4399',
    width: 24,
    height: 22,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
  },
});

export default SearchScreen;
