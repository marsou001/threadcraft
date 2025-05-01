import type { User } from "@/types";
import { getUserByStripeCustomerId } from "@/drizzle/db/actions";

/**
 * Waits for a user to be available in the database by Stripe customer ID.
 * 
 * Stripe webhook events like `invoice.paid` or `customer.subscription.created` can sometimes
 * arrive before the `checkout.session.completed` event has finished writing the `stripeCustomerId`
 * to your database. This creates a race condition where `getUserByStripeCustomerId` may return `null`
 * temporarily, even though the customer will be linked shortly.
 *
 * This helper function solves that by polling for the user record with exponential backoff-like
 * behavior (constant interval retry). It retries a limited number of times before throwing an error.
 * 
 * Recommended to use in Stripe webhook handlers that rely on existing user data for a customer.
 * 
 * @param customerId - The Stripe customer ID to search for.
 * @param retries - The number of times to retry (default is 5).
 * @param delayMs - Delay between retries in milliseconds (default is 500ms).
 * @returns The user object once found.
 * @throws An error if the user is not found within the given retry limit.
 */
export default async function waitForUserByCustomerId(
  customerId: string,
  retries = 5,
  delayMs = 500
): Promise<User> {
  for (let i = 0; i < retries; i++) {
    const user = await getUserByStripeCustomerId(customerId);
    if (user) return user;
    await new Promise((r) => setTimeout(r, delayMs));
  }
  throw new Error(`User not found for Stripe customer ID after ${retries} attempts: ${customerId}`);
}
