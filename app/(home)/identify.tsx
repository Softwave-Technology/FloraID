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

export default function IdentifyScreen() {
  const [instruction, setInstruction] = useState(false);
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
      // pass photo uri to ai
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
      {permission?.granted ? (
        <View className="flex-1 items-center px-4 pb-6">
          <View className="h-[80%] w-full overflow-hidden rounded-xl">
            <CameraView ref={cameraRef} facing={facing} style={{ flex: 1 }} className="w-full">
              <View className="flex-1 justify-between bg-transparent p-4">
                <View className="items-end">
                  <Pressable onPress={toggleCameraFacing}>
                    <Text className="text-lg font-semibold text-white">Flip</Text>
                  </Pressable>
                </View>
              </View>
            </CameraView>
          </View>

          <View className="mt-6 items-center">
            <Pressable
              onPress={takePicture}
              className="h-16 w-16 rounded-full border-4 border-green-600 bg-white"
            />
            <Text className="mt-2 text-center font-medium text-gray-700">Scan Plant</Text>
          </View>
        </View>
      ) : (
        <View>
          <View className="flex-1 items-center justify-center bg-offwhite">
            <Text className="text-lg">Camera permission is required to use this feature.</Text>
            <Pressable onPress={requestPermission} className="mt-4">
              <Text className="text-blue-600">Grant Permission</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
