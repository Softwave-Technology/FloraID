import { Redirect, Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuth } from '~/providers/AuthContext';

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={'/(auth)/signin'} />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2F855A',
        tabBarInactiveTintColor: 'grey',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FAF9F6',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Last Identifications',
          tabBarIcon: ({ color }) => <TabBarIcon name="hourglass" color={color} />,
        }}
      />
    </Tabs>
  );
}
