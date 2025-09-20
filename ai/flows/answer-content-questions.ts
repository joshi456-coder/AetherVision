'use server';

/**
 * @fileOverview This flow allows users to ask questions about analyzed content and receive AI-driven answers.
 *
 * - answerContentQuestions - A function that handles the question answering process.
 */

import {ai} from '@/ai/genkit';
import type {
  AnswerContentQuestionsInput,
  AnswerContentQuestionsOutput,
} from '@/lib/ai-types';
import {
  AnswerContentQuestionsInputSchema,
  AnswerContentQuestionsOutputSchema,
} from '@/lib/ai-types';

export async function answerContentQuestions(input: AnswerContentQuestionsInput): Promise<AnswerContentQuestionsOutput> {
  return answerContentQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerContentQuestionsPrompt',
  input: {schema: AnswerContentQuestionsInputSchema},
  output: {schema: AnswerContentQuestionsOutputSchema},
  prompt: `You are an AI assistant helping users understand analyzed content.
  The content has the following objects: {{{objectList}}}.
  Here is a description of the content: {{{analysisDescription}}}.
  Answer the following question about the content: {{{question}}}`,
});

const answerContentQuestionsFlow = ai.defineFlow(
  {
    name: 'answerContentQuestionsFlow',
    inputSchema: AnswerContentQuestionsInputSchema,
    outputSchema: AnswerContentQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
