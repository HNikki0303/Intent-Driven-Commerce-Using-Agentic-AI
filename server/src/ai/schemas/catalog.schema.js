import { z } from "zod";

export const catalogSchema = z.object({
    occasion: z.array(z.string()),
    style: z.array(z.string()),
    targetAudience: z.array(z.string()),
    materials: z.array(z.string()),
    colors: z.array(z.string()),
    features: z.array(z.string()),
    tags: z.array(z.string()),
    searchKeywords: z.array(z.string()),
    enrichedDescription: z.string(),
});