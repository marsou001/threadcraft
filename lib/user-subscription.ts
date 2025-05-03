import type { Subscription } from "@/types";

export default async function getUserSubscription(userId: string): Promise<Subscription> {
  let subscription: Subscription;

  try {
    subscription = await getUserSubscription(userId);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching user subscription", error.message);
    }
    throw new Error("Error fetching user subscription");
  }

  return subscription;
}