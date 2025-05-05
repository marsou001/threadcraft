"use client"

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession, updateSubscription } from "@/services/subscriptions";
import type { User, CreateCheckoutSessionParams, Subscription } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export type ChoosePlanButtonProps = {
  user: User;
  subscription: Subscription | undefined;
  priceId: string;
}

export default function ChoosePlanButton({ user, subscription, priceId }: ChoosePlanButtonProps) {
  const [isProcessingSubscription, setIsProcessingSubscription] = useState(false);
  const isUserSubscribed = subscription !== undefined;

  async function subscribeToPlan(priceId: string) {
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
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return;
    } finally {
      setIsProcessingSubscription(false);
    }
    
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
      toast.error("Something went wrong");
      console.error(result.error);
    }
  };

  async function changePlan(priceId: string) {
    const stripe = await stripePromise;
    if (stripe === null) return;

    setIsProcessingSubscription(true);
    try {
      await updateSubscription(subscription?.subscriptionId! ,priceId);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsProcessingSubscription(false);
      window.location.reload();
    }
  }

  return (
    <button
      onClick={isUserSubscribed ? () => changePlan(priceId) : () => subscribeToPlan(priceId)}
      disabled={isProcessingSubscription}
      className={cn("text-white text-sm w-full rounded-full py-2", {
        "bg-blue-600 hover:bg-blue-700 cursor-pointer": !isProcessingSubscription,
        "bg-blue-800 hover:bg-blue-800 cursor-not-allowed": isProcessingSubscription,
      })}
    >
      { isProcessingSubscription ? "Processing..." : "Choose Plan" }
    </button>
  )
}