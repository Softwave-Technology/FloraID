import { View, Text, Image } from 'react-native';
import { LegendList } from '@legendapp/list';
import plants from '../assets/plants.json';

export default function PlantCard() {
  return (
    <View className="p-2">
      <LegendList
        className="flex-1"
        horizontal
        showsHorizontalScrollIndicator={false}
        data={plants}
        renderItem={({ item }) => (
          <View className="flex-row items-center space-x-2 border-b border-gray-200 p-2">
            <Image source={{ uri: item.image }} className="h-20 w-20" />
            <Text className="text-md font-bold">{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={25}
      />
    </View>
  );
}
