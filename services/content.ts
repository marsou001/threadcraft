import { SocialMedia } from "@/types";

export async function generateContent(userId: string, socialMedia: SocialMedia, prompt: string): Promise<string> {
  const response = await fetch("/api/content", {
    method: "POST",
    body: JSON.stringify({ userId, socialMedia, prompt }),
    headers: { "Content-Type": "application/json" },
  })

  if (!response.ok) {
    const error = await response.text();
    console.log(error)

    throw new Error(error);
  }

  const data = await response.json();
  return data.generatedContent;
}