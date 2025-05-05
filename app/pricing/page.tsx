import type { Metadata } from "next";
import { pricingPlans } from "@/data";
import { getCurrentUser } from "@/lib/current-user";
import PricingPlan from "@/components/PricingPlan";
import { getUserSubscription as getSubscription } from "@/drizzle/db/actions";
import getUserPlanFromPriceId from "@/utils/getUserPlanFromPriceId";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the right ThreadlyAI plan for your content needs. Compare Basic and Pro features — Enterprise plan coming soon for power users and teams.",
  keywords: "ThreadlyAI pricing, AI thread generator plans, content creation pricing, social media automation cost, AI copywriting plans, Basic Pro Enterprise",
};

export default async function PricingPage() {
  const user = await getCurrentUser();
  const userSubscription = await getSubscription(user.clerkId);
  const userPlan = userSubscription && getUserPlanFromPriceId(userSubscription.priceId);

  return (
    <main className="text-gray-100 bg-black">
      <div className="container mx-auto py-20">
        <h1 className="text-white text-5xl font-bold tracking-wide text-center mb-12">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingPlan key={plan.name} plan={plan} subscription={userSubscription} user={user} isUserPlan={plan.name === userPlan?.name} />
          ))}
        </div>
      </div>
    </main>
  );
}