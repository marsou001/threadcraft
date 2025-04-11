import { SocialMedia } from "@/types";

export async function getUserPoints(userId: string): Promise<number> {
  const response = await fetch("/api/users/points?user=" + userId);

  if (!response.ok) {
    const error = await response.text();
    console.log(error)

    throw new Error(error);
  }

  const data = await response.json();
  return data.points;
}

export async function updateUserPoints(userId: string, newPoints: number) {
  const response = await fetch("/api/users/points", {
    method: "PATCH",
    body: JSON.stringify({ userId, newPoints }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const error = await response.text();
    console.log(error)

    throw new Error(error);
  }
}

export async function generateContent(socialMedia: SocialMedia, prompt: string): Promise<string> {
  const response = await fetch("/api/users/generate-content", {
    method: "POST",
    body: JSON.stringify({ socialMedia, prompt }),
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