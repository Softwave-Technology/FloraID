import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '~/utils/supabase';
import { identifyPlant } from '~/utils/identifyPlants';
import { useAuth } from '~/providers/AuthContext';

export default function IdentifyScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const toggleCameraFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (!cameraRef.current || !user) return;

    try {
      setLoading(true);

      const photo = await cameraRef.current.takePictureAsync();
      const photoRes = await fetch(photo.uri);
      const blob = await photoRes.blob();

      const fileName = `${user.id}-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('identification-photos')
        .upload(fileName, blob, { contentType: 'image/jpeg' });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('identification-photos')
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      const result = await identifyPlant(publicUrl);

      const { error: dbError } = await supabase.from('identifications').insert({
        user_id: user.id,
        image_url: publicUrl,
        identified_name: result.identified_name,
        confidence_score: result.confidence_score,
        ai_response: result.ai_response,
      });

      if (dbError) throw dbError;

      Alert.alert('✅ Plant Identified', `Name: ${result.identified_name}`);
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Error', 'Something went wrong while identifying the plant.');
    } finally {
      setLoading(false);
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
        <Text className="p-2 text-xl font-bold text-primary">Take a picture to identify...</Text>
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
