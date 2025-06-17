import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, View, TextInput, Text, Pressable } from 'react-native';
import { useAuthStore } from '~/store/useAuthStore';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading } = useAuthStore();

  const handleSignIn = async () => {
    const result = await signIn(email, password);
    if (result.error) {
      console.log(result.error);
      Alert.alert('Error while signing in ', result.error.message);
    } else {
      Alert.alert('Success', 'Welcome back!');
      router.replace('/(home)');
    }
  };
  return <View className="flex-1 justify-center" />;
}
