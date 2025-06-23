import { View, Text, Image, Pressable } from 'react-native';
import { LegendList } from '@legendapp/list';
//import { FlashList } from '@shopify/flash-list';
import vegetables from '../assets/vegetables.json';
import { Link } from 'expo-router';

export default function PlantCard() {
  return (
    <LegendList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={vegetables}
      renderItem={({ item }) => (
        <Link href={`/vegetable/${item.id}`} asChild>
          <Pressable className='className="w-50 shadow-black/10"> m-4 items-center rounded-2xl bg-white p-6 shadow'>
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
          </Pressable>
        </Link>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={25}
    />
  );
}
