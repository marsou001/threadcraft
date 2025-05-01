import { getAllGeneratedContentForUser } from "@/drizzle/db/actions"
import type { History } from "@/types";
import GeneratePage from "@/components/GeneratePage";
import { getCurrentUser } from "@/lib/current-user";

export default async function Generate() {
  const user = await getCurrentUser();
  let history: History;
  
  try {
    history = await getAllGeneratedContentForUser(user.clerkId);
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