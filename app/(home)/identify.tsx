import { useEffect, useState } from 'react';
import { View, Text, StatusBar, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import ExampleScan from '~/components/ExampleScan';
import { CameraType, useCameraPermissions, CameraView } from 'expo-camera';

export default function IdentifyScreen() {
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

  const takePhoto = async () => {
    // take photo
  };

  return (
    <View className="flex-1 justify-center bg-offwhite">
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          flex: 1,
          paddingBottom: Platform.OS === 'android' ? 80 : 0,
        }}>
        {permission?.granted ? (
          <CameraView facing={facing} style={{ flex: 1 }} />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text>Waiting for permission...</Text>
            <ActivityIndicator size={'large'} />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
