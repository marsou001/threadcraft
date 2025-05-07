import { GeneratedContent, History, Settings } from "@/types";

export async function getHistory(userId: string): Promise<History> {
  const response = await fetch("/api/content?clerk_user=" + userId);

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.allGeneratedContent;
}

export async function generateContent(userId: number, settings: Settings): Promise<GeneratedContent> {
  const response = await fetch("/api/content", {
    method: "POST",
    body: JSON.stringify({ userId, settings }),
    headers: { "Content-Type": "application/json" },
  })

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.generatedContent;
}