import { View, Text, Image } from 'react-native';
//import { LegendList } from '@legendapp/list';
import { FlashList } from '@shopify/flash-list';
import plants from '../assets/plants.json';

export default function PlantCard() {
  return (
    <FlashList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={plants}
      renderItem={({ item }) => (
        <View className="w-50 m-4 items-center rounded-2xl bg-white p-6 shadow shadow-black/10">
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              className="mb-3 h-32 w-32 rounded-xl"
              resizeMode="cover"
            />
          ) : (
            <View className="mb-3 h-32 w-32 rounded-xl bg-gray-300" />
          )}
          <Text className="text-md text-center text-base font-semibold text-[#2C2C2C]">
            {item.name}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={25}
    />
  );
}
