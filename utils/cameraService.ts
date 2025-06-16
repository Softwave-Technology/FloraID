// services/cameraService.ts
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export const cameraService = {
  // Request permissions
  requestPermissions: async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
  },

  // Check permissions
  checkPermissions: async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    return status === 'granted';
  },

  // Take photo
  takePhoto: async (cameraRef: any) => {
    if (!cameraRef.current) return null;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });
      return photo;
    } catch (error) {
      console.error('Error taking photo:', error);
      return null;
    }
  },

  // Pick from gallery
  pickFromGallery: async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      return null;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      return null;
    }
  },

  // Resize image for AI
  resizeForAI: async (imageUri: string) => {
    try {
      const resized = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 1024 } }],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );
      return resized;
    } catch (error) {
      console.error('Error resizing image:', error);
      return null;
    }
  },
};
