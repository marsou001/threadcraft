import { getUserPoints } from "@/drizzle/db/actions";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const clerkUserId = requestUrl.searchParams.get("clerk_user");
  
  if (clerkUserId === null) {
    return new Response("No Clerk user param was found in the request", { status: 400 });
  }

  const points = await getUserPoints(clerkUserId);
  return Response.json({ points }, { status: 200 });
}