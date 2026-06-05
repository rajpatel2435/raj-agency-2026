// app/api/reviews/generate/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK using your environment variable
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { reviewText, reviewerName, rating, locationData } = await req.json();

    if (!reviewText || !rating || !locationData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build the system configuration prompt
    const systemPrompt = `
      You are an expert B2B Reputation Manager and Local SEO specialist.
      Your task is to draft a reply to a customer review for ${locationData.businessName} (${locationData.branchName || 'Main'} branch).
      
      Follow these strict optimization constraints:
      1. Tone: ${locationData.tone || 'professional, welcoming, and polite'}.
      2. Local SEO: Seamlessly incorporate 1 or 2 of these target keywords only if contextually natural: ${locationData.keywords?.join(', ') || 'none'}.
      3. Geo-Relevance: Mention the area or neighborhood (${locationData.neighborhood || locationData.city}) to boost local search relevance.
      4. Guardrails: Never offer financial compensation, discounts, or free vouchers in text. Do not invent factual offerings outside of this context: "${locationData.extraContext || ''}".
      5. Sentiment Handling: If the review is negative (3 stars or below), express sincere empathy, maintain extreme professionalism, and invite them to reach out directly to management to discuss further offline. Do not argue.
    `;

    const userPrompt = `
      Reviewer: ${reviewerName || 'Valued Customer'}
      Rating: ${rating} out of 5 Stars
      Review text: "${reviewText}"
      
      Draft response:
    `;

    // Execute the call using the modern Google Gen AI SDK interface
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    });

    const replyDraft = response.text?.trim();

    return NextResponse.json({ success: true, replyDraft });

  } catch (error: any) {
    console.error("Gemini Engine Failure:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}