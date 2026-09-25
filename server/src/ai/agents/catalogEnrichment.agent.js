import llm from "../services/llm.service.js";
import { createCatalogPrompt } from "../prompts/catalog.prompt.js";

import {
  SystemMessage,
  HumanMessage,
} from "@langchain/core/messages";

export async function enrichCatalog(product) {
  try {
    console.log("========== AI ENRICHMENT STARTED ==========");

    const messages = [
      new SystemMessage(createCatalogPrompt()),

      new HumanMessage(`
          Product Name:
          ${product.name}

          Description:
          ${product.description}

          Category:
          ${product.category}

          Attributes:
          ${JSON.stringify(product.attributes || {})}

          Image URLs:
          ${JSON.stringify(product.imageUrls || [])}
          `),
    ];

    console.log("Calling Groq LLM...");

    const result = await llm.invoke(messages);

    console.log("========== RAW LLM RESPONSE ==========");
    console.log(result);

    const content = result.content;

    console.log("========== RESPONSE CONTENT ==========");
    console.log(content);

    // Find the JSON object inside the response
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON found in AI response.");
    }

    const jsonString = content.substring(jsonStart, jsonEnd + 1);

    console.log("========== EXTRACTED JSON ==========");
    console.log(jsonString);

    const aiMetadata = JSON.parse(jsonString);

    console.log("========== PARSED OBJECT ==========");
    console.log(aiMetadata);

    console.log("========== AI ENRICHMENT FINISHED ==========");

    return aiMetadata;

  } catch (error) {
    console.error("========== AI ENRICHMENT FAILED ==========");
    console.error(error);
    throw error;
  }
}