import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

export default function IdentifyScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Photo taken:', photo.uri);
      // pass photo.uri to AI function here
    }
  };

  if (!permission?.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-offwhite">
        <Text className="text-lg">Waiting for camera permission...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#FAF9F6',
      }}>
      <View className="flex-1 items-center px-4 pb-6">
        {/* Camera View */}
        <View className="relative h-[80%] w-full overflow-hidden rounded-xl">
          <CameraView
            ref={cameraRef}
            facing={facing}
            style={{ flex: 1 }}
            className="w-full rounded-xl"
          />

          {/* Overlay using absolute positioning */}
          <View className="absolute inset-0 justify-between p-4">
            <View className="items-end">
              <Pressable onPress={toggleCameraFacing}>
                <MaterialIcons name="flip-camera-ios" size={24} color={'white'} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Scan Button */}
        <View className="mt-6 items-center">
          <Pressable
            onPress={takePicture}
            className="h-16 w-16 rounded-full border-4 border-green-600 bg-white"
          />
          <Text className="mt-2 text-center font-medium text-gray-700">Scan Plant</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
