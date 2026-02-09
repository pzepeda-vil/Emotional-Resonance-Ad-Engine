import { GoogleGenerativeAI } from "@google/generative-ai";
import { AdCopy, FormState, GroundingSource } from '../types';

// Use Vite's way of accessing the API key from your GitHub Secrets
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateAd = async (formData: FormState): Promise<AdCopy> => {
  try {
    // 1. Initialize the model (using 1.5-flash for speed and reliability)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      }
    });

    // 2. Construct the prompt based on your app's needs
    const prompt = `Generate a high-resonance advertisement copy for: ${formData.productName}. 
                    Target Audience: ${formData.targetAudience}. 
                    Tone: ${formData.tone}.`;

    // 3. Request the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 4. Return the formatted result (adjust based on your AdCopy type)
    return {
      headline: "Generated Headline",
      body: text,
      cta: "Learn More",
      sentiment: formData.tone
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate ad resonance. Please check your API Key.");
  }
};
