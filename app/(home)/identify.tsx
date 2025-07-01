import { useEffect, useState } from 'react';
import { View, Text, StatusBar, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import ExampleScan from '~/components/ExampleScan';
import { CameraType, useCameraPermissions, CameraView } from 'expo-camera';

export default function IdentifyScreen() {
  const [instruction, setInstruction] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const toggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  if (instruction && !permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-offwhite">
        <Text className="text-lg">Waiting for camera permission...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center bg-offwhite">
      <SafeAreaView
        style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, flex: 1 }}>
        {instruction && permission?.granted ? (
          <CameraView style={{ flex: 1 }} facing={facing} />
        ) : (
          <ExampleScan onDismiss={() => setInstruction(true)} />
        )}
      </SafeAreaView>
    </View>
  );
}
