"use server";

import { refineContent } from "@/ai/flows/refine-content";
import { z } from "zod";

const RefineContentInputSchema = z.object({
  text: z.string(),
});

export async function handleRefineContent(text: string) {
  const validatedInput = RefineContentInputSchema.parse({ text });
  try {
    const result = await refineContent(validatedInput);
    return result;
  } catch (error) {
    console.error("Error refining content:", error);
    throw new Error("Failed to refine content with AI.");
  }
}
