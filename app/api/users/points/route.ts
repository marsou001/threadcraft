import { getUserPoints, updateUserPoints } from "@/drizzle/db/actions";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const user = requestUrl.searchParams.get("user");
  
  if (user === null) {
    return new Response("No user param was found in the request", { status: 400 });
  }

  const points = await getUserPoints(Number(user));
  return Response.json({ points }, { status: 200 });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { userId, newPoints } = body;  
  
  if (userId === null) {
    return new Response("No user param was found in the request", { status: 400 });
  }

  const points = await updateUserPoints(userId, newPoints);
  return Response.json({ points }, { status: 201 });
}