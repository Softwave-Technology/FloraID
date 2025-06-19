import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native';

export default function Home() {
  return (
    <View className="bg-offwhite flex-1">
      <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <Text>Welcome home</Text>
      </SafeAreaView>
    </View>
  );
}
