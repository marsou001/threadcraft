import { getAllGeneratedContentForUser, saveGeneratedContent } from "@/drizzle/db/actions";
import assertIsError from "@/utils/assertIsError";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const user_id = requestUrl.searchParams.get("user_id");

  if (user_id === null) {
    return new Response("No user_id param was found in the request", { status: 400 });
  }

  const allGeneratedContent = await getAllGeneratedContentForUser(Number(user_id));
  return Response.json({ allGeneratedContent }, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, settings } = body;

  if (userId === null) {
    return new Response("No user id param was found in the request", { status: 400 });
  }

  const { socialMedia, prompt, tone, numberOfHashtags, ...customSettings } = settings;
  const promptText = `Generate ${socialMedia} content in an ${tone} tone, with this instruction(s): "${prompt}". Add ${numberOfHashtags} related hashtags at the end.`;
  let response: OpenAI.Responses.Response;

  try {
    switch(socialMedia) {
      case "X":
        response = await generateXContent(promptText, customSettings.numberOfTweets, customSettings.maxCharactersCountPerTweet);
        break;
      case "Instagram":
        response = await generateInstagramContent(promptText, customSettings.imagePrompt);
        break;
      case "LinkedIn":
        response = await generateLinkedInContent(promptText);
        break;
      default:
        response = await generateLinkedInContent(promptText);
        break;
    }
  } catch(error) {
    assertIsError(error);
    console.log(error);
    return new Response("Something went wrong", { status: 502 });
  }
  
  if (response.error !== null) {
    return new Response(response.error.message, { status: 502 });
  }
  
  const generatedContent = await saveGeneratedContent(userId, response.output_text, settings);
  return Response.json({ generatedContent: generatedContent }, { status: 200 });
}

async function generateXContent(promptText: string, numberOfTweets: number, maxCharactersCountPerTweet: number) {
  promptText += ` Provide a thread of ${numberOfTweets} tweets, each between ${maxCharactersCountPerTweet - 100} and ${maxCharactersCountPerTweet} characters.`;
  const response = await generateContent(promptText)
  return response;
}

async function generateInstagramContent(promptText: string, imagePrompt: string | null) {
  let response: OpenAI.Responses.Response & { _request_id?: string | null };

  if (imagePrompt === null) {
    response = await generateContent(promptText);
  } else {
    response = await generateContentWithImageDescription(promptText, imagePrompt);
  }

  return response;
}

async function generateLinkedInContent(promptText: string) {
  const response = await generateContent(promptText);
  return response;
}

async function generateContent(promptText: string) {
  const response = await openai.responses.create({
    model: "gpt-3.5-turbo",
    input: promptText,
  });

  return response;
}

async function generateContentWithImageDescription(promptText: string, imagePrompt: string) {
  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: promptText + " Use the image supplied in addition to the instruction as guidelines." },
          {
            detail: "high",
            type: "input_image",
            image_url: imagePrompt,
          },
        ],
      },
    ],
  });

  return response;
}