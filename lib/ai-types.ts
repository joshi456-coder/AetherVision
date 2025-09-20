import { z } from 'genkit';

// Schemas and types for analyze-media flow
export const AnalyzeMediaInputSchema = z.object({
  media: z.string().describe('The base64 encoded media to analyze.'),
  mimeType: z.string().describe('The mime type of the media.'),
});
export type AnalyzeMediaInput = z.infer<typeof AnalyzeMediaInputSchema>;

export const AnalyzeMediaOutputSchema = z.object({
  objects: z
    .array(
      z.object({
        name: z.string().describe('The name of the detected object.'),
        confidence: z.number().describe('The confidence score from 0 to 1.'),
      })
    )
    .describe('A list of objects detected in the media.'),
  description: z
    .string()
    .describe('A descriptive summary of the media content.'),
});
export type AnalyzeMediaOutput = z.infer<typeof AnalyzeMediaOutputSchema>;


// Schemas and types for answer-content-questions flow
export const AnswerContentQuestionsInputSchema = z.object({
  question: z.string().describe('The question to ask about the analyzed content.'),
  analysisDescription: z.string().describe('A summary description of the analyzed content.'),
  objectList: z.string().describe('A comma separated list of objects detected in the analyzed content.'),
});
export type AnswerContentQuestionsInput = z.infer<typeof AnswerContentQuestionsInputSchema>;

export const AnswerContentQuestionsOutputSchema = z.object({
  answer: z.string().describe('The AI-driven answer to the question.'),
});
export type AnswerContentQuestionsOutput = z.infer<typeof AnswerContentQuestionsOutputSchema>;


// Schemas and types for generate-analysis-summary flow
export const GenerateAnalysisSummaryInputSchema = z.object({
  analysisDescription: z.string().describe('The description of the analysis.'),
  objects: z
    .array(
      z.object({
        name: z.string(),
        confidence: z.number(),
      })
    )
    .describe('The objects identified in the media.'),
});
export type GenerateAnalysisSummaryInput = z.infer<
  typeof GenerateAnalysisSummaryInputSchema
>;

export const GenerateAnalysisSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the analysis.'),
});
export type GenerateAnalysisSummaryOutput = z.infer<
  typeof GenerateAnalysisSummaryOutputSchema
>;
