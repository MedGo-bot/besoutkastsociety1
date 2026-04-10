import { GoogleGenAI } from "@google/genai";

export async function onRequestPost(context: { request: Request; env: { GEMINI_API_KEY: string } }) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { prompt } = body;
    const apiKey = env.GEMINI_API_KEY;

    console.log("Request received for prompt:", prompt);
    console.log("API Key present:", !!apiKey);

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing in env");
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not set in Cloudflare environment variables." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    console.log("Generating image for prompt:", prompt);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        systemInstruction: "You are an image generation model. Generate the requested image based on the prompt. Do not provide any text descriptions or explanations.",
        maxOutputTokens: 2048,
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    let imageData = null;
    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          imageData = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (imageData) {
      return new Response(JSON.stringify({ imageUrl: imageData }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Failed to generate image data." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
