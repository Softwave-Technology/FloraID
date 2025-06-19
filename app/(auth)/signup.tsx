import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  View,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuthStore } from '~/store/useAuthStore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signUp, loading } = useAuthStore();

  const handleSignUp = async () => {
    const result = await signUp(email, password, fullName);

    if (result.error) {
      console.log(result.error);
      Alert.alert('Error while signing up ', result.error.message);
    } else {
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/(auth)/signin');
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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <ScrollView
        contentContainerClassName="gap-2 p-4"
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <Text className="pb-5 text-2xl font-extrabold text-green-800">FloraID</Text>
        <View className="border-hairline w-full rounded-lg border-gray-400 p-4">
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
        </View>
        <View className="border-hairline w-full rounded-lg border-gray-400 p-4">
          <TextInput value={fullName} onChangeText={setFullName} placeholder="Full Name" />
        </View>
        <View className="border-hairline w-full rounded-lg border-gray-400 p-4">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          {/* Add show password icon with functionality */}
        </View>
        <Pressable
          onPress={handleSignUp}
          className="border-hairline mt-4 w-full items-center rounded-lg border-gray-400 bg-green-800 p-4">
          <Text className="text-lg font-extrabold text-white">Sign Up</Text>
        </Pressable>
        <View className="flex-row items-center gap-2 p-2">
          <Text className="text-gray-400">Already have an account?</Text>
          <Pressable onPress={() => router.push('/(auth)/signin')}>
            <Text className="font-bold text-green-800">Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
