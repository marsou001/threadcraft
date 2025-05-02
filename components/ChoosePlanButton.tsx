"use client"

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "@/services/subscriptions";
import type { User, CreateCheckoutSessionParams } from "@/types";
import { cn } from "@/lib/utils";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export type ChoosePlanButtonProps = {
  user: User;
  priceId: string;
}

export default function ChoosePlanButton({ user, priceId }: ChoosePlanButtonProps) {
  const [isProcessingSubscription, setIsProcessingSubscription] = useState(false);

  async function handleSubscribe(priceId: string) {
    const stripe = await stripePromise;
    if (stripe === null) return;

    let sessionId: string;
    setIsProcessingSubscription(true);

    const createCheckoutSessionParams = { userId: user.clerkId, priceId, userHasCustomerId: user.stripeCustomerId !== null } as CreateCheckoutSessionParams;
    if (createCheckoutSessionParams.userHasCustomerId === true) {
      createCheckoutSessionParams.customerId = user.stripeCustomerId!;
    } else {
      createCheckoutSessionParams.customerEmail = user.email;
    }

    try {
      sessionId = await createCheckoutSession(createCheckoutSessionParams);
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
    <button
      onClick={() => handleSubscribe(priceId)}
      disabled={isProcessingSubscription}
      className={cn("text-black text-sm w-full rounded-sm py-2", {
        "bg-white hover:bg-gray-200 cursor-pointer": !isProcessingSubscription,
        "bg-gray-400 hover:bg-gray-400 cursor-not-allowed": isProcessingSubscription,
      })}
    >
      { isProcessingSubscription ? "Processing..." : "Choose Plan" }
    </button>
  )
}