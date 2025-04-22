import { CommonSettings, CustomSettings } from "@/types";

export async function generateContent(userId: string, settings: CommonSettings, customSettings: CustomSettings): Promise<string> {
  const response = await fetch("/api/content", {
    method: "POST",
    body: JSON.stringify({ userId, settings, customSettings }),
    headers: { "Content-Type": "application/json" },
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.generatedContent;
}