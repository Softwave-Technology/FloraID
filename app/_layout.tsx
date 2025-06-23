import { AuthProvider } from '~/providers/AuthContext';
import '../global.css';

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </AuthProvider>
  );
}
