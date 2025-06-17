import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '~/store/useAuthStore';

export default function AuthLayout() {
  const { user } = useAuthStore();
  if (user) {
    return <Redirect href={'/(home)'} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
