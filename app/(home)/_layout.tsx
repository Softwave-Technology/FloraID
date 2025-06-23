import { Redirect, router, Tabs } from 'expo-router';

import { TabBarIcon } from '../../components/TabBarIcon';
import { useAuth } from '~/providers/AuthContext';
import { Pressable } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

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
        name="identify"
        options={{
          title: 'Identify',
          tabBarButton: () => (
            <Pressable
              onPress={() => router.push('/(home)/identify')}
              style={{
                top: -20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2F855A',
                shadowColor: '#fff',
                shadowOffset: { width: 0.5, height: 0.5 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                width: 70,
                height: 70,
                borderRadius: 35,
                alignSelf: 'center',
              }}>
              <FontAwesome6 name="camera" size={30} color="white" />
            </Pressable>
          ),
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
