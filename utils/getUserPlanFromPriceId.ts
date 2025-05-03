import { pricingPlans } from "@/data";
import { Plan } from "@/types";

export default function getUserPlanFromPriceId(priceId: string): Plan | undefined {
  const plan = pricingPlans.find((p) => p.priceId === priceId);
  if (plan !== undefined && plan.priceId === null) return undefined
  return plan;
}