import { View, Text, SafeAreaView, Platform, StatusBar, Button } from 'react-native';
import PlantCard from '~/components/PlantCard';

export default function Home() {
  return (
    <View className="flex-1 bg-offwhite">
      <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <Text className="border-b-hairline border-bordergray p-2 text-xl font-extrabold text-primary">
          Welcome to FloraID 👋
        </Text>
        <View className="p-2">
          {/* Explore plants horizontal list */}
          <Text className="text-xl font-bold">Explore Plants</Text>
          <PlantCard />
        </View>
        <View className="p-2">
          {/*Explore vegetables horizontal list*/}
          <Text className="text-xl font-bold">Grow Your Own Vegetables</Text>
        </View>
        <View className="p-2">
          <Text className="text-lg font-bold text-darktext">Identify a plant</Text>
          <View className="items-center">
            <Button title="Take photo" />
            <Text>or</Text>
            <Button title="Upload an image" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
