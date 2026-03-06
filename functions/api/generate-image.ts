import { GoogleGenAI } from "@google/genai";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { prompt } = await request.json();
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not set in Cloudflare environment variables." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    let imageData = null;
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageData = `data:image/png;base64,${part.inlineData.data}`;
        break;
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
