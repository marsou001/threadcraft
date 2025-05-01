"use client";

import { useState } from "react";
import type { EnterprisePlan, Plan } from "@/types";
import { loadStripe } from "@stripe/stripe-js";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/services/subscriptions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
// TODO: fetch pricing plans from server
export type PricingPlanProps = {
  plan: Plan | EnterprisePlan;
  userId: string;
}

export default function PricingPlan({ plan, userId }: PricingPlanProps) {
  const [isProcessingSubscription, setIsProcessingSubscription] = useState(false);

  async function handleSubscribe(priceId: string) {
    const stripe = await stripePromise;
    if (stripe === null) return;

    let sessionId: string;
    setIsProcessingSubscription(true);

    try {
      sessionId = await createCheckoutSession(userId, priceId)
    } catch (error) {
      // TODO: handle error
      console.log(error);
      return;
    } finally {
      setIsProcessingSubscription(false);
    }
    
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      console.error(result.error);
    }
  };

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
      <button
        onClick={() => plan.priceId && handleSubscribe(plan.priceId)}
        disabled={isProcessingSubscription || plan.name === "Enterprise"}
        className={cn("text-black text-sm w-full rounded-sm py-2", {
          "bg-white hover:bg-gray-200 cursor-pointer": plan.name !== "Enterprise",
          "bg-gray-400 hover:bg-gray-400 cursor-not-allowed": plan.name === "Enterprise" || isProcessingSubscription,
        })}
      >
        {
          plan.name === "Enterprise" ? "Coming Soon..." :
          isProcessingSubscription ? "Processing..." : "Choose Plan"
         }
      </button>
    </div>
  );
}