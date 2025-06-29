import { Redirect, Stack } from 'expo-router';
import { useAuth } from '~/providers/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href={'/(home)'} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
