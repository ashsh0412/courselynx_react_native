import { useState } from 'react';
import { View, Text } from 'react-native';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import styles from './SettingsStyles';

export default function DeleteAccountScreen() {
  const [password, setPassword] = useState("");

  const handleDeleteAccount = () => {
    console.log("Delete account...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>CONFIRM ACTION</Text>
      
      <View style={{ gap: 20, marginTop: 20 }}>
        <InputField label="Current Password" secureTextEntry value={password} onChangeText={setPassword} />
        <Button text="Delete Account" onPress={handleDeleteAccount}></Button>
      </View>
      
    </View>
  );
}
