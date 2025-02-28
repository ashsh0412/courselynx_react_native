import { useState } from 'react';
import { View, Text } from 'react-native';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import styles from './SettingsStyles';

export default function SecurityScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = () => {
    console.log("Updating password...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>CHANGE PASSWORD</Text>
      <View style={{ gap: 20, marginTop: 20 }}>
        <InputField label="Current Password" secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} />
        <InputField label="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
        <InputField label="Confirm New Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        <Button text="Update Password" onPress={handleUpdatePassword}></Button>
      </View>
    </View>
  );
}
