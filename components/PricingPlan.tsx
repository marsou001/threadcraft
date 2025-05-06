import type { EnterprisePlan, Plan, PricingPlan, Subscription, User } from "@/types";
import { CheckIcon } from "lucide-react";
import ChoosePlanButton from "./ChoosePlanButton";
import ManagePlanButton from "./ManagePlanButton";

export type PricingPlanProps = {
  user: User;
  plan: Plan | EnterprisePlan;
  userPlanName: PricingPlan | undefined;
  subscription: Subscription | undefined;
}

export default function PricingPlan({ plan, user, subscription, userPlanName }: PricingPlanProps) {
  return (
    <div
      key={plan.name}
      className="tracking-wide flex flex-col p-8 border border-gray-800 rounded-lg"
    >
      <h2 className="text-white text-2xl font-bold mb-4">
        {plan.name}
      </h2>
      <p className="text-white text-4xl font-bold mb-6">
        ${plan.price}
        <span className="text-gray-400 text-lg font-normal">
          /month
        </span>
      </p>
      <ul className="grow mb-8">
        {plan.features.map((feature, featureIndex) => (
          <li
            key={featureIndex}
            className="text-gray-300 flex items-center mb-3"
          >
            <CheckIcon className="text-green-500 w-5 h-5 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      {
        plan.name === "Enterprise" ? (
          <button
            disabled
            className="text-gray-300 bg-blue-900 text-sm w-full rounded-full py-2 cursor-not-allowed"
          >
            Coming Soon...
          </button>
        ) : plan.name === userPlanName ? (
          <ManagePlanButton customerId={user.stripeCustomerId!} />
        ) : (
          <ChoosePlanButton user={user} subscription={subscription} priceId={plan.priceId} />
        )
      }
    </div>
  );
}