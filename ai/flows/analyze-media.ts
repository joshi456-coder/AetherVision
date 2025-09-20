'use server';

import { ai } from '@/ai/genkit';
import type {
  AnalyzeMediaInput,
  AnalyzeMediaOutput,
} from '@/lib/ai-types';
import {
  AnalyzeMediaInputSchema,
  AnalyzeMediaOutputSchema,
} from '@/lib/ai-types';

export async function analyzeMedia(
  input: AnalyzeMediaInput
): Promise<AnalyzeMediaOutput> {
  return analyzeMediaFlow(input);
}

const analyzeMediaPrompt = ai.definePrompt({
  name: 'analyzeMediaPrompt',
  input: { schema: AnalyzeMediaInputSchema },
  output: { schema: AnalyzeMediaOutputSchema, format: 'json' },
  prompt: `You are an AI vision expert. Analyze the provided media and perform the following tasks:
1. Identify the main objects present. Provide a confidence score for each object. List up to 8 objects.
2. Write a concise, one-sentence description of the scene.

The media is provided below.
{{media url=mediaUrl}}

Respond with a valid JSON object that conforms to the specified output schema. Do not include any other text or formatting. Your response should only be the JSON object.`,
});

const analyzeMediaFlow = ai.defineFlow(
  {
    name: 'analyzeMediaFlow',
    inputSchema: AnalyzeMediaInputSchema,
    outputSchema: AnalyzeMediaOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await analyzeMediaPrompt({
        mediaUrl: `data:${input.mimeType};base64,${input.media}`,
      });
      return output!;
    } catch (e) {
      console.error(e);
      // Return a mock response on failure to prevent app crash
      return {
        objects: [{ name: 'Error', confidence: 0 }],
        description: 'Failed to analyze media.',
      };
    }
  }
);
