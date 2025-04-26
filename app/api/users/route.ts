import { getUserByClerkId } from "@/drizzle/db/actions";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const clerkUserId = requestUrl.searchParams.get("clerk_user");
  
  if (clerkUserId === null) {
    return new Response("No Clerk user param was found in the request", { status: 400 });
  }

  const user = await getUserByClerkId(clerkUserId);
  return Response.json({ user }, { status: 200 });
}