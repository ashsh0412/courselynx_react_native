import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface Chat {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  color: string;
}

const chats: Chat[] = [
  { id: 1, name: 'Business and Finance', message: 'Sara: What should I invest in?', time: '5:05 PM', unread: 3, color: '#f87171' },
  { id: 2, name: 'Statistics', message: 'John: Whats the answers to HW 5?', time: '4:15 PM', unread: 7, color: '#34d399' },
  { id: 3, name: 'World History', message: 'Steve: What is the capital of Canada?', time: '3:02 PM', unread: 2, color: '#facc15' },
  { id: 4, name: 'English', message: 'Brittany: Great Gatsby opinions?', time: '3:00 PM', unread: 5, color: '#f472b6' },
  { id: 5, name: 'Music Theory', message: 'Tiana: I play the trumpet!', time: '2:15 PM', unread: 1, color: '#c084fc' },
  { id: 6, name: 'Sports', message: 'UF: Good home season!', time: '1:55 PM', unread: 3, color: '#60a5fa' },
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/CourseLynxLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.iconContainer}>
            <MaterialIcons name="notifications-none" size={34} color="#000" />
            <MaterialIcons name="account-circle" size={38} color="#000" />
          </View>
        </View>
  
        <ScrollView style={styles.chatList}>
          {chats.map((chat) => (
            <Link
              key={chat.id}
              href={{
                pathname: '/chat',
                params: { title: chat.name, color: chat.color },
              }}
              asChild
            >
              <TouchableOpacity style={styles.chatItem}>
                <View style={[styles.chatIcon, { backgroundColor: chat.color || '#000' }]} />
                <View style={styles.chatInfo}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatMessage}>{chat.message}</Text>
                </View>
                <View style={styles.chatMeta}>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#3b82f6' },
  logo: { width: 165, height: 30 },
  iconContainer: { flexDirection: 'row', alignItems: 'center' },
  chatList: { padding: 16 },
  chatItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  chatIcon: { width: 48, height: 48, borderRadius: 12, marginRight: 16 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 18, fontWeight: '600' },
  chatMessage: { color: '#6b7280' },
  chatMeta: { alignItems: 'flex-end' },
  chatTime: { color: '#9ca3af' },
  unreadBadge: { backgroundColor: '#3b82f6', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  unreadText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
