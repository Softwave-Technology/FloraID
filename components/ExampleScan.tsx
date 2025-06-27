import { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

export default function HowToScanOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50 items-center justify-center bg-black/70">
      {/* Example image */}
      <Image
        source={{
          uri: 'https://nhgardensolutions.wordpress.com/wp-content/uploads/2024/03/18.-purple-crocuses.jpg?w=1024',
        }}
        className="mb-6 h-80 w-80 rounded-lg"
        resizeMode="cover"
      />

      {/* Instructions */}
      <Text className="mb-4 px-6 text-center text-lg text-white">
        Make sure the plant is centered and clear. Use good lighting and avoid cluttered
        backgrounds.
      </Text>

      {/* Button */}
      <Pressable onPress={() => setVisible(false)} className="rounded-full bg-green-700 px-6 py-3">
        <Text className="p-2 text-lg font-bold text-white">I Understand</Text>
      </Pressable>
    </View>
  );
}
