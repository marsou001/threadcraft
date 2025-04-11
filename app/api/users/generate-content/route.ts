import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();
  const { socialMedia, prompt } = body;

  const promptText = `Generate ${socialMedia} content with this instruction(s): ${prompt}`;

  const response = await openai.responses.create({
    model: "gpt-3.5-turbo",
    input: promptText,
  });

  if (response.error !== null) {
    return new Response(response.error.message, { status: 502 });
  }

  return Response.json({ generatedContent: response.output_text }, { status: 200 });
}