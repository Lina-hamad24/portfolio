// src/ai/flows/refine-content.ts
'use server';

/**
 * @fileOverview A content refinement AI agent that adjusts text to match a refined personal tone based on prevailing UX writing styles.
 *
 * - refineContent - A function that handles the content refinement process.
 * - RefineContentInput - The input type for the refineContent function.
 * - RefineContentOutput - The return type for the refineContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineContentInputSchema = z.object({
  text: z.string().describe('The text to be refined.'),
});
export type RefineContentInput = z.infer<typeof RefineContentInputSchema>;

const RefineContentOutputSchema = z.object({
  refinedText: z.string().describe('The refined text with a consistent and professional voice.'),
});
export type RefineContentOutput = z.infer<typeof RefineContentOutputSchema>;

export async function refineContent(input: RefineContentInput): Promise<RefineContentOutput> {
  return refineContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineContentPrompt',
  input: {schema: RefineContentInputSchema},
  output: {schema: RefineContentOutputSchema},
  prompt: `You are an expert UX writer specializing in refining content to match a professional and engaging tone.

  You will receive a piece of text and your task is to rewrite it, ensuring it aligns with modern UX writing styles.
  Focus on clarity, conciseness, and a personal, yet professional voice.

  Original Text: {{{text}}}

  Refined Text:`, // Ensure the refined text is returned in the 'refinedText' field.
});

const refineContentFlow = ai.defineFlow(
  {
    name: 'refineContentFlow',
    inputSchema: RefineContentInputSchema,
    outputSchema: RefineContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
