import { FontAwesome } from '@expo/vector-icons';
import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useAuth } from '~/providers/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-offwhite">
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <View className="flex-row items-center gap-4 p-2">
          <FontAwesome name="chevron-left" color={'#2F855A'} size={20} />
          <Text className="border-b-hairline border-bordergray text-xl font-bold text-primary">
            Profile
          </Text>
        </View>
        <View>
          <Text>{user?.email}</Text>
          <Text>{user?.id}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
