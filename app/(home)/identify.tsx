import { View, Text } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

export default function IdentifyScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const handleRequestPermission = async () => {
    if (!permission) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        console.error('Camera permission not granted');
      }
    }
  };

  return <View className="flex-1 bg-offwhite"></View>;
}
