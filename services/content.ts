import { CommonSettings, CustomSettings, SocialMedia, Tone } from "@/types";

export async function generateContent(userId: string, settings: CommonSettings, customSettings: CustomSettings): Promise<string> {
  const response = await fetch("/api/content", {
    method: "POST",
    body: JSON.stringify({ userId, settings, customSettings }),
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