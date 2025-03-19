import { View, Text, ScrollView, FlatList } from 'react-native';
import SearchBar from '@/components/SearchBar';
import styles from './settings.styles';
import ProfileCard from '@/components/ProfileComponents/ProfileCard';

const mock = [
  {
    id: 1,
    name: "AAA",
    uri: "#888888",
    major: "Major: Business Management",
    year: "2026",
  },
  {
    id: 2,
    name: "AAA",
    uri: "#888888",
    major: "Major: Business Management",
    year: "2026",
  },
  {
    id: 3,
    name: "AAA",
    uri: "#888888",
    major: "Major: Business Management",
    year: "2026",
  },
];

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>BLOCKED CONTACTS</Text>

      <SearchBar onSearch={() => { }} placeholder="Search contacts to block them..." />

      <FlatList
        data={mock}
        renderItem={({ item }) => (
          <ProfileCard
            id={item.id}
            uri={item.uri}
            name={item.name}
            hasAdd
          />
        )}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
