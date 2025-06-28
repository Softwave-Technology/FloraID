import { useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';

export default function HowToScanOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <View className="m-6 items-center justify-center gap-2 rounded-lg bg-black/30 p-2">
      {/* Example image */}
      <Image
        source={{
          uri: 'https://nhgardensolutions.wordpress.com/wp-content/uploads/2024/03/18.-purple-crocuses.jpg?w=1024',
        }}
        className="m-6 h-60 w-60 rounded-lg"
        resizeMode="cover"
        onLoad={() => <ActivityIndicator size={'large'} style={{ alignSelf: 'center' }} />}
      />

      {/* Instructions */}
      <Text className="mb-4 px-6 text-center text-lg font-bold text-primary">
        Make sure the plant is centered and clear. Use good lighting and avoid cluttered
        backgrounds.
      </Text>

      {/* Button */}
      <Pressable onPress={() => setVisible(false)} className="rounded-full bg-green-700 px-6 py-3">
        <Text className="p-2 text-lg font-bold text-white">I understand.</Text>
      </Pressable>
    </View>
  );
}
