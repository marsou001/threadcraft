import { saveGeneratedContent } from "@/drizzle/db/actions";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, settings, customSettings } = body;

  if (userId === null) {
    return new Response("No user id param was found in the request", { status: 400 });
  }

  const { socialMedia, prompt, tone, numberOfHashtags } = settings;

  let promptText = `Generate ${socialMedia} content in an ${tone} tone, with this instruction(s): "${prompt}". Add ${numberOfHashtags} related hashtags at the end.`;

  // Instagram image description
  if (customSettings.socialMedia === "Instagram" && customSettings.imagePrompt !== undefined) {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: promptText + " Use the image supplied in addition to the instruction as guidelines." },
            {
              detail: "high",
              type: "input_image",
              image_url: customSettings.imagePrompt,
            },
          ],
        },
      ],
    });

    if (response.error !== null) {
      return new Response(response.error.message, { status: 502 });
    }

    return Response.json({ generatedContent: response.output_text }, { status: 200 });
  }

  if (customSettings.socialMedia === "X") promptText += ` Provide a thread of ${customSettings.numberOfTweets} tweets, each under 280 characters.`;

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