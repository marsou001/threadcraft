import { saveGeneratedContent } from "@/drizzle/db/actions";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, socialMedia, prompt } = body;

  if (userId === null) {
    return new Response("No user id param was found in the request", { status: 400 });
  }

  let promptText = `Generate ${socialMedia} content with this instruction(s): ${prompt}.`;

  if (socialMedia === "X") promptText += " Provide a thread of 5 tweets, each under 280 characters."

  const response = await openai.responses.create({
    model: "gpt-3.5-turbo",
    input: promptText,
  });

  if (response.error !== null) {
    return new Response(response.error.message, { status: 502 });
  }

  // await saveGeneratedContent(userId, { prompt, socialMedia, content: response.output_text });

  return Response.json({ generatedContent: response.output_text }, { status: 200 });
}