import { identifyPlant } from './identifyPlants';
import { supabase } from './supabase';

export const saveIdentification = async ({
  userId,
  imageUrl,
  aiResult,
}: {
  userId: string;
  imageUrl: string;
  aiResult: Awaited<ReturnType<typeof identifyPlant>>;
}) => {
  const { identified_name, confidence_score, ai_response } = aiResult;
  const { data, error } = await supabase
    .from('identifications')
    .insert([
      {
        user_id: userId,
        image_url: imageUrl,
        identified_name,
        confidence_score,
        ai_response,
      },
    ])
    .select();

  if (error) {
    console.error('Error saving identification:', error);
    throw new Error('Failed to save identification');
  }

  return data?.[0];
};
