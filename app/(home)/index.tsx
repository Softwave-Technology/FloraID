import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import PlantCard from '~/components/PlantCard';
import VegetableCard from '~/components/VegetableCard';

export default function Home() {
  return (
    <View className="flex-1 bg-offwhite">
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          paddingBottom: Platform.OS === 'android' ? 80 : 0,
        }}>
        <View className="border-b-hairline flex-row items-center justify-between border-bordergray p-2">
          <Text className=" pl-2 text-xl font-extrabold text-primary">Welcome to FloraID</Text>
          {/* Route to users profile and signout etc. */}
          <FontAwesome name="user" size={24} color={'gray'} onPress={() => {}} className="pr-2" />
        </View>
        <View className="p-2">
          {/* Explore plants horizontal list */}
          <Text className=" pl-2 text-xl font-bold">Explore Plants</Text>
          <PlantCard />
        </View>
        <View className="p-2">
          {/*Explore vegetables horizontal list*/}
          <Text className="pl-2 text-xl font-bold text-darktext">Grow Your Own Vegetables</Text>
          <VegetableCard />
        </View>
        <View className="p-2">
          {/* Store identification photos and show here for history */}
          <Text className="pl-2 text-xl font-bold text-darktext">Recent Identifications</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
