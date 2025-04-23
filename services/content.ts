import { Settings } from "@/types";

export async function generateContent(userId: string, settings: Settings): Promise<string> {
  const response = await fetch("/api/content", {
    method: "POST",
    body: JSON.stringify({ userId, settings }),
    headers: { "Content-Type": "application/json" },
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.generatedContent;
}