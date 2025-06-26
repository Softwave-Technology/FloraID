export async function identifyPlant(imageUrl: string): Promise<{
  identified_name: string;
  confidence_score: number;
  ai_response: any;
}> {
  const prompt = `
You are a plant identification expert AI. Given the image below, identify the plant.
Respond ONLY in strict JSON format:
{
  "identified_name": "Plant Name",
  "confidence_score": 0.95,
  "ai_response": {
    "scientific_name": "...",
    "family": "...",
    "common_names": ["...", "..."],
    "description": "...",
    "care_instructions": "..."
  }
}
IMPORTANT:
- confidence_score must be between 0.00 and 1.00
- Be honest in confidence — if unsure, use a lower confidence_score
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that identifies plants from images.',
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    }),
  });

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  try {
    const json = JSON.parse(content || '{}');
    return {
      identified_name: json.identified_name,
      confidence_score: json.confidence_score,
      ai_response: json.ai_response,
    };
  } catch (err) {
    console.error('Error parsing AI response:', err, '\nResponse:', content);
    throw new Error('Invalid AI response format');
  }
}
