"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { pricingPlans } from "@/data";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const [isProcessingSubscription, setIsProcessingSubscription] = useState(false);

  async function handleSubscribe(priceId: string) {
    if (userId === null) {
      router.push("/sign-up");
      return;
    }

    setIsProcessingSubscription(true);

    try {
      // handle subscription
      console.log("handling subscription")
    } catch (error) {
      
    } finally {
      setIsProcessingSubscription(false);
    }
  };

  return (
    <main className="text-gray-100 bg-black">
      <div className="container mx-auto py-20">
        <h1 className="text-white text-5xl font-bold tracking-wide text-center mb-12">
          Pricing Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
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
                disabled={isProcessingSubscription || !plan.priceId}
                className="text-black bg-white hover:bg-gray-200 text-sm w-full rounded-sm py-2 cursor-pointer"
              >
                { isProcessingSubscription ? "Processing..." : "Choose Plan" }
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}