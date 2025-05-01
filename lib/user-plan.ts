import type { PricingPlan } from "@/types";
import { getUserPlan as getPlan } from "@/drizzle/db/actions";

export default async function getUserPlan(userId: string): Promise<PricingPlan | null> {
  let plan: PricingPlan | undefined;

  try {
    plan = await getPlan(userId);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching user plan", error.message);
    }
    throw new Error("Error fetching user plan");
  }

  return typeof plan === "undefined" ? null : plan;
}