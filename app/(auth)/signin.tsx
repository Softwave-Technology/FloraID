import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  View,
  TextInput,
  Text,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
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

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <ScrollView
        contentContainerClassName="gap-2 p-4"
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text className="pb-5 text-2xl font-extrabold text-green-800">FloraID</Text>
        </View>
        <View className="border-hairline w-full rounded-lg border-gray-400 p-4">
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
        </View>
        <View className="border-hairline w-full rounded-lg border-gray-400 p-4">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        {/* Error state and warning text */}
        <Pressable
          className="border-hairline mt-4 w-full items-center rounded-lg bg-green-800 p-4"
          onPress={handleSignIn}>
          <Text className="text-lg font-extrabold text-white">Sign In</Text>
        </Pressable>
        <View className="flex-row items-center gap-2 p-2">
          <Text className="text-gray-400">Do not you have an account?</Text>
          <Pressable onPress={() => router.push('/(auth)/signup')}>
            <Text className="font-bold text-green-800">Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
