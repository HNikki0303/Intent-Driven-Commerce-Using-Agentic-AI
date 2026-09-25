import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "qwen/qwen3.6-27b",
    temperature: 0.3,
});

export default llm;