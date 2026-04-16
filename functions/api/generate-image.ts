export interface Env {
  GEMINI_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 1. Handle CORS (Allows your website to talk to this backend)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    try {
      // 2. Parse the incoming prompt from your website
      const { prompt } = await request.json() as { prompt: string };
      
      if (!env.GEMINI_API_KEY) {
        throw new Error("API Key is missing in Cloudflare Dashboard");
      }

      // 3. Call the Google Generative AI REST API
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      // 4. Parse the response
      const data = await response.json() as any;
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";

      // 5. Send the result back to your website
      return new Response(JSON.stringify({ result: text }), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" 
        },
      });

    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "*" 
        },
      });
    }
  },
};
