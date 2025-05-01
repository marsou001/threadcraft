import { pricingPlans } from "@/data";
import { getCurrentUser } from "@/lib/current-user";
import PricingPlan from "@/components/PricingPlan";
import getUserPlan from "@/lib/user-plan";

export default async function PricingPage() {
  const user = await getCurrentUser();
  const userPlan = await getUserPlan(user.clerkId);

  return (
    <main className="text-gray-100 bg-black">
      <div className="container mx-auto py-20">
        <h1 className="text-white text-5xl font-bold tracking-wide text-center mb-12">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingPlan key={plan.name} plan={plan} userId={user.clerkId} isUserPlan={plan.name === userPlan} />
          ))}
        </div>
      </div>
    </main>
  );
}