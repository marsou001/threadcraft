"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Plan } from "@/types";
import { loadStripe } from "@stripe/stripe-js";
import { CheckIcon } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
// TODO: fetch pricing plans from server
export default function PricingPlan(props: Plan) {
  const [isProcessingSubscription, setIsProcessingSubscription] = useState(false);
  const router = useRouter();
  const { userId } = useAuth();

  async function handleSubscribe(priceId: string) {
    if (userId === null) {
      router.push("/sign-up");
      return;
    }
    
    const stripe = await stripePromise;
    if (stripe === null) return;

    let sessionId: string;
    setIsProcessingSubscription(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, priceId }),
      })
      
      const { sessionId: checkoutSessionId } = await response.json();
      sessionId = checkoutSessionId as string;
      // handle subscription
      console.log("handling subscription")
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
      key={props.name}
      className="tracking-wide flex flex-col p-8 border border-gray-800 rounded-lg"
    >
      <h2 className="text-white text-2xl font-bold mb-4">
        {props.name}
      </h2>
      <p className="text-white text-4xl font-bold mb-6">
        ${props.price}
        <span className="text-gray-400 text-lg font-normal">
          /month
        </span>
      </p>
      <ul className="grow mb-8">
        {props.features.map((feature, featureIndex) => (
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
        onClick={() => props.priceId && handleSubscribe(props.priceId)}
        disabled={isProcessingSubscription || !props.priceId}
        className="text-black bg-white hover:bg-gray-200 text-sm w-full rounded-sm py-2 cursor-pointer"
      >
        { isProcessingSubscription ? "Processing..." : "Choose Plan" }
      </button>
    </div>
  );
}