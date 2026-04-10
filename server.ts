import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Redirect Map for SEO and broken links
  const redirectMap: Record<string, string> = {
    '/outcast': '/',
    '/besoutkast': '/',
    '/magazine': 'https://besoutkastsociety.substack.com',
    '/newsletter': 'https://besoutkastsociety.substack.com/subscribe',
    '/archive': 'https://besoutkastsociety.substack.com/archive',
    '/columns': 'https://besoutkastsociety.substack.com/archive',
    '/inner-square': 'https://besoutkastsociety.substack.com/s/the-inner-square-with-ms-wilson',
    '/power-play': 'https://besoutkastsociety.substack.com/s/politico-discord-with-brandon-prescott',
    '/wealth-our-demeanor': 'https://besoutkastsociety.substack.com/s/the-wealth-protocol-with-craig-wright'
  };

  Object.entries(redirectMap).forEach(([oldPath, newUrl]) => {
    app.get(oldPath, (req, res) => {
      res.redirect(308, newUrl);
    });
  });

  // Gemini API Proxy Route
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set on the server." });
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
        res.json({ imageUrl: imageData });
      } else {
        res.status(500).json({ error: "Failed to generate image data." });
      }
    } catch (error: any) {
      console.error("Server-side generation error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
