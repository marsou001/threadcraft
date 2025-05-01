import { getUserByStripeCustomerId } from "@/drizzle/db/actions";

export default async function waitForUserByCustomerId(customerId: string, retries = 5, delayMs = 500) {
  for (let i = 0; i < retries; i++) {
    const user = await getUserByStripeCustomerId(customerId);
    if (user) return user;
    await new Promise((r) => setTimeout(r, delayMs));
  }
  throw new Error(`User not found for Stripe customer ID after ${retries} attempts: ${customerId}`);
}