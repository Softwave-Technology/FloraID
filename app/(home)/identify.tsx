import { useState } from 'react';
import { View, Text, StatusBar, Platform, SafeAreaView } from 'react-native';
import ExampleScan from '~/components/ExampleScan';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function IdentifyScreen() {
  const [instruction, setInstruction] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

  const toggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  return (
    <View className="flex-1 justify-center bg-offwhite">
      <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        {!instruction ? <ExampleScan onDismiss={() => setInstruction(true)} /> : <CameraView />}
      </SafeAreaView>
    </View>
  );
}
