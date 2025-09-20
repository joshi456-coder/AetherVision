'use server';

/**
 * @fileOverview AI flow to generate a concise summary of the key objects and descriptions identified in the uploaded media.
 *
 * - generateAnalysisSummary - A function that handles the generation of the analysis summary.
 */

import {ai} from '@/ai/genkit';
import type {
  GenerateAnalysisSummaryInput,
  GenerateAnalysisSummaryOutput,
} from '@/lib/ai-types';
import {
  GenerateAnalysisSummaryInputSchema,
  GenerateAnalysisSummaryOutputSchema,
} from '@/lib/ai-types';

export async function generateAnalysisSummary(
  input: GenerateAnalysisSummaryInput
): Promise<GenerateAnalysisSummaryOutput> {
  return generateAnalysisSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnalysisSummaryPrompt',
  input: {schema: GenerateAnalysisSummaryInputSchema},
  output: {schema: GenerateAnalysisSummaryOutputSchema},
  prompt: `You are an AI assistant that generates concise summaries of media analysis.

  Description: {{{analysisDescription}}}
  Objects: {{#each objects}}{{{name}}} ({{{confidence}}}) {{/each}}

  Generate a short summary of the analysis:
  `,
});

const generateAnalysisSummaryFlow = ai.defineFlow(
  {
    name: 'generateAnalysisSummaryFlow',
    inputSchema: GenerateAnalysisSummaryInputSchema,
    outputSchema: GenerateAnalysisSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
