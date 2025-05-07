import type { Metadata } from "next";
import { pricingPlans } from "@/data";
import { getCurrentUser } from "@/lib/current-user";
import PricingPlan from "@/components/PricingPlan";
import { getUserSubscription as getSubscription } from "@/drizzle/db/actions";
import getUserPlanFromPriceId from "@/utils/getUserPlanFromPriceId";
import { Plan, Subscription, User } from "@/types";
import assertIsError from "@/utils/assertIsError";
import ErrorComponent from "@/components/ErrorComponent";
import PricingPlanForNonAuthenticated from "@/components/PricingPlanForNonAuthenticated";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the right ThreadlyAI plan for your content needs. Compare Basic and Pro features — Enterprise plan coming soon for power users and teams.",
  keywords: "ThreadlyAI pricing, AI thread generator plans, content creation pricing, social media automation cost, AI copywriting plans, Basic Pro Enterprise",
};

export default async function PricingPage() {
  let user: User | null, userSubscription: Subscription | undefined, userPlan: Plan | undefined;

  try {
    user = await getCurrentUser(false);
  } catch(error) {
    assertIsError(error);
    return <ErrorComponent errorMessage={error.message} />
  }

  // if user is not authenticated
  if (user === null) {
    return (
      <div className="container bg-black mx-auto py-20">
        <h1 className="text-white text-5xl font-bold tracking-wide text-center mb-12">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingPlanForNonAuthenticated key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    )
  }

  try {
    userSubscription = await getSubscription(user.id);
    userPlan = userSubscription && getUserPlanFromPriceId(userSubscription.priceId);
  } catch(error) {
    assertIsError(error);
    console.log(error.message);
    return <ErrorComponent />
  }

  return (
    <div className="container bg-black mx-auto py-20">
      <h1 className="text-white text-5xl font-bold tracking-wide text-center mb-12">
        Pricing Plans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <PricingPlan key={plan.name} plan={plan} subscription={userSubscription} user={user} userPlanName={userPlan?.name} />
        ))}
      </div>
    </div>
  );
}