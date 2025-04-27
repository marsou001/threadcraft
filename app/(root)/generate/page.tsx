import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId, getAllGeneratedContentForUser } from "@/drizzle/db/actions"
import { History, User } from "@/types";
import GeneratePage from "@/components/GeneratePage";

export default async function Generate() {
  const { userId, redirectToSignIn } = await auth();
  if (userId === null) return redirectToSignIn();

  let user: User, history: History;

  try {
    user = await getUserByClerkId(userId);
  } catch (error) {
    if (error instanceof Error) console.log("Error fetching user data", error.message);
    return <div>Something went wrong</div>
  }

  try {
    history = await getAllGeneratedContentForUser(userId);
  } catch (error) {
    if (error instanceof Error) console.log("Error fetching user history", error.message);
    return <div>Something went wrong</div>
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
        <GeneratePage history={history} user={user} />
      </div>
    </div>
  )
}