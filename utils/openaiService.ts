// services/openaiService.ts
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

export const openaiService = {
  identifyPlant: async (base64Image: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analyze this plant image and identify the species. Return a JSON response with:
                  {
                    "species": {
                      "common_name": "string",
                      "scientific_name": "string"
                    },
                    "confidence": number (0-1),
                    "features": ["identifying feature 1", "feature 2"],
                    "care": {
                      "light": "string",
                      "water": "string"
                    }
                  }`,
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`,
                  },
                },
              ],
            },
          ],
          max_tokens: 500,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        try {
          return JSON.parse(data.choices[0].message.content);
        } catch (parseError) {
          console.error('Error parsing AI response:', parseError);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error('OpenAI API error:', error);
      return null;
    }
  },
};
