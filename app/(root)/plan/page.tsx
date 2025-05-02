import { getCurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import { BadgeCheck, CalendarCheck } from "lucide-react";
import { getUserSubscription } from "@/drizzle/db/actions";
import { pricingPlans } from "@/data";
import ManagePlan from "@/components/ManagePlan";

export default async function Plan() {
  const user = await getCurrentUser();

  if (user.stripeCustomerId === null) {
    return redirect("/pricing");
  }

  const subscription = await getUserSubscription(user.clerkId);
  const plan = pricingPlans.find((p) => p.name === subscription.plan)
  if (plan === undefined) return redirect("/pricing");
  const renewalDate = subscription.currentPeriodEnd.toISOString().replace(/T.+$/, "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 pt-20 px-4 flex items-center justify-center">
      <div className="bg-gray-800 w-full max-w-md p-8 border border-gray-700 rounded-2xl shadow-lg">
        <h1 className="text-white font-bold text-2xl text-center mb-6">Your Current Plan</h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Plan</span>
            <span className="text-white font-medium">{plan.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Price</span>
            <span className="text-white font-medium">${plan.price}/month</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status</span>
            <span className="text-green-400 font-medium flex items-center gap-2">
              <BadgeCheck size={16} />
              {subscription.isActive ? "Active" : "Paused"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Renews on</span>
            <span className="text-white font-medium flex items-center gap-2">
              <CalendarCheck size={16} />
              {renewalDate}
            </span>
          </div>
        </div>
        <ManagePlan customerId={user.stripeCustomerId} />
      </div>
    </div>
  );
}
