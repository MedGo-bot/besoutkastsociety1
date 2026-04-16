import { GoogleGenAI } from "@google/genai";

export interface Env {
  GEMINI_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Please send a POST request", { status: 405 });
    }

    try {
      const { prompt } = (await request.json()) as { prompt: string };

      if (!prompt) {
        return new Response(JSON.stringify({ error: "Prompt is required" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      if (!env.GEMINI_API_KEY) {
        return new Response(JSON.stringify({ error: "GEMINI_API_KEY is missing" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      const candidates = response.candidates ?? [];
      let imageData: string | undefined;

      for (const candidate of candidates) {
        for (const part of candidate.content?.parts ?? []) {
          const inlineData = (part as any).inlineData;
          if (inlineData?.data) {
            imageData = inlineData.data;
            break;
          }
        }
        if (imageData) break;
      }

      if (!imageData) {
        return new Response(JSON.stringify({ error: "Failed to generate image data." }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      const imageUrl = `data:image/png;base64,${imageData}`;

      return new Response(JSON.stringify({ imageUrl }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};
