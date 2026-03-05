
export async function generateSocietyImage(prompt: string) {
  try {
    const isDetailed = prompt.length > 100;
    const finalPrompt = isDetailed 
      ? prompt 
      : `High-end editorial photography for Bes Outkast Society News magazine. Aesthetic: Luxury, gritty, minimalist, high-contrast, cinematic. Subject: ${prompt}. Style: Grayscale with deep blacks and sharp details, or minimalist cinematic colors. Professional lighting, 8k resolution.`;

    const response = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: finalPrompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate image");
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Error generating image via proxy:", error);
    return null;
  }
}
