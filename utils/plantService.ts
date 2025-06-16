// services/plantService.ts
import { databaseService } from './services';
import { cameraService } from './cameraService';
import { openaiService } from './openaiService';

export const plantService = {
  // Complete plant identification flow
  identifyPlant: async (imageUri: string, userId: string) => {
    try {
      // 1. Resize image for AI
      const resizedImage = await cameraService.resizeForAI(imageUri);
      if (!resizedImage?.base64) {
        throw new Error('Failed to process image');
      }

      // 2. Upload original image to storage
      const fileName = `${userId}/${Date.now()}.jpg`;
      const { data: imageUrl, error: uploadError } = await databaseService.uploadImage(
        'plant-images',
        fileName,
        imageUri
      );

      if (uploadError || !imageUrl) {
        throw new Error('Failed to upload image');
      }

      // 3. Get AI identification
      const aiResult = await openaiService.identifyPlant(resizedImage.base64);
      if (!aiResult) {
        throw new Error('AI identification failed');
      }

      // 4. Save identification to database
      const identification = {
        user_id: userId,
        image_url: imageUrl,
        identified_name: aiResult.species.common_name,
        confidence_score: aiResult.confidence,
        ai_response: aiResult,
      };

      const { data: savedIdentification, error: saveError } =
        await databaseService.createIdentification(identification);

      if (saveError) {
        throw new Error('Failed to save identification');
      }

      return {
        success: true,
        data: {
          identification: savedIdentification,
          aiResult,
        },
      };
    } catch (error) {
      console.error('Plant identification error:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'An error occurred during plant identification',
      };
    }
  },
};
