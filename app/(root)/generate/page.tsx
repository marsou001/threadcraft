import type { Metadata } from "next";
import GeneratePage from "@/components/GeneratePage";
import { getCurrentUser } from "@/lib/current-user";
import getUserHistory from "@/lib/user.history";

export const metadata: Metadata = {
  title: "Generate content with ThreadlyAI",
};

export default async function Generate() {
  const user = await getCurrentUser();
  const history = await getUserHistory(user.clerkId);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
        <GeneratePage history={history} user={user} />
      </div>
    </div>
  )
}